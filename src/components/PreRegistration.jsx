import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertCircle, ArrowRight, HelpCircle } from "lucide-react";

const FormField = ({
  label,
  tooltip,
  field,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  isTextarea = false,
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2">
      <Label htmlFor={field} className="text-sm font-medium">
        {label}
      </Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <HelpCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-help" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p className="text-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
    {isTextarea ? (
      <Textarea
        id={field}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${
          error ? "border-red-500 focus:border-red-500" : ""
        } min-h-[100px]`}
      />
    ) : (
      <Input
        id={field}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${error ? "border-red-500 focus:border-red-500" : ""}`}
      />
    )}
    {error && (
      <div className="flex items-center gap-2 text-red-600 text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>{error}</span>
      </div>
    )}
  </div>
);

export const PreRegistration = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    ideaName: "",
    ideaDescription: "",
    userName: "",
    email: "",
    whatsapp: "",
    investmentAmount: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = useCallback((field, value) => {
    let formattedValue = value;

    if (field === "investmentAmount") {
      const numbers = value.replace(/\D/g, "");
      if (numbers) {
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(parseInt(numbers));
        formattedValue = formatted;
      } else {
        formattedValue = "";
      }
    }

    setFormData((prev) => ({
      ...prev,
      [field]: formattedValue,
    }));

    setErrors((prev) => {
      if (prev[field]) {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
      return prev;
    });
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ideaName.trim()) {
      newErrors.ideaName = "Nome da ideia é obrigatório";
    }

    if (!formData.ideaDescription.trim()) {
      newErrors.ideaDescription = "Descrição da ideia é obrigatória";
    }

    if (!formData.userName.trim()) {
      newErrors.userName = "Seu nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (
      !/^\+?[\d\s\-()]{10,}$/.test(formData.whatsapp.replace(/\s/g, ""))
    ) {
      newErrors.whatsapp = "WhatsApp inválido (use formato: +55 11 99999-9999)";
    }

    if (!formData.investmentAmount.trim()) {
      newErrors.investmentAmount = "Valor de investimento é obrigatório";
    } else {
      const numericValue = formData.investmentAmount.replace(/[^\d]/g, "");
      if (!numericValue || parseInt(numericValue) < 1000) {
        newErrors.investmentAmount = "Valor mínimo de R$ 1.000";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img
              src="/logo_vg.webp"
              alt="Valiant Group Logo"
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Vamos nos conhecer melhor!
          </CardTitle>
          <p className="text-gray-600 text-sm mt-2">
            Antes de avaliarmos sua startup, precisamos de algumas informações
            básicas.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Nome da ideia"
              tooltip="Gostamos de chamar as coisas pelo nome, ajuda a acontecer"
              field="ideaName"
              placeholder="Ex: MeuApp, TechSolution..."
              value={formData.ideaName}
              onChange={(e) => handleInputChange("ideaName", e.target.value)}
              error={errors.ideaName}
            />

            <FormField
              label="Descrição da ideia"
              tooltip="Conte-nos mais sobre sua ideia. O que ela resolve? Como funciona?"
              field="ideaDescription"
              placeholder="Descreva sua ideia de negócio, o problema que resolve e como pretende solucioná-lo..."
              value={formData.ideaDescription}
              onChange={(e) =>
                handleInputChange("ideaDescription", e.target.value)
              }
              error={errors.ideaDescription}
              isTextarea={true}
            />

            <FormField
              label="Seu Nome"
              tooltip="Precisamos nos conhecer melhor"
              field="userName"
              placeholder="Seu nome completo"
              value={formData.userName}
              onChange={(e) => handleInputChange("userName", e.target.value)}
              error={errors.userName}
            />

            <FormField
              label="Seu e-mail"
              tooltip="Uma forma de conseguirmos passar mais detalhes e gerar uma conversa"
              field="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={errors.email}
            />

            <FormField
              label="Seu WhatsApp"
              tooltip="Um jeito mais fácil de te contatar. Prometemos não enviar spam, blz?"
              field="whatsapp"
              type="tel"
              placeholder="+55 11 99999-9999"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange("whatsapp", e.target.value)}
              error={errors.whatsapp}
            />

            <FormField
              label="Quanto está disposto a investir?"
              tooltip="Valor que você tem disponível ou pretende investir na ideia. Isso nos ajuda a entender o estágio e as possibilidades do projeto."
              field="investmentAmount"
              type="text"
              placeholder="Ex: R$ 10.000, R$ 50.000, R$ 100.000..."
              value={formData.investmentAmount}
              onChange={(e) =>
                handleInputChange("investmentAmount", e.target.value)
              }
              error={errors.investmentAmount}
            />

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
            >
              Começar Avaliação
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
