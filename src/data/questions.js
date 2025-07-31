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
            { value: 5, label: 'Tecnologia disruptiva/patenteável', score: 5 },
            { value: 4, label: 'Inovação significativa com diferencial técnico', score: 4 },
            { value: 3, label: 'Melhoria incremental relevante', score: 3 },
            { value: 2, label: 'Implementação padrão com pequenas melhorias', score: 2 },
            { value: 1, label: 'Tecnologia commoditizada', score: 1 }
          ]
        },
        {
          id: 'p4_2',
          type: 'select',
          question: 'Qual a arquitetura principal da sua solução?',
          required: true,
          options: [
            { value: 5, label: 'Microserviços cloud-native', score: 5 },
            { value: 4, label: 'Arquitetura distribuída escalável', score: 4 },
            { value: 3, label: 'Monolito modular bem estruturado', score: 3 },
            { value: 2, label: 'Arquitetura tradicional', score: 2 },
            { value: 1, label: 'Arquitetura legada/monolítica', score: 1 }
          ]
        },
        {
          id: 'p4_3',
          type: 'select',
          question: 'Qual o stack tecnológico principal?',
          required: true,
          options: [
            { value: 5, label: 'Stack moderno (React/Vue + Node/Python + Cloud)', score: 5 },
            { value: 4, label: 'Stack atual (frameworks recentes)', score: 4 },
            { value: 3, label: 'Stack estável (tecnologias consolidadas)', score: 3 },
            { value: 2, label: 'Stack misto (moderno + legado)', score: 2 },
            { value: 1, label: 'Stack legado (tecnologias desatualizadas)', score: 1 }
          ]
        },
        {
          id: 'p4_4',
          type: 'select',
          question: 'Qual o nível de automação no desenvolvimento?',
          required: true,
          options: [
            { value: 5, label: 'CI/CD completo + testes automatizados + deploy automático', score: 5 },
            { value: 4, label: 'CI/CD + testes automatizados', score: 4 },
            { value: 3, label: 'Integração contínua básica', score: 3 },
            { value: 2, label: 'Automação parcial', score: 2 },
            { value: 1, label: 'Processo manual', score: 1 }
          ]
        },
        {
          id: 'p4_5',
          type: 'select',
          question: 'Qual o grau de escalabilidade técnica da solução?',
          required: true,
          options: [
            { value: 5, label: 'Auto-scaling + load balancing + CDN global', score: 5 },
            { value: 4, label: 'Escalabilidade horizontal implementada', score: 4 },
            { value: 3, label: 'Escalabilidade vertical configurada', score: 3 },
            { value: 2, label: 'Escalabilidade planejada mas não implementada', score: 2 },
            { value: 1, label: 'Sem estratégia de escalabilidade', score: 1 }
          ]
        },
        {
          id: 'p4_6',
          type: 'select',
          question: 'Qual o nível de segurança implementado?',
          required: true,
          options: [
            { value: 5, label: 'Certificações de segurança + penetration tests + compliance', score: 5 },
            { value: 4, label: 'Segurança robusta + monitoramento', score: 4 },
            { value: 3, label: 'Segurança básica implementada', score: 3 },
            { value: 2, label: 'Segurança mínima', score: 2 },
            { value: 1, label: 'Segurança inadequada', score: 1 }
          ]
        },
        {
          id: 'p4_7',
          type: 'select',
          question: 'Qual o nível de monitoramento e observabilidade?',
          required: true,
          options: [
            { value: 5, label: 'Observabilidade completa (logs, métricas, traces, alertas)', score: 5 },
            { value: 4, label: 'Monitoramento robusto + alertas', score: 4 },
            { value: 3, label: 'Monitoramento básico', score: 3 },
            { value: 2, label: 'Monitoramento limitado', score: 2 },
            { value: 1, label: 'Sem monitoramento adequado', score: 1 }
          ]
        },
        {
          id: 'p4_8',
          type: 'select',
          question: 'Vocês possuem propriedade intelectual (patentes, código proprietário)?',
          required: true,
          options: [
            { value: 5, label: 'Múltiplas patentes concedidas + IP forte', score: 5 },
            { value: 4, label: 'Patentes em processo + algoritmos proprietários', score: 4 },
            { value: 3, label: 'Algumas proteções IP + código proprietário', score: 3 },
            { value: 2, label: 'IP básica registrada', score: 2 },
            { value: 1, label: 'Sem proteção IP significativa', score: 1 }
          ]
        },
        {
          id: 'p4_9',
          type: 'select',
          question: 'Qual a maturidade do seu processo de desenvolvimento?',
          required: true,
          options: [
            { value: 5, label: 'Metodologias ágeis maduras + DevOps + métricas de qualidade', score: 5 },
            { value: 4, label: 'Scrum/Kanban bem implementado', score: 4 },
            { value: 3, label: 'Processo organizado com metodologia', score: 3 },
            { value: 2, label: 'Processo básico estruturado', score: 2 },
            { value: 1, label: 'Desenvolvimento ad-hoc', score: 1 }
          ]
        },
        {
          id: 'p4_10',
          type: 'select',
          question: 'Qual a experiência técnica da equipe de desenvolvimento?',
          required: true,
          options: [
            { value: 5, label: 'Sêniors com experiência em startups de sucesso', score: 5 },
            { value: 4, label: 'Equipe sênior com track record', score: 4 },
            { value: 3, label: 'Mix de sêniors e plenos', score: 3 },
            { value: 2, label: 'Equipe predominantemente plena', score: 2 },
            { value: 1, label: 'Equipe júnior ou inexperiente', score: 1 }
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
          question: 'Qual seu modelo de receita principal?',
          required: true,
          options: [
            { value: 5, label: 'SaaS (Assinatura recorrente)', score: 5 },
            { value: 4, label: 'Marketplace com comissão', score: 4 },
            { value: 4, label: 'Licenciamento de software', score: 4 },
            { value: 3, label: 'Freemium com conversão', score: 3 },
            { value: 3, label: 'Transação/Taxa por uso', score: 3 },
            { value: 2, label: 'Publicidade/Ads', score: 2 },
            { value: 1, label: 'Venda única/Projeto', score: 1 }
          ]
        },
        {
          id: 'p5_2',
          type: 'currency',
          question: 'Qual o ticket médio mensal por cliente?',
          required: true,
          scoring: {
            5: 'Ticket >R$ 1000/mês',
            4: 'Ticket R$ 300-1000/mês',
            3: 'Ticket R$ 100-300/mês',
            2: 'Ticket R$ 30-100/mês',
            1: 'Ticket <R$ 30/mês'
          }
        },
        {
          id: 'p5_3',
          type: 'percentage',
          question: 'Qual a margem bruta do produto/serviço?',
          required: true,
          scoring: {
            5: 'Margem >80%',
            4: 'Margem 60-80%',
            3: 'Margem 40-60%',
            2: 'Margem 20-40%',
            1: 'Margem <20%'
          }
        },
        {
          id: 'p5_4',
          type: 'currency',
          question: 'Qual o burn rate mensal atual?',
          required: true,
          scoring: {
            5: 'Burn <R$ 20k/mês',
            4: 'Burn R$ 20k-50k/mês',
            3: 'Burn R$ 50k-100k/mês',
            2: 'Burn R$ 100k-200k/mês',
            1: 'Burn >R$ 200k/mês'
          }
        },
        {
          id: 'p5_5',
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
            5: '>1000 clientes pagantes',
            4: '100-1000 clientes pagantes',
            3: '10-100 clientes pagantes',
            2: '1-10 clientes pagantes',
            1: '0 clientes pagantes'
          }
        },
        {
          id: 'p6_4',
          type: 'currency',
          question: 'Qual a receita recorrente mensal (MRR) atual?',
          required: true,
          scoring: {
            5: 'MRR >R$ 100k',
            4: 'MRR R$ 20k-100k',
            3: 'MRR R$ 5k-20k',
            2: 'MRR R$ 1k-5k',
            1: 'MRR <R$ 1k'
          }
        },
        {
          id: 'p6_5',
          type: 'percentage',
          question: 'Qual a taxa de churn mensal?',
          required: true,
          scoring: {
            5: 'Churn <2% ao mês',
            4: 'Churn 2-5% ao mês',
            3: 'Churn 5-10% ao mês',
            2: 'Churn 10-20% ao mês',
            1: 'Churn >20% ao mês'
          }
        },
        {
          id: 'p6_6',
          type: 'currency',
          question: 'Qual o CAC (Custo de Aquisição de Cliente) médio?',
          required: true,
          scoring: {
            5: 'CAC muito eficiente (<10% do LTV)',
            4: 'CAC eficiente (10-20% do LTV)',
            3: 'CAC aceitável (20-30% do LTV)',
            2: 'CAC alto (30-50% do LTV)',
            1: 'CAC insustentável (>50% do LTV)'
          }
        },
        {
          id: 'p6_7',
          type: 'select',
          question: 'Qual o principal canal de aquisição de clientes?',
          required: true,
          options: [
            { value: 5, label: 'Viral/Orgânico', score: 5 },
            { value: 4, label: 'Inbound Marketing', score: 4 },
            { value: 3, label: 'Vendas diretas', score: 3 },
            { value: 2, label: 'Publicidade paga', score: 2 },
            { value: 1, label: 'Sem canal definido', score: 1 }
          ]
        }
      ]
    },
    {
      id: 'scalability',
      title: 'Escalabilidade e Crescimento',
      weight: 0.10,
      description: 'Avaliação do potencial de escala e plano de expansão',
      questions: [
        {
          id: 'p7_1',
          type: 'select',
          question: 'Qual a escalabilidade técnica da sua solução?',
          required: true,
          options: [
            { value: 5, label: 'Altamente escalável (cloud-native, auto-scaling)', score: 5 },
            { value: 4, label: 'Escalável (arquitetura preparada)', score: 4 },
            { value: 3, label: 'Moderadamente escalável', score: 3 },
            { value: 2, label: 'Limitações de escalabilidade identificadas', score: 2 },
            { value: 1, label: 'Não escalável tecnicamente', score: 1 }
          ]
        },
        {
          id: 'p7_2',
          type: 'select',
          question: 'Qual a capacidade atual de crescimento do time técnico?',
          required: true,
          options: [
            { value: 5, label: 'Processo estruturado de hiring + onboarding', score: 5 },
            { value: 4, label: 'Capacidade de duplicar time em 6 meses', score: 4 },
            { value: 3, label: 'Crescimento gradual planejado', score: 3 },
            { value: 2, label: 'Limitações para crescer equipe', score: 2 },
            { value: 1, label: 'Sem capacidade de escalar time', score: 1 }
          ]
        },
        {
          id: 'p7_3',
          type: 'currency',
          question: 'Quanto capital vocês precisam para escalar nos próximos 18 meses?',
          required: true,
          scoring: {
            5: 'Necessidade bem calculada (<R$ 2M)',
            4: 'Estimativa fundamentada (R$ 2-5M)',
            3: 'Estimativa razoável (R$ 5-10M)',
            2: 'Necessidade alta (R$ 10-20M)',
            1: 'Necessidade excessiva (>R$ 20M)'
          }
        },
        {
          id: 'p7_4',
          type: 'select',
          question: 'Qual o potencial de expansão geográfica?',
          required: true,
          options: [
            { value: 5, label: 'Global desde o design (multi-idioma, multi-moeda)', score: 5 },
            { value: 4, label: 'Expansão LatAm planejada', score: 4 },
            { value: 3, label: 'Nacional com potential internacional', score: 3 },
            { value: 2, label: 'Regional/Nacional apenas', score: 2 },
            { value: 1, label: 'Local/Limitado geograficamente', score: 1 }
          ]
        }
      ]
    }
  ]
};

export const scoringRanges = {
  excellent: { 
    min: 80, 
    max: 100, 
    label: 'Investimento Altamente Recomendado', 
    color: 'green', 
    description: 'Startup tech de alto potencial' 
  },
  good: { 
    min: 70, 
    max: 79, 
    label: 'Potencial Interessante', 
    color: 'blue', 
    description: 'Startup tech com bom potencial' 
  },
  average: { 
    min: 60, 
    max: 69, 
    label: 'Potencial Médio', 
    color: 'yellow', 
    description: 'Startup em desenvolvimento - monitorar' 
  },
  poor: { 
    min: 45, 
    max: 59, 
    label: 'Baixo Potencial', 
    color: 'orange', 
    description: 'Requer melhorias significativas' 
  },
  bad: { 
    min: 0, 
    max: 44, 
    label: 'Não Recomendado', 
    color: 'red', 
    description: 'Problemas fundamentais - alto risco' 
  }
};

