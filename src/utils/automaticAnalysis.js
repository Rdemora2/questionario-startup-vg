export const automaticAnalysis = {
  validateConsistency: (answers) => {
    const warnings = [];

    const stage = answers["p1_10"];
    const mau = parseFloat(answers["p6_1"]) || 0;
    const clients = parseFloat(answers["p6_3"]) || 0;

    if (stage >= 4 && (mau < 1000 || clients < 10)) {
      warnings.push({
        type: "consistency",
        message: "Produto em estágio avançado mas métricas de tração baixas",
        severity: "high",
      });
    }

    const burnRate = parseFloat(answers["p5_4"]) || 0;
    const runway = parseFloat(answers["p5_5"]) || 0;

    if (burnRate > 0 && runway > 0) {
      const calculatedRunway = Math.floor(1000000 / burnRate);
      if (Math.abs(calculatedRunway - runway) > 6) {
        warnings.push({
          type: "financial",
          message: "Runway informado inconsistente com burn rate",
          severity: "medium",
        });
      }
    }

    const businessModel = answers["p5_1"];
    const ticket = parseFloat(answers["p5_2"]) || 0;

    if (businessModel === 5 && ticket < 100) {
      warnings.push({
        type: "business",
        message:
          "Modelo SaaS com ticket médio muito baixo pode ter problemas de escalabilidade",
        severity: "medium",
      });
    }

    return warnings;
  },

  assessRisks: (results) => {
    const risks = [];

    Object.entries(results.categoryScores).forEach(([, data]) => {
      if (data.average < 2.5) {
        risks.push({
          category: data.title,
          level: "critical",
          message: `Categoria crítica: ${
            data.title
          } com pontuação ${data.average.toFixed(1)}/5.0`,
          impact: "Pode inviabilizar o investimento",
        });
      } else if (data.average < 3.5) {
        risks.push({
          category: data.title,
          level: "high",
          message: `Área de atenção: ${data.title} precisa de melhorias`,
          impact: "Requer plano de ação específico",
        });
      }
    });

    if (results.categoryScores.technology?.average < 3.5) {
      risks.push({
        category: "Tecnologia",
        level: "critical",
        message: "Riscos tecnológicos significativos para uma software house",
        impact: "Fundamental para o core business",
      });
    }

    return risks;
  },

  benchmarkBySector: (answers, results) => {
    const sector = detectSector(answers);
    const benchmarks = getSectorBenchmarks(sector);

    const comparison = {
      sector,
      position: "N/A",
      insights: [],
    };

    if (results.totalScore >= benchmarks.top25) {
      comparison.position = "Top 25%";
      comparison.insights.push("Startup entre as melhores do setor");
    } else if (results.totalScore >= benchmarks.median) {
      comparison.position = "Acima da mediana";
      comparison.insights.push("Performance acima da média setorial");
    } else {
      comparison.position = "Abaixo da mediana";
      comparison.insights.push(
        "Performance abaixo da média - requer melhorias"
      );
    }

    return comparison;
  },

  generateActionPlan: (results) => {
    const actions = [];

    const sortedCategories = Object.entries(results.categoryScores).sort(
      ([, a], [, b]) => a.average - b.average
    );

    const weakestCategory = sortedCategories[0];

    switch (weakestCategory[0]) {
      case "technology":
        actions.push({
          priority: "Alta",
          category: "Tecnologia",
          action: "Contratar CTO sênior ou consultor técnico",
          timeline: "30 dias",
          impact: "Crítico para software house",
        });
        break;

      case "traction":
        actions.push({
          priority: "Alta",
          category: "Tração",
          action: "Implementar funil de aquisição de clientes estruturado",
          timeline: "60 dias",
          impact: "Essencial para validação",
        });
        break;

      case "validation":
        actions.push({
          priority: "Crítica",
          category: "Validação",
          action: "Realizar pesquisa de mercado e entrevistas com clientes",
          timeline: "45 dias",
          impact: "Fundamental para product-market fit",
        });
        break;

      case "business":
        actions.push({
          priority: "Alta",
          category: "Modelo de Negócio",
          action: "Contratar CFO ou consultor financeiro",
          timeline: "30 dias",
          impact: "Necessário para escalabilidade",
        });
        break;
    }

    // Ações específicas baseadas em pontuações baixas
    if (results.categoryScores.technology?.average < 3) {
      actions.push({
        priority: "Crítica",
        category: "Tecnologia",
        action: "Auditoria técnica completa da arquitetura",
        timeline: "15 dias",
        impact: "Evitar débito técnico crítico",
      });
    }

    return actions;
  },
};

function detectSector(answers) {
  const businessModel = answers["p5_1"];
  const techLevel = answers["p4_1"];

  if (businessModel === 5 && techLevel >= 4) return "SaaS B2B";
  if (businessModel === 4) return "Marketplace";
  if (techLevel >= 4) return "DeepTech";
  return "Tech Geral";
}

function getSectorBenchmarks(sector) {
  const benchmarks = {
    "SaaS B2B": { median: 72, top25: 82 },
    Marketplace: { median: 68, top25: 78 },
    DeepTech: { median: 75, top25: 85 },
    "Tech Geral": { median: 65, top25: 75 },
  };

  return benchmarks[sector] || benchmarks["Tech Geral"];
}

export const techFocusedScoringRanges = {
  excellent: {
    min: 80,
    max: 100,
    label: "Investimento Altamente Recomendado",
    color: "green",
    description: "Startup tech de alto potencial",
  },
  good: {
    min: 70,
    max: 79,
    label: "Potencial Interessante",
    color: "blue",
    description: "Startup tech com bom potencial",
  },
  average: {
    min: 60,
    max: 69,
    label: "Potencial Médio",
    color: "yellow",
    description: "Startup em desenvolvimento - monitorar",
  },
  poor: {
    min: 45,
    max: 59,
    label: "Baixo Potencial",
    color: "orange",
    description: "Requer melhorias significativas",
  },
  bad: {
    min: 0,
    max: 44,
    label: "Não Recomendado",
    color: "red",
    description: "Problemas fundamentais - alto risco",
  },
};
