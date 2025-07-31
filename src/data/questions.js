export const questionnaireData = {
  categories: [
    {
      id: 'validation',
      title: 'Validação da Ideia e Problema',
      weight: 0.18,
      description: 'Avaliação da validação do problema, proposta de valor e solução proposta',
      questions: [
        {
          id: 'p1_1',
          type: 'select',
          question: 'Qual o nível de definição do problema que sua startup resolve?',
          required: true,
          options: [
            { value: 5, label: 'Problema específico, bem definido, com impacto quantificado', score: 5 },
            { value: 4, label: 'Problema claro com boa especificidade', score: 4 },
            { value: 3, label: 'Problema identificado mas genérico', score: 3 },
            { value: 2, label: 'Problema vago ou mal definido', score: 2 },
            { value: 1, label: 'Problema inexistente ou incompreensível', score: 1 }
          ]
        },
        {
          id: 'p1_2',
          type: 'select',
          question: 'Quantas pessoas você entrevistou para validar este problema?',
          required: true,
          options: [
            { value: 1, label: '0', score: 1 },
            { value: 2, label: '1-5', score: 2 },
            { value: 3, label: '6-20', score: 3 },
            { value: 4, label: '21-50', score: 4 },
            { value: 5, label: 'Mais de 50', score: 5 }
          ]
        },
        {
          id: 'p1_3',
          type: 'select',
          question: 'Qual a frequência com que seu público-alvo enfrenta este problema?',
          required: true,
          options: [
            { value: 5, label: 'Diariamente', score: 5 },
            { value: 4, label: 'Semanalmente', score: 4 },
            { value: 3, label: 'Mensalmente', score: 3 },
            { value: 2, label: 'Ocasionalmente', score: 2 },
            { value: 1, label: 'Raramente', score: 1 }
          ]
        },
        {
          id: 'p1_4',
          type: 'select',
          question: 'Qual seu nível de conhecimento sobre como o problema é resolvido atualmente?',
          required: true,
          options: [
            { value: 5, label: 'Conhecimento profundo das alternativas e suas limitações', score: 5 },
            { value: 4, label: 'Bom conhecimento das alternativas existentes', score: 4 },
            { value: 3, label: 'Conhecimento básico das alternativas', score: 3 },
            { value: 2, label: 'Conhecimento superficial do mercado', score: 2 },
            { value: 1, label: 'Desconhece as alternativas existentes', score: 1 }
          ]
        },
        {
          id: 'p1_5',
          type: 'select',
          question: 'Qual a clareza da sua proposta de valor única?',
          required: true,
          options: [
            { value: 5, label: 'UVP clara, concisa e altamente diferenciada', score: 5 },
            { value: 4, label: 'UVP clara com boa diferenciação', score: 4 },
            { value: 3, label: 'UVP identificável mas genérica', score: 3 },
            { value: 2, label: 'UVP confusa ou pouco diferenciada', score: 2 },
            { value: 1, label: 'UVP inexistente ou incompreensível', score: 1 }
          ]
        },
        {
          id: 'p1_6',
          type: 'select',
          question: 'Qual o nível de diferenciação da sua solução vs. concorrentes?',
          required: true,
          options: [
            { value: 5, label: 'Diferenciação clara e defensável (moat)', score: 5 },
            { value: 4, label: 'Diferenciação identificável e relevante', score: 4 },
            { value: 3, label: 'Alguma diferenciação percebida', score: 3 },
            { value: 2, label: 'Diferenciação mínima ou temporária', score: 2 },
            { value: 1, label: 'Sem diferenciação significativa', score: 1 }
          ]
        },
        {
          id: 'p1_7',
          type: 'select',
          question: 'Qual é o principal benefício que sua solução oferece?',
          required: true,
          options: [
            { value: 5, label: 'Economia de tempo', score: 5 },
            { value: 4, label: 'Economia de dinheiro', score: 4 },
            { value: 3, label: 'Melhoria de qualidade', score: 3 },
            { value: 2, label: 'Conveniência', score: 2 },
            { value: 1, label: 'Outro', score: 1 }
          ]
        },
        {
          id: 'p1_8',
          type: 'select',
          question: 'Qual o nível de detalhamento técnico da sua solução?',
          required: true,
          options: [
            { value: 5, label: 'Solução detalhada, técnica e comprovadamente viável', score: 5 },
            { value: 4, label: 'Solução clara e tecnicamente viável', score: 4 },
            { value: 3, label: 'Solução básica mas compreensível', score: 3 },
            { value: 2, label: 'Solução vaga ou incompleta', score: 2 },
            { value: 1, label: 'Solução inexistente ou tecnicamente inviável', score: 1 }
          ]
        },
        {
          id: 'p1_9',
          type: 'select',
          question: 'Qual o nível de validação com usuários reais?',
          required: true,
          options: [
            { value: 5, label: 'Mais de 50 usuários testaram com resultados positivos', score: 5 },
            { value: 4, label: '21-50 usuários testaram com bons resultados', score: 4 },
            { value: 3, label: '6-20 usuários testaram com resultados mistos', score: 3 },
            { value: 2, label: '1-5 usuários testaram', score: 2 },
            { value: 1, label: 'Não foi testado com usuários reais', score: 1 }
          ]
        },
        {
          id: 'p1_10',
          type: 'select',
          question: 'Qual o estágio atual de desenvolvimento da solução?',
          required: true,
          options: [
            { value: 1, label: 'Apenas ideia', score: 1 },
            { value: 2, label: 'Protótipo', score: 2 },
            { value: 3, label: 'MVP', score: 3 },
            { value: 4, label: 'Produto beta', score: 4 },
            { value: 5, label: 'Produto lançado', score: 5 }
          ]
        }
      ]
    },
    {
      id: 'market',
      title: 'Mercado e Clientes',
      weight: 0.16,
      description: 'Análise do mercado, segmentação de clientes e análise da concorrência',
      questions: [
        {
          id: 'p2_1',
          type: 'select',
          question: 'Qual o tamanho do mercado total (TAM) que você está atacando?',
          required: true,
          options: [
            { value: 5, label: 'TAM > R$ 10 bilhões (bem fundamentado)', score: 5 },
            { value: 4, label: 'TAM R$ 1-10 bilhões (fundamentado)', score: 4 },
            { value: 3, label: 'TAM R$ 100M-1B (razoavelmente fundamentado)', score: 3 },
            { value: 2, label: 'TAM < R$ 100M (mal fundamentado)', score: 2 },
            { value: 1, label: 'TAM inexistente ou irrealista', score: 1 }
          ]
        },
        {
          id: 'p2_2',
          type: 'select',
          question: 'Qual sua fonte para esta estimativa de mercado?',
          required: true,
          options: [
            { value: 5, label: 'Múltiplas fontes confiáveis + pesquisa própria', score: 5 },
            { value: 4, label: 'Relatórios de mercado reconhecidos', score: 4 },
            { value: 3, label: 'Dados governamentais ou pesquisa própria', score: 3 },
            { value: 2, label: 'Estimativas baseadas em analogias', score: 2 },
            { value: 1, label: 'Sem fonte ou fonte não confiável', score: 1 }
          ]
        },
        {
          id: 'p2_3',
          type: 'select',
          question: 'Qual o tamanho do mercado endereçável (SAM) para sua solução?',
          required: true,
          options: [
            { value: 5, label: 'SAM bem segmentado (10-30% do TAM)', score: 5 },
            { value: 4, label: 'SAM razoavelmente segmentado', score: 4 },
            { value: 3, label: 'SAM identificado mas genérico', score: 3 },
            { value: 2, label: 'SAM mal definido', score: 2 },
            { value: 1, label: 'SAM inexistente', score: 1 }
          ]
        },
        {
          id: 'p2_4',
          type: 'select',
          question: 'Qual sua meta de participação de mercado em 3 anos?',
          required: true,
          options: [
            { value: 5, label: 'Meta realista (0.1-2% do TAM)', score: 5 },
            { value: 4, label: 'Meta otimista mas possível (2-3% do TAM)', score: 4 },
            { value: 3, label: 'Meta moderada (<1% do TAM)', score: 3 },
            { value: 2, label: 'Meta muito conservadora (<0.1% do TAM)', score: 2 },
            { value: 1, label: 'Meta irrealista (>5% do TAM)', score: 1 }
          ]
        },
        {
          id: 'p2_5',
          type: 'select',
          question: 'Qual o nível de detalhamento da sua persona principal?',
          required: true,
          options: [
            { value: 5, label: 'Persona detalhada com dados demográficos, comportamentais e necessidades', score: 5 },
            { value: 4, label: 'Persona clara com bom detalhamento', score: 4 },
            { value: 3, label: 'Persona básica mas identificável', score: 3 },
            { value: 2, label: 'Persona vaga ou genérica', score: 2 },
            { value: 1, label: 'Persona inexistente ou mal definida', score: 1 }
          ]
        },
        {
          id: 'p2_6',
          type: 'select',
          question: 'Quantos segmentos de clientes diferentes você atende?',
          required: true,
          options: [
            { value: 5, label: '1 segmento bem definido', score: 5 },
            { value: 4, label: '2-3 segmentos relacionados', score: 4 },
            { value: 3, label: '4-5 segmentos', score: 3 },
            { value: 2, label: 'Mais de 5 segmentos', score: 2 },
            { value: 1, label: 'Segmentos indefinidos', score: 1 }
          ]
        }
      ]
    },
    {
      id: 'team',
      title: 'Equipe e Execução',
      weight: 0.15,
      description: 'Avaliação da experiência da equipe, competências e histórico de execução',
      questions: [
        {
          id: 'p3_1',
          type: 'select',
          question: 'Quantos fundadores tem a startup?',
          required: true,
          options: [
            { value: 3, label: '1', score: 3 },
            { value: 5, label: '2', score: 5 },
            { value: 4, label: '3', score: 4 },
            { value: 2, label: '4 ou mais', score: 2 }
          ]
        },
        {
          id: 'p3_2',
          type: 'select',
          question: 'Qual a experiência prévia dos fundadores no setor?',
          required: true,
          options: [
            { value: 5, label: 'Mais de 10 anos', score: 5 },
            { value: 4, label: '5-10 anos', score: 4 },
            { value: 3, label: '2-5 anos', score: 3 },
            { value: 2, label: 'Menos de 2 anos', score: 2 },
            { value: 1, label: 'Nenhuma', score: 1 }
          ]
        },
        {
          id: 'p3_3',
          type: 'select',
          question: 'Qual a experiência empreendedora dos fundadores?',
          required: true,
          options: [
            { value: 5, label: 'Exit bem-sucedido anterior', score: 5 },
            { value: 4, label: 'Empresa anterior ainda ativa e bem-sucedida', score: 4 },
            { value: 3, label: 'Experiência anterior com aprendizados importantes', score: 3 },
            { value: 2, label: 'Primeira empresa', score: 2 },
            { value: 1, label: 'Falência anterior sem aprendizados', score: 1 }
          ]
        }
      ]
    },
    {
      id: 'technology',
      title: 'Tecnologia e Produto',
      weight: 0.22,
      description: 'Avaliação da inovação tecnológica, qualidade do produto e escalabilidade técnica',
      questions: [
        {
          id: 'p4_1',
          type: 'select',
          question: 'Qual o nível de inovação tecnológica da sua solução?',
          required: true,
          options: [
            { value: 5, label: 'Tecnologia disruptiva com diferencial significativo', score: 5 },
            { value: 4, label: 'Inovação relevante com vantagem competitiva', score: 4 },
            { value: 3, label: 'Melhoria incremental interessante', score: 3 },
            { value: 2, label: 'Implementação padrão do mercado', score: 2 },
            { value: 1, label: 'Tecnologia básica/commoditizada', score: 1 }
          ]
        },
        {
          id: 'p4_2',
          type: 'select',
          question: 'Qual o stack tecnológico principal?',
          required: true,
          options: [
            { value: 5, label: 'Stack moderno e escalável (React/Node/Python + Cloud)', score: 5 },
            { value: 4, label: 'Tecnologias atuais bem implementadas', score: 4 },
            { value: 3, label: 'Stack estável e confiável', score: 3 },
            { value: 2, label: 'Tecnologias funcionais mas não otimizadas', score: 2 },
            { value: 1, label: 'Stack legado com limitações', score: 1 }
          ]
        },
        {
          id: 'p4_3',
          type: 'select',
          question: 'Qual o estágio de desenvolvimento do produto?',
          required: true,
          options: [
            { value: 5, label: 'Produto maduro com múltiplas funcionalidades', score: 5 },
            { value: 4, label: 'MVP funcional com boa aceitação', score: 4 },
            { value: 3, label: 'Protótipo funcional testado', score: 3 },
            { value: 2, label: 'MVP básico em desenvolvimento', score: 2 },
            { value: 1, label: 'Ainda em ideação/planejamento', score: 1 }
          ]
        },
        {
          id: 'p4_4',
          type: 'select',
          question: 'Como está a escalabilidade técnica da solução?',
          required: true,
          options: [
            { value: 5, label: 'Arquitetura cloud-native com auto-scaling', score: 5 },
            { value: 4, label: 'Bem preparada para crescimento', score: 4 },
            { value: 3, label: 'Suporta crescimento moderado', score: 3 },
            { value: 2, label: 'Necessita ajustes para escalar', score: 2 },
            { value: 1, label: 'Limitações significativas de escalabilidade', score: 1 }
          ]
        }
      ]
    },
    {
      id: 'business',
      title: 'Modelo de Negócio e Financeiro',
      weight: 0.15,
      description: 'Análise do modelo de receita, estrutura de custos e projeções financeiras',
      questions: [
        {
          id: 'p5_1',
          type: 'select',
          question: 'Qual o modelo de receita principal?',
          required: true,
          options: [
            { value: 5, label: 'SaaS recorrente', score: 5 },
            { value: 4, label: 'Marketplace com comissão', score: 4 },
            { value: 3, label: 'Assinatura/Subscription', score: 3 },
            { value: 2, label: 'Transacional', score: 2 },
            { value: 1, label: 'Vendas pontuais', score: 1 }
          ]
        },
        {
          id: 'p5_2',
          type: 'currency',
          question: 'Qual o MRR (Receita Recorrente Mensal) atual?',
          required: true,
          scoring: {
            5: 'MRR >R$ 100k',
            4: 'MRR R$ 50-100k',
            3: 'MRR R$ 10-50k',
            2: 'MRR R$ 1-10k',
            1: 'MRR <R$ 1k'
          }
        },
        {
          id: 'p5_3',
          type: 'number',
          question: 'Quantos meses de runway vocês têm?',
          required: true,
          scoring: {
            5: '>18 meses de runway',
            4: '12-18 meses de runway',
            3: '6-12 meses de runway',
            2: '3-6 meses de runway',
            1: '<3 meses de runway'
          }
        }
      ]
    },
    {
      id: 'traction',
      title: 'Tração e Métricas',
      weight: 0.14,
      description: 'Avaliação do crescimento, métricas de engajamento e receita',
      questions: [
        {
          id: 'p6_1',
          type: 'number',
          question: 'Quantos usuários ativos mensais (MAU) vocês têm?',
          required: true,
          scoring: {
            5: '>100.000 MAU',
            4: '10.000-100.000 MAU',
            3: '1.000-10.000 MAU',
            2: '100-1.000 MAU',
            1: '<100 MAU'
          }
        },
        {
          id: 'p6_2',
          type: 'percentage',
          question: 'Qual o crescimento mensal de usuários (MoM)?',
          required: true,
          scoring: {
            5: 'Crescimento >20% ao mês',
            4: 'Crescimento 10-20% ao mês',
            3: 'Crescimento 5-10% ao mês',
            2: 'Crescimento <5% ao mês',
            1: 'Sem crescimento ou decrescimento'
          }
        },
        {
          id: 'p6_3',
          type: 'number',
          question: 'Quantos clientes pagantes vocês têm?',
          required: true,
          scoring: {
            5: '>500 clientes pagantes',
            4: '100-500 clientes pagantes',
            3: '20-100 clientes pagantes',
            2: '5-20 clientes pagantes',
            1: '<5 clientes pagantes'
          }
        }
      ]
    }
  ]
};

export const scoringRanges = {
  excellent: { 
    min: 80, 
    max: 100, 
    label: 'Altamente Recomendado', 
    color: 'green', 
    description: 'Startup com excelente potencial' 
  },
  good: { 
    min: 70, 
    max: 79, 
    label: 'Recomendado', 
    color: 'blue', 
    description: 'Boa oportunidade de investimento' 
  },
  average: { 
    min: 60, 
    max: 69, 
    label: 'Potencial Interessante', 
    color: 'yellow', 
    description: 'Startup promissora em desenvolvimento' 
  },
  poor: { 
    min: 45, 
    max: 59, 
    label: 'Potencial em Desenvolvimento', 
    color: 'orange', 
    description: 'Necessita melhorias antes do investimento' 
  },
  bad: { 
    min: 0, 
    max: 44, 
    label: 'Necessita Mais Desenvolvimento', 
    color: 'red', 
    description: 'Foco no desenvolvimento antes de buscar investimento' 
  }
};

