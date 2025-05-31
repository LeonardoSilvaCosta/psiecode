"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showError, showSuccess, showInfo } from "@/utils/toast";
import { supabase } from "@/lib/supabaseClient";

const Contato = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Mostrar mensagem de carregamento
    showInfo("Enviando mensagem...");

    try {
      const { error } = await supabase
        .from("tb_contact_messages")
        .insert([{ name, email, message }]);

      if (error) {
        console.error("Erro ao salvar mensagem:", error);
        showError(`Erro ao enviar: ${error.message}`);
      } else {
        showSuccess("Mensagem enviada com sucesso!");
        setName("");
        setEmail("");
        setMessage("");
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      showError("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-psiecode-dark-blue mb-8 text-center">
        Entre em Contato
      </h1>
      <p className="text-lg text-psiecode-medium-blue mb-10 text-center max-w-lg mx-auto">
        Tem alguma dúvida ou sugestão? Adoraríamos ouvir você! Preencha o
        formulário abaixo.
      </p>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <div>
          <Label htmlFor="name" className="text-psiecode-dark-blue">
            Nome Completo
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Seu nome"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 border-psiecode-light-blue focus:ring-psiecode-cyan"
            disabled={isLoading}
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-psiecode-dark-blue">
            E-mail
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="seu@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 border-psiecode-light-blue focus:ring-psiecode-cyan"
            disabled={isLoading}
          />
        </div>
        <div>
          <Label htmlFor="message" className="text-psiecode-dark-blue">
            Mensagem
          </Label>
          <Textarea
            id="message"
            placeholder="Sua mensagem..."
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 border-psiecode-light-blue focus:ring-psiecode-cyan"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-psiecode-light-blue hover:bg-psiecode-medium-blue text-white"
          disabled={isLoading}
        >
          {isLoading ? "Enviando..." : "Enviar Mensagem"}
        </Button>
      </form>
    </div>
  );
};

export default Contato;
