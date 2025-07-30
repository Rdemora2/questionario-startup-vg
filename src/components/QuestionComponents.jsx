import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

export const TextQuestion = ({ question, value, onChange, error }) => {
  return (
    <div className="space-y-2">
      <Input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite sua resposta..."
        maxLength={question.maxLength}
        className={error ? 'border-red-500' : ''}
      />
      {question.maxLength && (
        <div className="text-sm text-gray-500 text-right">
          {(value || '').length}/{question.maxLength}
        </div>
      )}
    </div>
  );
};

export const TextareaQuestion = ({ question, value, onChange, error }) => {
  return (
    <div className="space-y-2">
      <Textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Digite sua resposta detalhada..."
        rows={4}
        className={error ? 'border-red-500' : ''}
      />
    </div>
  );
};

export const SelectQuestion = ({ question, value, onChange, error }) => {
  return (
    <div className="space-y-2">
      <Select value={value?.toString()} onValueChange={(val) => onChange(parseInt(val))}>
        <SelectTrigger className={error ? 'border-red-500' : ''}>
          <SelectValue placeholder="Selecione uma opção..." />
        </SelectTrigger>
        <SelectContent>
          {question.options.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const RadioQuestion = ({ question, value, onChange, error }) => {
  return (
    <div className="space-y-3">
      <RadioGroup value={value?.toString()} onValueChange={(val) => onChange(parseInt(val))}>
        {question.options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value.toString()} id={`${question.id}_${option.value}`} />
            <Label htmlFor={`${question.id}_${option.value}`} className="cursor-pointer">
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export const NumberQuestion = ({ question, value, onChange, error }) => {
  return (
    <div className="space-y-2">
      <Input
        type="number"
        value={value || ''}
        onChange={(e) => onChange(e.target.value ? parseInt(e.target.value) : '')}
        placeholder="Digite um número..."
        className={error ? 'border-red-500' : ''}
      />
    </div>
  );
};

export const CurrencyQuestion = ({ question, value, onChange, error }) => {
  const formatCurrency = (val) => {
    if (!val) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(val);
  };

  const handleChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    onChange(val ? parseInt(val) : '');
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
        <Input
          type="text"
          value={value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''}
          onChange={handleChange}
          placeholder="0"
          className={`pl-10 ${error ? 'border-red-500' : ''}`}
        />
      </div>
      {value && (
        <div className="text-sm text-gray-600">
          Valor: {formatCurrency(value)}
        </div>
      )}
    </div>
  );
};

export const PercentageQuestion = ({ question, value, onChange, error }) => {
  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(e.target.value ? parseFloat(e.target.value) : '')}
          placeholder="0"
          min="0"
          max="100"
          step="0.1"
          className={`pr-8 ${error ? 'border-red-500' : ''}`}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
      </div>
    </div>
  );
};

export const BooleanWithDetailsQuestion = ({ question, value, onChange, error }) => {
  const [showDetails, setShowDetails] = useState(value?.answer === true);

  const handleBooleanChange = (answer) => {
    const newValue = { answer, details: value?.details || '' };
    onChange(newValue);
    setShowDetails(answer);
  };

  const handleDetailsChange = (details) => {
    onChange({ ...value, details });
  };

  return (
    <div className="space-y-4">
      <RadioGroup 
        value={value?.answer?.toString()} 
        onValueChange={(val) => handleBooleanChange(val === 'true')}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id={`${question.id}_yes`} />
          <Label htmlFor={`${question.id}_yes`} className="cursor-pointer">Sim</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id={`${question.id}_no`} />
          <Label htmlFor={`${question.id}_no`} className="cursor-pointer">Não</Label>
        </div>
      </RadioGroup>

      {showDetails && (
        <div className="space-y-2 pl-4 border-l-2 border-blue-200">
          <Label className="text-sm text-gray-600">{question.details}</Label>
          <Textarea
            value={value?.details || ''}
            onChange={(e) => handleDetailsChange(e.target.value)}
            placeholder="Forneça mais detalhes..."
            rows={3}
          />
        </div>
      )}
    </div>
  );
};

export const QuestionCard = ({ question, value, onChange, error, categoryColor = 'blue' }) => {
  const renderQuestionInput = () => {
    switch (question.type) {
      case 'text':
        return <TextQuestion question={question} value={value} onChange={onChange} error={error} />;
      case 'textarea':
        return <TextareaQuestion question={question} value={value} onChange={onChange} error={error} />;
      case 'select':
        return <SelectQuestion question={question} value={value} onChange={onChange} error={error} />;
      case 'radio':
        return <RadioQuestion question={question} value={value} onChange={onChange} error={error} />;
      case 'number':
        return <NumberQuestion question={question} value={value} onChange={onChange} error={error} />;
      case 'currency':
        return <CurrencyQuestion question={question} value={value} onChange={onChange} error={error} />;
      case 'percentage':
        return <PercentageQuestion question={question} value={value} onChange={onChange} error={error} />;
      case 'boolean_with_details':
        return <BooleanWithDetailsQuestion question={question} value={value} onChange={onChange} error={error} />;
      default:
        return <TextQuestion question={question} value={value} onChange={onChange} error={error} />;
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {question.question}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
              {renderQuestionInput()}
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </div>
          </div>

          {question.scoring && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Critérios de Avaliação:</span>
              </div>
              <div className="space-y-1">
                {Object.entries(question.scoring).map(([score, description]) => (
                  <div key={score} className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="w-6 h-6 flex items-center justify-center p-0">
                      {score}
                    </Badge>
                    <span className="text-gray-600">{description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

