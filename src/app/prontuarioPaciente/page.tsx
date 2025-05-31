import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog, // Importar AlertDialog
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { showError, showSuccess, showLoading, dismissToast } from '@/utils/toast';
import { format, parseISO } from 'date-fns';
import { PlusCircle, ArrowLeft, Edit3, Trash2, LayoutDashboard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Patient {
  id: string;
  fullname: string;
}

interface MedicalRecordEntry {
  id: string;
  session_date: string;
  title?: string | null;
  content: string;
  created_at: string;
  updated_at: string;
}

const ProntuarioPaciente = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<MedicalRecordEntry[]>([]);
  const [isLoadingPatient, setIsLoadingPatient] = useState(true);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentRecord, setCurrentRecord] = useState<Partial<MedicalRecordEntry>>({});
  const [sessionDate, setSessionDate] = useState(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
  const [recordTitle, setRecordTitle] = useState("");
  const [recordContent, setRecordContent] = useState("");

  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false); // Estado para o AlertDialog
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null); // Estado para o ID do registro a ser excluído


  const fetchPatientDetails = useCallback(async () => {
    if (!patientId || !user) return;
    setIsLoadingPatient(true);
    try {
      const { data, error } = await supabase
        .from('tb_patients')
        .select('id, fullname')
        .eq('id', patientId)
        .eq('user_id', user.id)
        .single();
      if (error) throw error;
      if (!data) throw new Error("Paciente não encontrado ou não pertence a você.");
      setPatient(data);
    } catch (err: any) {
      showError(err.message || "Erro ao buscar dados do paciente.");
      navigate('/pacientes');
    } finally {
      setIsLoadingPatient(false);
    }
  }, [patientId, user, navigate]);

  const fetchMedicalRecords = useCallback(async () => {
    if (!patientId || !user) return;
    setIsLoadingRecords(true);
    try {
      const { data, error } = await supabase
        .from('tb_medical_records')
        .select('id, session_date, title, content, created_at, updated_at')
        .eq('patient_id', patientId)
        .eq('user_id', user.id)
        .order('session_date', { ascending: false });
      if (error) throw error;
      setRecords(data || []);
    } catch (err: any) {
      showError(err.message || "Erro ao buscar prontuários.");
    } finally {
      setIsLoadingRecords(false);
    }
  }, [patientId, user]);

  useEffect(() => {
    fetchPatientDetails();
    fetchMedicalRecords();
  }, [fetchPatientDetails, fetchMedicalRecords]);

  const resetModalForm = () => {
    setCurrentRecord({});
    setSessionDate(format(new Date(), "yyyy-MM-dd'T'HH:mm"));
    setRecordTitle("");
    setRecordContent("");
  };

  const handleOpenModalForNew = () => {
    resetModalForm();
    setIsModalOpen(true);
  };
  
  const handleOpenModalForEdit = (record: MedicalRecordEntry) => {
    setCurrentRecord(record);
    setSessionDate(format(parseISO(record.session_date), "yyyy-MM-dd'T'HH:mm"));
    setRecordTitle(record.title || "");
    setRecordContent(record.content);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !patientId || !recordContent.trim() || !sessionDate) {
      showError("Conteúdo e data da sessão são obrigatórios.");
      return;
    }
    setIsSubmitting(true);
    const toastId = showLoading(currentRecord.id ? "Atualizando registro..." : "Salvando registro...");

    const recordData = {
      user_id: user.id,
      patient_id: patientId,
      session_date: new Date(sessionDate).toISOString(),
      title: recordTitle.trim() || null,
      content: recordContent.trim(),
    };

    try {
      let error;
      if (currentRecord.id) {
        const { error: updateError } = await supabase
          .from('tb_medical_records')
          .update(recordData)
          .eq('id', currentRecord.id)
          .eq('user_id', user.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('tb_medical_records')
          .insert(recordData);
        error = insertError;
      }
      dismissToast(toastId);
      if (error) throw error;
      showSuccess(`Registro ${currentRecord.id ? 'atualizado' : 'salvo'} com sucesso!`);
      setIsModalOpen(false);
      fetchMedicalRecords();
      resetModalForm();
    } catch (err: any) {
      dismissToast(toastId);
      showError(err.message || "Erro ao salvar registro.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Função para abrir o AlertDialog de exclusão
  const confirmDeleteRecord = (recordId: string) => {
    setRecordToDelete(recordId);
    setIsDeleteAlertOpen(true);
  };

  // Função que executa a exclusão após a confirmação no AlertDialog
  const handleDeleteRecord = async () => {
    if (!user || !recordToDelete) return;

    setIsDeleteAlertOpen(false); // Fecha o modal antes de mostrar o toast de loading
    const toastId = showLoading("Excluindo registro...");

    try {
      const { error } = await supabase
        .from('tb_medical_records')
        .delete()
        .eq('id', recordToDelete)
        .eq('user_id', user.id);
      dismissToast(toastId);
      if (error) throw error;
      showSuccess("Registro excluído com sucesso!");
      fetchMedicalRecords();
    } catch (err: any) {
      dismissToast(toastId);
      showError(err.message || "Erro ao excluir registro.");
    } finally {
      setRecordToDelete(null); // Limpa o ID após a tentativa
    }
  };

  if (isLoadingPatient) {
    return (
      <div className="container mx-auto py-12 px-6">
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-8 w-3/4 mb-8" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container mx-auto py-12 px-6 text-center">
        <h1 className="text-2xl font-bold text-red-600">Paciente não encontrado.</h1>
        <Link to="/pacientes" className="text-psiecode-light-blue hover:underline mt-4 inline-block">
          Voltar para lista de pacientes
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="flex space-x-2 mb-6">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          <LayoutDashboard size={18} className="mr-2" /> Voltar para Dashboard
        </Button>
        <Button variant="outline" onClick={() => navigate('/pacientes')}>
          <ArrowLeft size={18} className="mr-2" /> Voltar para Pacientes
        </Button>
      </div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-psiecode-dark-blue">
          Prontuário de: {patient.fullname}
        </h1>
        <Button onClick={handleOpenModalForNew} className="bg-psiecode-light-blue hover:bg-psiecode-medium-blue">
          <PlusCircle className="mr-2 h-5 w-5" /> Nova Entrada
        </Button>
      </div>

      {isLoadingRecords && (
        <div>
          <Skeleton className="h-24 w-full mb-4" />
          <Skeleton className="h-24 w-full mb-4" />
        </div>
      )}
      {!isLoadingRecords && records.length === 0 && (
        <Card className="text-center py-10">
          <CardContent>
            <p className="text-lg text-psiecode-medium-blue">Nenhuma entrada no prontuário deste paciente ainda.</p>
            <p className="text-sm text-gray-500">Clique em "Nova Entrada" para adicionar a primeira.</p>
          </CardContent>
        </Card>
      )}
      {!isLoadingRecords && records.length > 0 && (
        <div className="space-y-6">
          {records.map(record => (
            <Card key={record.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-psiecode-dark-blue">{record.title || "Entrada de Prontuário"}</CardTitle>
                    <CardDescription>
                      Sessão de: {format(parseISO(record.session_date), "dd/MM/yyyy 'às' HH:mm")}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="icon" className="text-psiecode-cyan hover:text-psiecode-dark-blue h-8 w-8" onClick={() => handleOpenModalForEdit(record)}>
                      <Edit3 size={16}/>
                    </Button>
                     {/* Botão que abre o AlertDialog */}
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 h-8 w-8" onClick={() => confirmDeleteRecord(record.id)}>
                      <Trash2 size={16}/>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-psiecode-medium-blue whitespace-pre-wrap">{record.content}</p>
              </CardContent>
              <CardFooter className="text-xs text-gray-400">
                Criado em: {format(parseISO(record.created_at), "dd/MM/yyyy HH:mm")} | 
                Última atualização: {format(parseISO(record.updated_at), "dd/MM/yyyy HH:mm")}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Modal para Adicionar/Editar Registro */}
      <Dialog open={isModalOpen} onOpenChange={(isOpen) => {
        setIsModalOpen(isOpen);
        if (!isOpen) resetModalForm();
      }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{currentRecord.id ? "Editar Entrada do Prontuário" : "Nova Entrada no Prontuário"}</DialogTitle>
            <DialogDescription>
              {currentRecord.id ? `Editando entrada para ${patient.fullname}.` : `Adicionando nova entrada para ${patient.fullname}.`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4 py-4">
              <div>
                <Label htmlFor="sessionDate" className="text-psiecode-dark-blue">Data e Hora da Sessão *</Label>
                <Input id="sessionDate" type="datetime-local" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} required className="mt-1" disabled={isSubmitting}/>
              </div>
              <div>
                <Label htmlFor="recordTitle" className="text-psiecode-dark-blue">Título (Opcional)</Label>
                <Input id="recordTitle" value={recordTitle} onChange={(e) => setRecordTitle(e.target.value)} placeholder="Ex: Sessão Introdutória, Acompanhamento Ansiedade" className="mt-1" disabled={isSubmitting}/>
              </div>
              <div>
                <Label htmlFor="recordContent" className="text-psiecode-dark-blue">Conteúdo da Sessão / Anotações *</Label>
                <Textarea id="recordContent" value={recordContent} onChange={(e) => setRecordContent(e.target.value)} placeholder="Descreva os principais pontos da sessão, observações, progressos, etc." required rows={8} className="mt-1" disabled={isSubmitting}/>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>Cancelar</Button>
              <Button type="submit" className="bg-psiecode-light-blue hover:bg-psiecode-medium-blue" disabled={isSubmitting}>
                {isSubmitting ? (currentRecord.id ? "Salvando..." : "Criando...") : (currentRecord.id ? "Salvar Alterações" : "Salvar Entrada")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* AlertDialog para Confirmação de Exclusão de Registro */}
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente este registro do prontuário.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRecord} className="bg-red-600 hover:bg-red-700 text-white">
              Sim, excluir registro
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProntuarioPaciente;