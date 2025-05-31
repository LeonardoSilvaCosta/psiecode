"use client";

import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

const Precos = () => {
  const { user, isLoading, userSubscription, isLoadingSubscription } =
    useAuth();

  const plansData = [
    {
      id: "free",
      name: "Plano Free",
      price: "Grátis",
      features: [
        "Agenda Online Simplificada",
        "Prontuário Digital (até 10 pacientes)",
        "Suporte Comunitário",
      ],
      cta: "Comece Grátis",
      ctaLink: !isLoading && user ? "/dashboard" : "/cadastro",
      enabled: true,
      isPopular: false,
    },
    {
      id: "professional",
      name: "Plano Profissional",
      price: "R$ 89,90",
      features: [
        "Todas as funcionalidades do Free",
        "Pacientes Ilimitados",
        "Relatórios Avançados",
        "Suporte Prioritário por E-mail",
      ],
      isPopular: true,
      cta: "Em Breve",
      ctaLink: "#",
      enabled: false,
    },
    {
      id: "premium",
      name: "Plano Premium",
      price: "R$ 129,90",
      features: [
        "Todas as funcionalidades do Profissional",
        "Teleconsulta Integrada",
        "Personalização da Marca",
        "API de Integração",
        "Suporte Dedicado por Chat",
      ],
      isPopular: false,
      cta: "Em Breve",
      ctaLink: "#",
      enabled: false,
    },
  ];

  if (isLoading || (user && isLoadingSubscription)) {
    return (
      <div className="container mx-auto py-12 px-6 text-center">
        <p className="text-lg text-psiecode-medium-blue">
          Carregando planos e sua assinatura...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-psiecode-dark-blue mb-4 text-center">
          Planos e Preços
        </h1>
        <p className="text-lg text-psiecode-medium-blue mb-12 text-center max-w-2xl mx-auto">
          Escolha o plano que melhor se adapta às suas necessidades e comece a
          transformar sua prática hoje mesmo.
        </p>
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plansData.map((plan) => {
            const isCurrentUserPlan =
              userSubscription?.plan_id === plan.id &&
              userSubscription?.status === "active";
            let ctaText = plan.cta;
            const ctaLink = plan.ctaLink;
            let ctaDisabled = !plan.enabled;

            if (isCurrentUserPlan && plan.enabled) {
              ctaText = "Seu Plano Atual";
              ctaDisabled = true;
            } else if (isCurrentUserPlan && !plan.enabled) {
              ctaText = "Plano Atual (Desativado)";
              ctaDisabled = true;
            } else if (!plan.enabled) {
              ctaText = "Em Breve";
              ctaDisabled = true;
            }

            // Define a cor base do texto para o card
            // Se o plano for popular e habilitado, texto branco. Senão, texto azul escuro.
            // Se o plano for popular e DESABILITADO, o card tem fundo escuro, então o texto borrado deve ser branco.
            let titleTextColorClass = "text-psiecode-dark-blue";
            if (plan.isPopular) {
              titleTextColorClass = "text-white"; // Para planos populares (habilitados ou desabilitados)
            }
            if (isCurrentUserPlan && plan.isPopular) {
              // Se for o plano atual e popular, já tem fundo escuro
              titleTextColorClass = "text-white";
            } else if (isCurrentUserPlan && !plan.isPopular) {
              // Se for o plano atual e não popular, fundo branco
              titleTextColorClass = "text-psiecode-dark-blue";
            }

            return (
              <div
                key={plan.id}
                className={`p-8 rounded-lg shadow-lg flex flex-col relative transition-all duration-300
                  ${
                    isCurrentUserPlan
                      ? "border-2 border-psiecode-cyan scale-105"
                      : ""
                  }
                  ${
                    plan.isPopular && plan.enabled && !isCurrentUserPlan
                      ? "bg-psiecode-dark-blue text-white border-2 border-psiecode-light-blue"
                      : ""
                  }
                  ${
                    !plan.isPopular && plan.enabled && !isCurrentUserPlan
                      ? "bg-white text-psiecode-dark-blue"
                      : ""
                  }
                  ${
                    !plan.enabled && plan.isPopular
                      ? "bg-psiecode-dark-blue text-white opacity-75"
                      : ""
                  }
                  ${
                    !plan.enabled && !plan.isPopular
                      ? "bg-white text-psiecode-dark-blue opacity-75"
                      : ""
                  }`}
              >
                {isCurrentUserPlan && (
                  <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-psiecode-cyan text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center">
                    <Star size={14} className="mr-1 fill-white" /> Seu Plano
                  </div>
                )}

                {plan.isPopular && plan.enabled && !isCurrentUserPlan && (
                  <div className="text-center mb-4">
                    <span className="bg-psiecode-light-blue text-white px-3 py-1 text-sm font-semibold rounded-full">
                      Mais Popular
                    </span>
                  </div>
                )}
                {plan.isPopular && !plan.enabled && (
                  <div className="text-center mb-4 h-[28px]"></div>
                )}

                <h2
                  className={`text-2xl font-semibold mb-2 text-center 
                                ${!plan.enabled ? "blur-sm" : ""} 
                                ${
                                  !plan.enabled && plan.isPopular
                                    ? "text-white"
                                    : titleTextColorClass
                                }
                              `}
                >
                  {plan.name}
                </h2>

                <div
                  className={`text-4xl font-bold mb-6 text-center ${
                    plan.isPopular && plan.enabled && !isCurrentUserPlan
                      ? "text-psiecode-light-blue"
                      : "text-psiecode-cyan"
                  }`}
                >
                  {plan.enabled ? (
                    <>
                      {plan.price}
                      {plan.name !== "Plano Free" && (
                        <span className="text-lg font-normal">/mês</span>
                      )}
                    </>
                  ) : (
                    <span className="opacity-0 select-none pointer-events-none">
                      R$XX,XX
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {(plan.enabled
                    ? plan.features
                    : [
                        "Lorem ipsum dolor.",
                        "Sit amet consectetur.",
                        "Adipiscing elit.",
                      ]
                  ).map((feature, index) => (
                    <li
                      key={index}
                      className={`flex items-start ${
                        !plan.enabled
                          ? `blur-sm ${
                              plan.isPopular ? "text-gray-300" : "text-gray-500"
                            }`
                          : plan.isPopular && plan.enabled
                          ? "text-gray-200"
                          : "text-psiecode-medium-blue"
                      }`}
                    >
                      <Check
                        className={`h-5 w-5 mr-2 mt-1 flex-shrink-0 ${
                          plan.isPopular && plan.enabled && !isCurrentUserPlan
                            ? "text-psiecode-light-blue"
                            : "text-psiecode-cyan"
                        } ${!plan.enabled ? "opacity-60" : ""}`}
                      />
                      <span className={`${!plan.enabled ? "opacity-80" : ""}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.enabled && !isCurrentUserPlan ? (
                  <Button
                    asChild
                    size="lg"
                    className={`w-full ${
                      plan.isPopular
                        ? "bg-psiecode-light-blue hover:bg-psiecode-cyan text-white"
                        : "bg-psiecode-cyan hover:bg-psiecode-light-blue text-white"
                    }`}
                  >
                    <Link href={ctaLink || "/checkout"}>{ctaText}</Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    disabled={ctaDisabled}
                    className={`w-full ${
                      isCurrentUserPlan
                        ? "bg-psiecode-cyan text-white cursor-default"
                        : plan.isPopular
                        ? "bg-psiecode-light-blue text-white"
                        : "bg-psiecode-cyan text-white"
                    } ${
                      ctaDisabled && !isCurrentUserPlan
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    } ${isCurrentUserPlan ? "opacity-100" : ""}`}
                  >
                    {ctaText}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Precos;
