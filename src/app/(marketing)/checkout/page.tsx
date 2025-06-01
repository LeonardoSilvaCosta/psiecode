"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { showSuccess } from "@/utils/toast";

const Checkout = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showSuccess("Pagamento processado com sucesso! (Simulação)");
    // Para funcionalidade real, você precisaria de um backend como Supabase e integração com gateway de pagamento.
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-psiecode-dark-blue mb-8 text-center">
        Checkout
      </h1>
      <p className="text-lg text-psiecode-medium-blue mb-10 text-center max-w-lg mx-auto">
        Finalize sua assinatura de forma rápida e segura. (Interface Simulada)
      </p>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <div>
          <h2 className="text-2xl font-semibold text-psiecode-dark-blue mb-4">
            Seu Plano: Profissional
          </h2>
          <p className="text-xl text-psiecode-cyan font-bold">R$ 89,90/mês</p>
        </div>
        <hr />
        <div>
          <Label htmlFor="card-name" className="text-psiecode-dark-blue">
            Nome no Cartão
          </Label>
          <Input
            type="text"
            id="card-name"
            placeholder="Nome como aparece no cartão"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="card-number" className="text-psiecode-dark-blue">
            Número do Cartão
          </Label>
          <Input
            type="text"
            id="card-number"
            placeholder="0000 0000 0000 0000"
            required
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry-date" className="text-psiecode-dark-blue">
              Data de Validade
            </Label>
            <Input
              type="text"
              id="expiry-date"
              placeholder="MM/AA"
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="cvc" className="text-psiecode-dark-blue">
              CVC
            </Label>
            <Input
              type="text"
              id="cvc"
              placeholder="123"
              required
              className="mt-1"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-psiecode-light-blue hover:bg-psiecode-medium-blue text-white py-3 text-lg"
        >
          Pagar e Assinar (Simulação)
        </Button>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Para funcionalidades completas de checkout, será necessário integrar
          um backend como o Supabase e um gateway de pagamento.
        </p>
      </form>
    </div>
  );
};

export default Checkout;
