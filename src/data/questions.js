export const questionnaireData = {
  categories: [
    {
      id: 'validation',
      title: 'Validação da Ideia e Problema',
      weight: 0.20,
      description: 'Avaliação da validação do problema, proposta de valor e solução proposta',
      questions: [
        {
          id: 'p1_1',
          type: 'textarea',
          question: 'Descreva o problema principal que sua startup resolve.',
          required: true,
          scoring: {
            5: 'Problema específico, bem definido, com impacto claro',
            4: 'Problema claro com alguma especificidade',
            3: 'Problema identificado mas genérico',
            2: 'Problema vago ou mal definido',
            1: 'Problema inexistente ou incompreensível'
          }
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
          type: 'textarea',
          question: 'Como seu público-alvo resolve este problema atualmente?',
          required: true,
          scoring: {
            5: 'Conhecimento profundo das alternativas e suas limitações',
            4: 'Bom conhecimento das alternativas',
            3: 'Conhecimento básico das alternativas',
            2: 'Conhecimento superficial',
            1: 'Desconhece alternativas'
          }
        },
        {
          id: 'p1_5',
          type: 'text',
          question: 'Qual é sua proposta de valor única em uma frase? (máx. 100 caracteres)',
          required: true,
          maxLength: 100,
          scoring: {
            5: 'UVP clara, concisa e diferenciada',
            4: 'UVP clara com boa diferenciação',
            3: 'UVP identificável mas genérica',
            2: 'UVP confusa ou pouco diferenciada',
            1: 'UVP inexistente ou incompreensível'
          }
        },
        {
          id: 'p1_6',
          type: 'textarea',
          question: 'Por que um cliente escolheria sua solução ao invés das alternativas existentes?',
          required: true,
          scoring: {
            5: 'Diferenciação clara e sustentável',
            4: 'Diferenciação identificável',
            3: 'Alguma diferenciação',
            2: 'Diferenciação mínima',
            1: 'Sem diferenciação'
          }
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
          type: 'textarea',
          question: 'Descreva sua solução em detalhes.',
          required: true,
          scoring: {
            5: 'Solução detalhada, técnica e viável',
            4: 'Solução clara e viável',
            3: 'Solução básica mas compreensível',
            2: 'Solução vaga',
            1: 'Solução inexistente ou inviável'
          }
        },
        {
          id: 'p1_9',
          type: 'boolean_with_details',
          question: 'Sua solução já foi testada com usuários reais?',
          required: true,
          details: 'Se sim, quantos usuários testaram? Quais foram os resultados?',
          scoring: {
            5: 'Sim, mais de 50 usuários com resultados positivos',
            4: 'Sim, 21-50 usuários com bons resultados',
            3: 'Sim, 6-20 usuários com resultados mistos',
            2: 'Sim, 1-5 usuários',
            1: 'Não testou'
          }
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
      weight: 0.18,
      description: 'Análise do mercado, segmentação de clientes e análise da concorrência',
      questions: [
        {
          id: 'p2_1',
          type: 'currency',
          question: 'Qual o tamanho do mercado total (TAM) que você está atacando?',
          required: true,
          scoring: {
            5: 'TAM > R$ 10 bilhões, bem fundamentado',
            4: 'TAM R$ 1-10 bilhões, fundamentado',
            3: 'TAM R$ 100M-1B, razoavelmente fundamentado',
            2: 'TAM < R$ 100M ou mal fundamentado',
            1: 'TAM inexistente ou irrealista'
          }
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
          type: 'currency',
          question: 'Qual o tamanho do mercado endereçável (SAM) para sua solução?',
          required: true,
          scoring: {
            5: 'SAM bem segmentado, 10-30% do TAM',
            4: 'SAM razoavelmente segmentado',
            3: 'SAM identificado mas genérico',
            2: 'SAM mal definido',
            1: 'SAM inexistente'
          }
        },
        {
          id: 'p2_4',
          type: 'percentage',
          question: 'Qual sua meta de participação de mercado em 3 anos?',
          required: true,
          scoring: {
            5: 'Meta realista (0.1-2% do TAM)',
            4: 'Meta otimista mas possível',
            3: 'Meta moderada',
            2: 'Meta muito conservadora',
            1: 'Meta irrealista (>5% do TAM)'
          }
        },
        {
          id: 'p2_5',
          type: 'textarea',
          question: 'Quem é seu cliente ideal (persona principal)?',
          required: true,
          scoring: {
            5: 'Persona detalhada com dados demográficos, comportamentais e necessidades',
            4: 'Persona clara com bom detalhamento',
            3: 'Persona básica mas identificável',
            2: 'Persona vaga',
            1: 'Persona inexistente'
          }
        },
        {
          id: 'p2_6',
          type: 'select',
          question: 'Quantos segmentos de clientes diferentes você atende?',
          required: true,
          options: [
            { value: 5, label: '1', score: 5 },
            { value: 4, label: '2-3', score: 4 },
            { value: 3, label: '4-5', score: 3 },
            { value: 2, label: 'Mais de 5', score: 2 },
            { value: 1, label: 'Segmentos indefinidos', score: 1 }
          ]
        }
      ]
    },
    {
      id: 'team',
      title: 'Equipe e Execução',
      weight: 0.17,
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
          type: 'boolean_with_details',
          question: 'Algum fundador já criou uma empresa antes?',
          required: true,
          details: 'Se sim, qual foi o resultado? (Exit, falência, ainda ativa)',
          scoring: {
            5: 'Exit bem-sucedido anterior',
            4: 'Empresa anterior ainda ativa e bem-sucedida',
            3: 'Experiência anterior com aprendizados',
            2: 'Primeira empresa',
            1: 'Falência anterior sem aprendizados'
          }
        }
      ]
    },
    {
      id: 'technology',
      title: 'Tecnologia e Produto',
      weight: 0.15,
      description: 'Avaliação da inovação tecnológica, qualidade do produto e escalabilidade técnica',
      questions: [
        {
          id: 'p4_1',
          type: 'textarea',
          question: 'Qual o diferencial tecnológico da sua solução?',
          required: true,
          scoring: {
            5: 'Inovação disruptiva comprovada',
            4: 'Inovação significativa',
            3: 'Melhoria incremental relevante',
            2: 'Pequena melhoria',
            1: 'Sem diferencial tecnológico'
          }
        },
        {
          id: 'p4_2',
          type: 'boolean_with_details',
          question: 'Vocês possuem propriedade intelectual (patentes, marcas)?',
          required: true,
          details: 'Se sim, especifique quais e status',
          scoring: {
            5: 'Múltiplas patentes concedidas',
            4: 'Patentes em processo + marcas',
            3: 'Algumas proteções IP',
            2: 'IP básica',
            1: 'Sem proteção IP'
          }
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
          question: 'Qual seu modelo de receita principal?',
          required: true,
          options: [
            { value: 5, label: 'Assinatura', score: 5 },
            { value: 4, label: 'Transação', score: 4 },
            { value: 4, label: 'Marketplace', score: 4 },
            { value: 3, label: 'Freemium', score: 3 },
            { value: 2, label: 'Publicidade', score: 2 },
            { value: 3, label: 'Licenciamento', score: 3 },
            { value: 1, label: 'Outro', score: 1 }
          ]
        },
        {
          id: 'p5_2',
          type: 'currency',
          question: 'Qual o ticket médio por cliente?',
          required: true,
          scoring: {
            5: 'Ticket alto (>R$ 1000) e crescente',
            4: 'Ticket médio (R$ 100-1000)',
            3: 'Ticket baixo mas volume alto',
            2: 'Ticket muito baixo',
            1: 'Ticket indefinido'
          }
        }
      ]
    },
    {
      id: 'traction',
      title: 'Tração e Métricas',
      weight: 0.10,
      description: 'Avaliação do crescimento, métricas de engajamento e receita',
      questions: [
        {
          id: 'p6_1',
          type: 'percentage',
          question: 'Qual o crescimento mensal de usuários?',
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
          id: 'p6_2',
          type: 'number',
          question: 'Quantos clientes pagantes vocês têm?',
          required: true,
          scoring: {
            5: '>1000 clientes pagantes',
            4: '100-1000 clientes pagantes',
            3: '10-100 clientes pagantes',
            2: '1-10 clientes pagantes',
            1: '0 clientes pagantes'
          }
        }
      ]
    },
    {
      id: 'scalability',
      title: 'Escalabilidade e Crescimento',
      weight: 0.05,
      description: 'Avaliação do potencial de escala e plano de expansão',
      questions: [
        {
          id: 'p7_1',
          type: 'select',
          question: 'Seu modelo de negócio é escalável?',
          required: true,
          options: [
            { value: 5, label: 'Muito escalável', score: 5 },
            { value: 4, label: 'Escalável', score: 4 },
            { value: 3, label: 'Moderadamente escalável', score: 3 },
            { value: 2, label: 'Pouco escalável', score: 2 },
            { value: 1, label: 'Não escalável', score: 1 }
          ]
        },
        {
          id: 'p7_2',
          type: 'currency',
          question: 'Quanto capital vocês precisam para os próximos 18 meses?',
          required: true,
          scoring: {
            5: 'Necessidade bem calculada e justificada',
            4: 'Estimativa fundamentada',
            3: 'Estimativa razoável',
            2: 'Estimativa vaga',
            1: 'Não sabe quanto precisa'
          }
        }
      ]
    }
  ]
};

export const scoringRanges = {
  excellent: { min: 85, max: 100, label: 'Investimento Recomendado', color: 'green', description: 'Startup com alto potencial' },
  good: { min: 70, max: 84, label: 'Potencial Interessante', color: 'blue', description: 'Startup com bom potencial' },
  average: { min: 55, max: 69, label: 'Potencial Médio', color: 'yellow', description: 'Startup em desenvolvimento' },
  poor: { min: 40, max: 54, label: 'Baixo Potencial', color: 'orange', description: 'Startup com muitos desafios' },
  bad: { min: 0, max: 39, label: 'Não Recomendado', color: 'red', description: 'Startup com problemas fundamentais' }
};

