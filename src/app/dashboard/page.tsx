"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, MessageSquareHeart } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-3xl md:text-4xl font-bold text-psiecode-dark-blue mb-4">
        Bem-vindo(a) ao seu Painel,{" "}
        {user?.user_metadata?.full_name || user?.email}!
      </h1>
      <p className="text-lg text-psiecode-medium-blue mb-10">
        Acesse aqui os recursos disponíveis para otimizar sua prática.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Agenda Online Simplificada */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-psiecode-dark-blue">
                Agenda Online
              </CardTitle>
              <CalendarDays className="h-8 w-8 text-psiecode-light-blue" />
            </div>
            <CardDescription>
              Organize seus agendamentos de forma prática.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              className="w-full bg-psiecode-cyan hover:bg-psiecode-light-blue text-white"
            >
              <Link href="/agendamento">Acessar Agenda</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Pacientes e Prontuários */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-psiecode-dark-blue">
                Pacientes e Prontuários
              </CardTitle>
              <Users className="h-8 w-8 text-psiecode-light-blue" />
            </div>
            <CardDescription>
              Gerencie seus pacientes e seus prontuários.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              className="w-full bg-psiecode-cyan hover:bg-psiecode-light-blue text-white"
            >
              <Link href="/pacientes">Gerenciar Pacientes</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Suporte Comunitário */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-psiecode-dark-blue">
                Suporte Comunitário
              </CardTitle>
              <MessageSquareHeart className="h-8 w-8 text-psiecode-light-blue" />
            </div>
            <CardDescription>
              Conecte-se com outros profissionais e tire suas dúvidas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              className="w-full bg-psiecode-cyan hover:bg-psiecode-light-blue text-white"
            >
              <Link href="/comunidade">Acessar Comunidade</Link>
            </Button>
            {/* Removida a nota "Em desenvolvimento" pois agora temos uma página */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
