"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Edit3,
  Trash2,
  User,
  FileText,
  ArrowLeft,
  Download,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import {
  showError,
  showSuccess,
  showLoading,
  dismissToast,
} from "@/utils/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";

interface Patient {
  id: string;
  fullname: string;
  email?: string | null;
  contact_1?: string | null;
  contact_2?: string | null;
  created_at: string;
  consent_obtained?: boolean | null;
}

const isValidEmail = (email: string): boolean => {
  if (!email) return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const Pacientes = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [consentObtained, setConsentObtained] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    if (!user) return;
    setIsLoadingPatients(true);
    try {
      const { data, error } = await supabase
        .from("tb_patients")
        .select(
          "id, fullname, email, contact_1, contact_2, created_at, consent_obtained"
        )
        .eq("user_id", user.id)
        .order("fullname", { ascending: true });
      if (error) throw error;
      setPatients(data || []);
    } catch (error: unknown) {
      let errorMessage = "Erro ao buscar pacientes";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      showError("Erro ao buscar pacientes: " + errorMessage);
      setPatients([]);
    } finally {
      setIsLoadingPatients(false);
    }
  }, [user]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const resetFormAndCloseModal = () => {
    setFullname("");
    setEmail("");
    setContact1("");
    setContact2("");
    setConsentObtained(false);
    setEditingPatient(null);
    setIsModalOpen(false);
  };

  const handleOpenModalForNew = () => {
    setEditingPatient(null);
    setFullname("");
    setEmail("");
    setContact1("");
    setContact2("");
    setConsentObtained(false);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setFullname(patient.fullname);
    setEmail(patient.email || "");
    setContact1(patient.contact_1 || "");
    setContact2(patient.contact_2 || "");
    setConsentObtained(patient.consent_obtained || false);
    setIsModalOpen(true);
  };

  const handleSavePatient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      showError("Usuário não autenticado.");
      return;
    }
    if (!fullname.trim()) {
      showError("Nome completo do paciente é obrigatório.");
      return;
    }
    if (!email.trim()) {
      showError("E-mail do paciente é obrigatório.");
      return;
    }
    if (!isValidEmail(email.trim())) {
      showError("Formato de e-mail inválido.");
      return;
    }
    if (!contact1.trim()) {
      showError("Contato principal do paciente é obrigatório.");
      return;
    }

    setIsSubmitting(true);
    const toastId = showLoading(
      editingPatient ? "Atualizando paciente..." : "Salvando paciente..."
    );

    const patientData = {
      fullname: fullname.trim(),
      email: email.trim(),
      contact_1: contact1.trim(),
      contact_2: contact2.trim() || null,
      consent_obtained: consentObtained,
    };

    try {
      let error;
      if (editingPatient) {
        const { error: updateError } = await supabase
          .from("tb_patients")
          .update(patientData)
          .eq("id", editingPatient.id)
          .eq("user_id", user.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("tb_patients")
          .insert({ ...patientData, user_id: user.id });
        error = insertError;
      }
      dismissToast(String(toastId));
      if (error) throw error;
      showSuccess(
        `Paciente ${editingPatient ? "atualizado" : "salvo"} com sucesso!`
      );
      resetFormAndCloseModal();
      fetchPatients();
    } catch (error: unknown) {
      dismissToast(String(toastId));
      let errorMessage = "Erro ao salvar paciente";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      showError("Erro ao salvar paciente: " + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeletePatient = (patientId: string) => {
    setPatientToDelete(patientId);
    setIsDeleteAlertOpen(true);
  };

  const handleDeletePatient = async () => {
    if (!user || !patientToDelete) return;

    setIsDeleteAlertOpen(false);
    const toastId = showLoading("Excluindo paciente...");

    try {
      const { error } = await supabase
        .from("tb_patients")
        .delete()
        .eq("id", patientToDelete)
        .eq("user_id", user.id);
      dismissToast(String(toastId));
      if (error) throw error;
      showSuccess("Paciente excluído com sucesso!");
      fetchPatients();
    } catch (error: unknown) {
      dismissToast(String(toastId));
      let errorMessage = "Erro ao excluir paciente";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      showError("Erro ao excluir paciente: " + errorMessage);
    } finally {
      setPatientToDelete(null);
    }
  };

  const handleExportPatients = async () => {
    if (!user) {
      showError("Usuário não autenticado.");
      return;
    }
    if (patients.length === 0) {
      showError("Não há pacientes para exportar.");
      return;
    }

    setIsExporting(true);
    const toastId = showLoading("Preparando exportação...");

    try {
      const dataToExport = patients.map((p) => ({
        id: p.id,
        fullname: p.fullname,
        email: p.email || "",
        contact_1: p.contact_1 || "",
        contact_2: p.contact_2 || "",
        consent_obtained: p.consent_obtained ? "Sim" : "Não",
        created_at: new Date(p.created_at).toLocaleDateString("pt-BR"),
      }));

      const header = [
        "ID",
        "Nome Completo",
        "E-mail",
        "Contato Principal",
        "Contato Secundário",
        "Consentimento Obtido",
        "Data de Cadastro",
      ];
      const rows = dataToExport.map((row) =>
        header
          .map((fieldName) =>
            JSON.stringify(
              row[
                fieldName.replace(/ /g, "_").toLowerCase() as keyof typeof row
              ]
            )
          )
          .join(",")
      );

      const csvString = [header.join(","), ...rows].join("\n");
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "pacientes_psiecode.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      dismissToast(String(toastId));
      showSuccess("Exportação concluída!");
    } catch (error: unknown) {
      dismissToast(String(toastId));
      let errorMessage = "Erro ao exportar pacientes";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      showError("Erro ao exportar pacientes: " + errorMessage);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <Button
        variant="outline"
        onClick={() => router.push("/dashboard")}
        className="mb-6"
      >
        <ArrowLeft size={18} className="mr-2" /> Voltar para Dashboard
      </Button>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-psiecode-dark-blue">
          Meus Pacientes
        </h1>
        <div className="flex gap-2">
          <Button
            onClick={handleExportPatients}
            className="bg-psiecode-cyan hover:bg-psiecode-light-blue"
            disabled={isLoadingPatients || isExporting || patients.length === 0}
          >
            <Download className="mr-2 h-5 w-5" /> Exportar CSV
          </Button>
          <Button
            onClick={handleOpenModalForNew}
            className="bg-psiecode-light-blue hover:bg-psiecode-medium-blue"
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Paciente
          </Button>
        </div>
      </div>

      {isLoadingPatients && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-5/6 mb-1" />
                <Skeleton className="h-3 w-1/3 mt-2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-1/3 mr-2" />
                <Skeleton className="h-8 w-8 mr-1" />
                <Skeleton className="h-8 w-8" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoadingPatients && patients.length === 0 && (
        <div className="text-center py-10 bg-white p-6 rounded-lg shadow-md">
          <User size={48} className="mx-auto text-psiecode-medium-blue mb-4" />
          <h2 className="text-xl font-semibold text-psiecode-dark-blue mb-2">
            Nenhum paciente cadastrado
          </h2>
          <p className="text-psiecode-medium-blue mb-4">
            Comece adicionando seus pacientes para gerenciar seus prontuários e
            agendamentos.
          </p>
          <Button
            onClick={handleOpenModalForNew}
            className="bg-psiecode-cyan hover:bg-psiecode-light-blue"
          >
            <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Primeiro Paciente
          </Button>
        </div>
      )}

      {!isLoadingPatients && patients.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <Card key={patient.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-psiecode-dark-blue">
                  {patient.fullname}
                </CardTitle>
                {patient.email && (
                  <CardDescription>{patient.email}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="flex-grow">
                {patient.contact_1 && (
                  <p className="text-sm text-psiecode-medium-blue">
                    Contato 1: {patient.contact_1}
                  </p>
                )}
                {patient.contact_2 && (
                  <p className="text-sm text-psiecode-medium-blue">
                    Contato 2: {patient.contact_2}
                  </p>
                )}
                <p
                  className={`text-xs mt-2 ${
                    patient.consent_obtained ? "text-green-600" : "text-red-600"
                  }`}
                >
                  Consentimento:{" "}
                  {patient.consent_obtained ? "Obtido" : "Não Obtido"}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Cadastrado em:{" "}
                  {new Date(patient.created_at).toLocaleDateString("pt-BR")}
                </p>
              </CardContent>
              <CardFooter className="border-t pt-4 flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(`/pacientes/${patient.id}/prontuario`)
                  }
                >
                  <FileText size={16} className="mr-2" /> Ver Prontuário
                </Button>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-psiecode-cyan hover:text-psiecode-dark-blue h-8 w-8"
                    onClick={() => handleOpenModalForEdit(patient)}
                  >
                    <Edit3 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 h-8 w-8"
                    onClick={() => confirmDeletePatient(patient.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={isModalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) resetFormAndCloseModal();
          else setIsModalOpen(isOpen);
        }}
      >
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>
              {editingPatient ? "Editar Paciente" : "Adicionar Novo Paciente"}
            </DialogTitle>
            <DialogDescription>
              {editingPatient
                ? "Atualize os dados do paciente."
                : "Preencha os dados do novo paciente. Campos com * são obrigatórios."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSavePatient}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="fullname" className="text-psiecode-dark-blue">
                  Nome Completo *
                </Label>
                <Input
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Nome completo do paciente"
                  required
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-psiecode-dark-blue">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  required
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="contact1" className="text-psiecode-dark-blue">
                  Contato Principal *
                </Label>
                <Input
                  id="contact1"
                  value={contact1}
                  onChange={(e) => setContact1(e.target.value)}
                  placeholder="(XX) XXXXX-XXXX"
                  required
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="contact2" className="text-psiecode-dark-blue">
                  Contato Secundário
                </Label>
                <Input
                  id="contact2"
                  value={contact2}
                  onChange={(e) => setContact2(e.target.value)}
                  placeholder="(XX) XXXXX-XXXX"
                  className="mt-1"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="consentObtained"
                  checked={consentObtained}
                  onCheckedChange={(checkedState: boolean | "indeterminate") =>
                    setConsentObtained(checkedState === true)
                  }
                  disabled={isSubmitting}
                />
                <Label
                  htmlFor="consentObtained"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-psiecode-dark-blue"
                >
                  Confirmo que obtive o consentimento do paciente para o
                  tratamento dos dados (LGPD).
                </Label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Esta é uma ferramenta para auxiliar no seu controle. A
                responsabilidade legal pela obtenção e gestão do consentimento é
                sua.
              </p>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={resetFormAndCloseModal}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-psiecode-light-blue hover:bg-psiecode-medium-blue"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? editingPatient
                    ? "Salvando..."
                    : "Criando..."
                  : editingPatient
                  ? "Salvar Alterações"
                  : "Salvar Paciente"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente
              este paciente e todos os seus prontuários e agendamentos
              associados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePatient}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Sim, excluir paciente
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Pacientes;
