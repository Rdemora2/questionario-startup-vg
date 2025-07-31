export const automaticAnalysis = {
  validateConsistency: (answers) => {
    const warnings = [];

    // Validações originais melhoradas
    const stage = answers["p1_10"];
    const mau = parseFloat(answers["p6_1"]) || 0;
    const clients = parseFloat(answers["p6_3"]) || 0;

    if (stage >= 4 && (mau < 1000 || clients < 10)) {
      warnings.push({
        type: "consistency",
        message: "Produto em estágio avançado mas métricas de tração baixas",
        severity: "high",
        impact: "Inconsistência entre maturidade declarada e dados reais"
      });
    }

    // Validação financeira cruzada aprimorada
    const burnRate = parseFloat(answers["p5_4"]) || 0;
    const runway = parseFloat(answers["p5_5"]) || 0;
    const mrr = parseFloat(answers["p5_2"]) || 0;
    const totalClients = parseFloat(answers["p6_3"]) || 0;

    // Cross-validation MRR vs Clientes vs Estágio
    if (totalClients > 0 && mrr > 0) {
      const ticketMedio = mrr / totalClients;
      
      if (ticketMedio < 10) {
        warnings.push({
          type: "financial_inconsistency",
          message: `Ticket médio muito baixo: R$ ${ticketMedio.toFixed(2)} por cliente`,
          severity: "high",
          impact: "Modelo de negócio pode não ser sustentável"
        });
      }
      
      if (ticketMedio > 10000 && totalClients < 10) {
        warnings.push({
          type: "market_validation",
          message: `Alto ticket (R$ ${ticketMedio.toFixed(2)}) com poucos clientes (${totalClients})`,
          severity: "medium",
          impact: "Necessário validar se mercado suporta esse pricing"
        });
      }
    }

    // Validação Runway vs Burn Rate
    if (burnRate > 0 && runway > 0) {
      const calculatedRunway = Math.floor(1000000 / burnRate);
      if (Math.abs(calculatedRunway - runway) > 6) {
        warnings.push({
          type: "financial",
          message: "Runway informado inconsistente com burn rate",
          severity: "medium",
          impact: "Possível erro nos dados financeiros"
        });
      }

      // Alerta para runway crítico
      if (runway < 6) {
        warnings.push({
          type: "cash_critical",
          message: `Runway crítico: apenas ${runway} meses restantes`,
          severity: "high",
          impact: "Necessidade urgente de captação ou redução de custos"
        });
      }
    }

    // Validação Business Model vs Ticket
    const businessModel = answers["p5_1"];
    const ticket = parseFloat(answers["p5_2"]) || 0;

    if (businessModel === 5 && ticket < 100) {
      warnings.push({
        type: "business",
        message: "Modelo SaaS com ticket médio muito baixo pode ter problemas de escalabilidade",
        severity: "medium",
        impact: "Dificuldade para alcançar unit economics positivos"
      });
    }

    // Nova validação: Crescimento vs Base instalada
    const growth = parseFloat(answers["p6_2"]) || 0;
    if (growth > 20 && mau < 500) {
      warnings.push({
        type: "growth_sustainability",
        message: `Alto crescimento (${growth}%/mês) com base pequena (${mau} MAU)`,
        severity: "medium",
        impact: "Crescimento pode não ser sustentável"
      });
    }

    // Validação Team vs Estágio
    const teamSize = parseFloat(answers["p3_1"]) || 0;
    const techTeam = parseFloat(answers["p3_4"]) || 0;
    
    if (stage >= 4 && teamSize < 5) {
      warnings.push({
        type: "team_scaling",
        message: `Equipe pequena (${teamSize} pessoas) para estágio avançado`,
        severity: "medium",
        impact: "Capacidade limitada de execução"
      });
    }

    if (techTeam < 2 && businessModel === 5) {
      warnings.push({
        type: "tech_capacity",
        message: `Time técnico insuficiente (${techTeam} devs) para SaaS`,
        severity: "high",
        impact: "Risco alto de problemas de desenvolvimento"
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
