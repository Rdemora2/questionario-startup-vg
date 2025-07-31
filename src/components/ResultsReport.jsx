import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { automaticAnalysis } from "../utils/automaticAnalysis";
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw,
  Target,
  DollarSign,
  Users,
  Lightbulb,
  Shield,
  Zap,
  Brain,
  TrendingDown,
} from "lucide-react";

export const ResultsReport = ({ results, onRestart }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const automaticInsights = {
    consistencyWarnings: automaticAnalysis.validateConsistency(
      results.answers || {}
    ),
    risks: automaticAnalysis.assessRisks(results),
    benchmark: automaticAnalysis.benchmarkBySector(
      results.answers || {},
      results
    ),
    actionPlan: automaticAnalysis.generateActionPlan(results),
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (score >= 70) return "text-blue-600 bg-blue-50 border-blue-200";
    if (score >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (score >= 45) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getCategoryIcon = (categoryId) => {
    const icons = {
      validation: <Lightbulb className="h-5 w-5" />,
      market: <Target className="h-5 w-5" />,
      team: <Users className="h-5 w-5" />,
      technology: <Zap className="h-5 w-5" />,
      business: <DollarSign className="h-5 w-5" />,
      traction: <TrendingUp className="h-5 w-5" />,
      scalability: <BarChart3 className="h-5 w-5" />,
    };
    return icons[categoryId] || <CheckCircle className="h-5 w-5" />;
  };

  const getRecommendations = () => {
    const recommendations = [];

    Object.entries(results.categoryScores).forEach(([, categoryData]) => {
      if (categoryData.average < 3) {
        recommendations.push({
          category: categoryData.title,
          priority: "high",
          message: `Área crítica que precisa de atenção imediata. Pontuação: ${categoryData.average.toFixed(
            1
          )}/5.0`,
        });
      } else if (categoryData.average < 4) {
        recommendations.push({
          category: categoryData.title,
          priority: "medium",
          message: `Área com potencial de melhoria. Pontuação: ${categoryData.average.toFixed(
            1
          )}/5.0`,
        });
      }
    });

    return recommendations;
  };

  const getInvestmentRecommendation = () => {
    const score = results.totalScore;

    if (score >= 80) {
      return {
        recommendation: "INVESTIMENTO ALTAMENTE RECOMENDADO",
        risk: "Baixo",
        action: "Prosseguir com due diligence técnica detalhada",
        amount: "Investimento completo conforme solicitado",
      };
    } else if (score >= 70) {
      return {
        recommendation: "POTENCIAL INTERESSANTE",
        risk: "Baixo a Médio",
        action: "Análise técnica mais profunda necessária",
        amount: "Investimento com milestone de tecnologia",
      };
    } else if (score >= 60) {
      return {
        recommendation: "POTENCIAL MÉDIO",
        risk: "Médio",
        action: "Aguardar melhorias ou investimento seed menor",
        amount: "Investimento reduzido com acompanhamento",
      };
    } else if (score >= 45) {
      return {
        recommendation: "BAIXO POTENCIAL",
        risk: "Alto",
        action: "Não investir no momento - muitas lacunas",
        amount: "Não recomendado",
      };
    } else {
      return {
        recommendation: "NÃO RECOMENDADO",
        risk: "Muito Alto",
        action: "Não investir - problemas fundamentais",
        amount: "Não recomendado",
      };
    }
  };

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `startup-evaluation-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const recommendations = getRecommendations();
  const investmentRec = getInvestmentRecommendation();

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Relatório de Avaliação da Startup
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={exportResults}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button onClick={onRestart} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Nova Avaliação
            </Button>
          </div>
        </div>

        {/* Score Overview */}
        <Card className={`border-2 ${getScoreColor(results.totalScore)}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Pontuação Final: {results.totalScore}/100
                </h2>
                <p className="text-lg font-medium mb-1">
                  {results.scoreRange?.label || "Score não classificado"}
                </p>
                <p className="text-sm opacity-80">
                  {results.scoreRange?.description ||
                    "Descrição não disponível"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold mb-2">
                  {results.totalScore.toFixed(1)}
                </div>
                <Badge variant="outline" className="text-sm">
                  {results.answeredQuestions}/{results.totalQuestions} perguntas
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="categories">Por Categoria</TabsTrigger>
          <TabsTrigger value="analysis">Análise IA</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          <TabsTrigger value="investment">Investimento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Category Scores Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Pontuação por Categoria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(results.categoryScores).map(
                  ([categoryId, categoryData]) => (
                    <div key={categoryId} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(categoryId)}
                          <span className="font-medium">
                            {categoryData.title}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Peso: {(categoryData.weight * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        <div className="text-right">
                          <span className="font-bold">
                            {categoryData.weightedScore.toFixed(1)} pts
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
                            ({categoryData.average.toFixed(1)}/5.0)
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={(categoryData.average / 5) * 100}
                        className="h-2"
                      />
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  Principais Forças
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(results.categoryScores)
                    .sort(([, a], [, b]) => b.average - a.average)
                    .slice(0, 3)
                    .map(([categoryId, categoryData]) => (
                      <div
                        key={categoryId}
                        className="flex items-center justify-between p-2 bg-green-50 rounded"
                      >
                        <span className="text-sm font-medium">
                          {categoryData.title}
                        </span>
                        <Badge variant="outline" className="text-green-600">
                          {categoryData.average.toFixed(1)}/5.0
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="h-5 w-5" />
                  Áreas de Melhoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(results.categoryScores)
                    .sort(([, a], [, b]) => a.average - b.average)
                    .slice(0, 3)
                    .map(([categoryId, categoryData]) => (
                      <div
                        key={categoryId}
                        className="flex items-center justify-between p-2 bg-orange-50 rounded"
                      >
                        <span className="text-sm font-medium">
                          {categoryData.title}
                        </span>
                        <Badge variant="outline" className="text-orange-600">
                          {categoryData.average.toFixed(1)}/5.0
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          {Object.entries(results.categoryScores).map(
            ([categoryId, categoryData]) => (
              <Card key={categoryId}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(categoryId)}
                    {categoryData.title}
                    <Badge variant="outline">
                      {categoryData.average.toFixed(1)}/5.0
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categoryData.questions.map((question) => (
                      <div key={question.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-medium text-gray-700 flex-1">
                            {question.question}
                          </p>
                          <Badge variant="outline" className="ml-2">
                            {question.score}/5
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Resposta:</strong>{" "}
                          {typeof question.answer === "object"
                            ? JSON.stringify(question.answer)
                            : question.answer || "Não respondida"}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {/* Análise Automática de Consistência */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Análise Automática de Consistência
              </CardTitle>
            </CardHeader>
            <CardContent>
              {automaticInsights.consistencyWarnings.length > 0 ? (
                <div className="space-y-3">
                  {automaticInsights.consistencyWarnings.map(
                    (warning, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-l-4 ${
                          warning.severity === "high"
                            ? "border-red-500 bg-red-50"
                            : "border-yellow-500 bg-yellow-50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle
                            className={`h-4 w-4 ${
                              warning.severity === "high"
                                ? "text-red-500"
                                : "text-yellow-500"
                            }`}
                          />
                          <Badge
                            variant={
                              warning.severity === "high"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {warning.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm">{warning.message}</p>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Nenhuma inconsistência detectada nas respostas</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Análise de Riscos Automática */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Riscos Identificados Automaticamente
              </CardTitle>
            </CardHeader>
            <CardContent>
              {automaticInsights.risks.length > 0 ? (
                <div className="space-y-4">
                  {automaticInsights.risks.map((risk, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        risk.level === "critical"
                          ? "border-red-200 bg-red-50"
                          : "border-orange-200 bg-orange-50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{risk.category}</span>
                        <Badge
                          variant={
                            risk.level === "critical"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {risk.level === "critical" ? "Crítico" : "Alto"}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{risk.message}</p>
                      <p className="text-xs text-gray-600">{risk.impact}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Nenhum risco crítico identificado</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Benchmarking Setorial */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Benchmarking Automático
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <span className="font-medium">Setor Identificado:</span>
                    <span className="ml-2">
                      {automaticInsights.benchmark.sector}
                    </span>
                  </div>
                  <Badge variant="outline">
                    {automaticInsights.benchmark.position}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {automaticInsights.benchmark.insights.map(
                    (insight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{insight}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plano de Ação Automático */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Plano de Ação Automatizado
              </CardTitle>
            </CardHeader>
            <CardContent>
              {automaticInsights.actionPlan.length > 0 ? (
                <div className="space-y-4">
                  {automaticInsights.actionPlan.map((action, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{action.category}</span>
                        <Badge
                          variant={
                            action.priority === "Crítica"
                              ? "destructive"
                              : action.priority === "Alta"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {action.priority}
                        </Badge>
                      </div>
                      <p className="text-sm mb-2">{action.action}</p>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>Timeline: {action.timeline}</span>
                        <span>Impacto: {action.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>
                    Startup bem estruturada - sem ações críticas identificadas
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Recomendações Prioritárias
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recommendations.length > 0 ? (
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-l-4 ${
                        rec.priority === "high"
                          ? "border-red-500 bg-red-50"
                          : "border-yellow-500 bg-yellow-50"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            rec.priority === "high"
                              ? "text-red-500"
                              : "text-yellow-500"
                          }`}
                        />
                        <span className="font-medium">{rec.category}</span>
                        <Badge
                          variant={
                            rec.priority === "high"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {rec.priority === "high"
                            ? "Alta Prioridade"
                            : "Média Prioridade"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{rec.message}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Excelente Performance!
                  </h3>
                  <p className="text-gray-600">
                    Todas as categorias estão com pontuação satisfatória ou
                    superior.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investment" className="space-y-6">
          <Card className={`border-2 ${getScoreColor(results.totalScore)}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Recomendação de Investimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">
                      Recomendação
                    </h4>
                    <p className="text-lg font-bold">
                      {investmentRec.recommendation}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">
                      Nível de Risco
                    </h4>
                    <p className="text-sm">{investmentRec.risk}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">
                      Ação Recomendada
                    </h4>
                    <p className="text-sm">{investmentRec.action}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">
                      Valor do Investimento
                    </h4>
                    <p className="text-sm">{investmentRec.amount}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Assessment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Análise de Riscos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(results.categoryScores)
                  .filter(([, categoryData]) => categoryData.average < 3.5)
                  .map(([categoryId, categoryData]) => (
                    <div
                      key={categoryId}
                      className="p-4 border rounded-lg bg-yellow-50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="font-medium">
                          {categoryData.title}
                        </span>
                        <Badge variant="outline" className="text-yellow-600">
                          Risco Identificado
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">
                        Pontuação abaixo da média (
                        {categoryData.average.toFixed(1)}/5.0). Requer atenção
                        especial e plano de mitigação.
                      </p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
