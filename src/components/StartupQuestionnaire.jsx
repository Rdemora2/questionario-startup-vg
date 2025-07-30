import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionCard } from "./QuestionComponents";
import { ResultsReport } from "./ResultsReport";
import { questionnaireData, scoringRanges } from "../data/questions";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  BarChart3,
} from "lucide-react";

export const StartupQuestionnaire = () => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [results, setResults] = useState(null);

  const categories = questionnaireData.categories;
  const currentCategory = categories[currentCategoryIndex];
  const totalQuestions = categories.reduce(
    (sum, cat) => sum + cat.questions.length,
    0
  );
  const answeredQuestions = Object.keys(answers).length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Clear error for this question
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateCategory = (categoryIndex) => {
    const category = categories[categoryIndex];
    const newErrors = {};
    let isValid = true;

    category.questions.forEach((question) => {
      if (question.required && !answers[question.id]) {
        newErrors[question.id] = "Esta pergunta é obrigatória";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (validateCategory(currentCategoryIndex)) {
      if (currentCategoryIndex < categories.length - 1) {
        setCurrentCategoryIndex((prev) => prev + 1);
      } else {
        calculateResults();
      }
    }
  };

  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex((prev) => prev - 1);
    }
  };

  const calculateQuestionScore = (question, answer) => {
    if (!answer) return 0;

    if (question.options) {
      const option = question.options.find((opt) => opt.value === answer);
      return option ? option.score : 0;
    }

    // For text/textarea questions, we'll need manual scoring
    // For now, return a default score of 3 (satisfactory)
    if (question.type === "textarea" || question.type === "text") {
      return 3; // This should be manually scored in a real implementation
    }

    if (question.type === "boolean_with_details") {
      return answer.answer ? 3 : 1; // Basic scoring for boolean questions
    }

    return 3; // Default score
  };

  const calculateResults = () => {
    const categoryScores = {};
    let totalScore = 0;

    categories.forEach((category) => {
      let categoryTotal = 0;
      let questionCount = 0;

      category.questions.forEach((question) => {
        const answer = answers[question.id];
        const score = calculateQuestionScore(question, answer);
        categoryTotal += score;
        questionCount++;
      });

      const categoryAverage =
        questionCount > 0 ? categoryTotal / questionCount : 0;

      const normalizedAverage = categoryAverage / 5;

      const weightedScore = normalizedAverage * category.weight * 100;

      categoryScores[category.id] = {
        title: category.title,
        average: categoryAverage,
        weightedScore: weightedScore,
        weight: category.weight,
        maxScore: 5,
        questions: category.questions.map((q) => ({
          id: q.id,
          question: q.question,
          answer: answers[q.id],
          score: calculateQuestionScore(q, answers[q.id]),
        })),
      };

      totalScore += weightedScore;
    });

    const scoreRange =
      Object.values(scoringRanges).find(
        (range) => totalScore >= range.min && totalScore <= range.max
      ) || scoringRanges.bad;

    const resultsData = {
      totalScore: Math.round(totalScore * 10) / 10,
      categoryScores,
      scoreRange,
      answeredQuestions,
      totalQuestions,
      completionDate: new Date().toISOString(),
    };

    setResults(resultsData);
    setIsCompleted(true);
  };

  const getCategoryStatus = (categoryIndex) => {
    const category = categories[categoryIndex];
    const answeredInCategory = category.questions.filter(
      (q) => answers[q.id]
    ).length;
    const totalInCategory = category.questions.length;

    if (answeredInCategory === totalInCategory) return "completed";
    if (answeredInCategory > 0) return "partial";
    return "pending";
  };

  const resetQuestionnaire = () => {
    setCurrentCategoryIndex(0);
    setAnswers({});
    setErrors({});
    setIsCompleted(false);
    setResults(null);
  };

  if (isCompleted && results) {
    return <ResultsReport results={results} onRestart={resetQuestionnaire} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Questionário de Avaliação de Startups
        </h1>
        <p className="text-gray-600 mb-4">
          Avalie o potencial da sua startup em múltiplas dimensões para
          identificar viabilidade, escalabilidade e necessidades de
          investimento.
        </p>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progresso Geral</span>
            <span>
              {answeredQuestions} de {totalQuestions} perguntas
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => {
            const status = getCategoryStatus(index);
            const isActive = index === currentCategoryIndex;

            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentCategoryIndex(index)}
                className={`flex items-center gap-2 ${
                  status === "completed"
                    ? "bg-green-50 border-green-200 text-green-700"
                    : status === "partial"
                    ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                    : "bg-gray-50 border-gray-200 text-gray-700"
                }`}
              >
                {status === "completed" && <CheckCircle className="h-4 w-4" />}
                {status === "partial" && <AlertCircle className="h-4 w-4" />}
                <span className="hidden sm:inline">{category.title}</span>
                <span className="sm:hidden">Cat. {index + 1}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Current Category */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-gray-900">
                {currentCategory.title}
              </CardTitle>
              <p className="text-gray-600 mt-1">
                {currentCategory.description}
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              Peso: {(currentCategory.weight * 100).toFixed(0)}%
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Questions */}
      <div className="space-y-6">
        {currentCategory.questions.map((question) => (
          <QuestionCard
            key={question.id}
            question={question}
            value={answers[question.id]}
            onChange={(value) => handleAnswerChange(question.id, value)}
            error={errors[question.id]}
            categoryColor="blue"
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentCategoryIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>

        <div className="text-sm text-gray-600">
          Categoria {currentCategoryIndex + 1} de {categories.length}
        </div>

        <Button onClick={handleNext} className="flex items-center gap-2">
          {currentCategoryIndex === categories.length - 1 ? (
            <>
              <BarChart3 className="h-4 w-4" />
              Ver Resultados
            </>
          ) : (
            <>
              Próxima
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
