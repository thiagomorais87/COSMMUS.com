import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, ContentContextType } from '../types';

// NOTE: Firebase integration removed due to missing dependency/types in the current environment.
// Reverting to LocalStorage only for persistence.

const defaultContent: SiteContent = {
  hero: {
    badge: "Além dos Negócios",
    titleLine1: "Não espere o futuro.",
    titleLine2: "Provoque-o.",
    subtitle: "O mercado não premia quem segue regras, mas quem as reescreve. Transformamos ambição em legado através de estratégia, inovação e coragem.",
    stat1Value: "+150",
    stat1Label: "Negócios Impactados",
    stat2Value: "360º",
    stat2Label: "Visão Estratégica",
    stat3Value: "∞",
    stat3Label: "Potencial de Escala"
  },
  services: [
    {
      id: 'consulting',
      title: 'Consultoria de Negócios e Planos de Negócios',
      description: 'O coração da Cosmmus Business. Diagnóstico do negócio e Desenvolvimento do Plano de Negócios.',
      iconName: 'Briefcase',
      features: ['Estudo de Mercado', 'Plano Financeiro', 'Plano Comercial', 'Plano de Comunicação e Branding', 'Plano Operacional', 'Acompanhamento de 6 meses', 'Indicadores e resultados'],
      ctaText: 'Solicitar proposta personalizada'
    },
    {
      id: 'coop',
      title: 'Cosmos Coop – Cooperativas e Organizações',
      description: 'Diagnóstico social e institucional para fortalecer o cooperativismo.',
      iconName: 'Users',
      features: ['Elaboração de planos de trabalho e políticas internas', 'Desenvolvimento da cultura organizacional', 'Regulamento de cooperado', 'Gestão de parcerias e sustentabilidade'],
      ctaText: 'Fale com a equipe Cosmmus Coop'
    },
    {
      id: 'finances',
      title: 'Cosmmus Finances',
      description: 'Planejamento financeiro empresarial e pessoal focado em resultados.',
      iconName: 'TrendingUp',
      features: ['Estruturação de capital e investimentos', 'Diagnóstico de custos e precificação', 'Consultoria em finanças cooperativas'],
      ctaText: 'Agende uma consultoria financeira'
    },
    {
      id: 'sustainability',
      title: 'Cosmmus Sustentabilidade',
      description: 'Projetos de impacto ambiental e social.',
      iconName: 'Leaf',
      features: ['Diagnóstico socioambiental', 'Educação e responsabilidade ambiental', 'Políticas e relatórios de sustentabilidade'],
      ctaText: 'Desenvolva um projeto sustentável com a Cosmmus'
    },
    {
      id: 'vortex',
      title: 'Vórtex Assessoria Contábil',
      description: 'Integra o ecossistema Cosmmus.',
      iconName: 'Calculator',
      features: ['Planejamento tributário', 'Contabilidade estratégica e digital', 'Integração contábil-financeira', 'Dashboards e relatórios gerenciais'],
      ctaText: 'Conheça a Vórtex Assessoria Contábil'
    },
    {
      id: 'treinamentos',
      title: 'Cosmmus Treinamentos, Imersões e Palestras',
      description: 'Desenvolve pessoas, equipes e lideranças.',
      iconName: 'GraduationCap',
      features: ['Imersões Cosmmus', 'Palestras e Workshops', 'Mentorias Cosmmus'],
      ctaText: 'Ver todas as opções',
      subServices: [
        {
          title: 'Imersões Cosmmus',
          description: 'Experiências intensivas de planejamento e liderança.',
          features: ['Agenda de próximas edições', 'Galeria de fotos e vídeos'],
          ctaText: 'Quero participar'
        },
        {
          title: 'Palestras e Workshops',
          description: 'Temas disponíveis: Gestão e Empreendedorismo, Cooperativismo e Economia Solidária, Planejamento Estratégico, Sustentabilidade e Inovação.',
          features: ['Contratação de palestras', 'Bio do palestrante (Marcos Antônio)'],
          ctaText: 'Contrate uma palestra Cosmmus'
        },
        {
          title: 'Mentorias Cosmmus',
          description: 'Acompanhamento individual e corporativo.',
          features: ['Diagnóstico e plano de ação personalizado', 'Planos de 3, 6 ou 12 sessões'],
          ctaText: 'Agende sua mentoria'
        }
      ]
    }
  ],
  cases: [
    { 
      id: '1', 
      category: 'Empreendedores e Empresas (Cosmmus Business & Finances)', 
      title: 'De 0 a 100: A Reestruturação Estratégica da Manufactura Vale', 
      img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
      challenge: 'A empresa enfrentava um crescimento desordenado. O faturamento era alto, mas a lucratividade era baixa devido à falta de processos financeiros e um plano comercial reativo.',
      strategy: 'Implementamos o Painel de Comando Cosmmus. Realizamos um diagnóstico 360°, seguido da precificação correta de produtos e a estruturação de um funil de vendas ativo, integrando o setor financeiro à operação.',
      results: [
        'Aumento de 22% na margem de lucro em 4 meses.',
        'Redução de 15% em custos operacionais desnecessários.',
        'Previsibilidade de caixa para os próximos 12 meses.'
      ],
      testimony: 'A Cosmmus não apenas nos deu um plano, eles nos deram uma visão clara do futuro. Hoje, cada centavo e cada venda fazem sentido dentro do nosso propósito.',
      author: 'Roberto S., CEO da Manufactura Vale.'
    },
    { 
      id: '2', 
      category: 'Cooperativas e Organizações (Cosmos Coop)', 
      title: 'Fortalecimento da Cultura e Gestão na CoopCerrado', 
      img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop',
      challenge: 'Conflitos geracionais na liderança e falta de engajamento dos cooperados mais jovens, o que ameaçava a continuidade da sucessão familiar na cooperativa.',
      strategy: 'Diagnóstico social e institucional profundo. Desenvolvemos um novo Regulamento de Cooperado e um programa de imersão focado em Cultura Organizacional, unindo a tradição dos fundadores com a inovação exigida pelo mercado.',
      results: [
        'Aumento de 40% na participação ativa em assembleias.',
        'Implementação de 3 novos projetos de inovação liderados por jovens cooperados.',
        'Melhoria no clima organizacional medida por pesquisa interna.'
      ],
      testimony: 'O trabalho da Cosmos Coop trouxe alma para nossa governança. Entendemos que o cooperativismo forte nasce da união de pessoas preparadas.',
      author: 'Ana Maria, Presidente da CoopCerrado.'
    },
    { 
      id: '3', 
      category: 'Sustentabilidade e Impacto Social (Cosmmus Sustentabilidade)', 
      title: 'Rota do Impacto: Implementação de ESG na Rede Logística Express', 
      img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1000&auto=format&fit=crop',
      challenge: 'A empresa de logística precisava se adequar às exigências de grandes clientes multinacionais que demandavam relatórios de sustentabilidade e redução da pegada de carbono.',
      strategy: 'Elaboração de um Diagnóstico Socioambiental completo. Criamos políticas de gestão de resíduos nas garagens e um programa de compensação de carbono, além de treinamentos de responsabilidade ambiental para os motoristas.',
      results: [
        'Conquista do Selo de Empresa Sustentável.',
        'Redução de 12% na emissão de CO2 no primeiro ano.',
        'Retenção de 100% dos contratos com grandes multinacionais (fidelização por ESG).'
      ],
      testimony: 'Sustentabilidade deixou de ser um custo e virou um diferencial competitivo graças ao projeto estruturado pela Cosmmus.',
      author: 'Juliano F., Gerente de Operações.'
    },
    { 
      id: '4', 
      category: 'Treinamentos e Imersões (Cosmmus Treinamentos)', 
      title: 'Liderança de Elite: A Transformação do Time Gestor da TechFlow', 
      img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop',
      challenge: 'Falta de alinhamento entre os gestores, gerando ruídos na comunicação e alta rotatividade de talentos (turnover) na equipe de tecnologia.',
      strategy: 'Realização da Imersão Cosmmus: Liderança com Propósito. Foram dois dias de treinamento intensivo focados em soft skills, comunicação não-violenta e ferramentas de gestão de alta performance.',
      results: [
        'Queda de 35% no turnover em seis meses.',
        'Aumento do índice de satisfação dos colaboradores (eNPS).',
        'Melhoria clara na agilidade de entrega de projetos (Metodologias Ágeis).'
      ],
      testimony: 'A imersão foi o divisor de águas que precisávamos. Saímos de lá não apenas como chefes, mas como líderes focados em pessoas e resultados.',
      author: 'Fernanda L., Diretora de RH da TechFlow.'
    }
  ],
  blog: [
    { id: '1', title: '5 Tendências para Gestão em 2024', category: 'Estratégia', date: '12 Out 2023', excerpt: 'Descubra como a IA e a humanização estão moldando o futuro.' },
    { id: '2', title: 'Como estruturar o capital da sua empresa', category: 'Finanças', date: '05 Out 2023', excerpt: 'Capital próprio ou de terceiros? Entenda a melhor escolha.' },
    { id: '3', title: 'O papel do terceiro setor na economia', category: 'Cooperativismo', date: '28 Set 2023', excerpt: 'Impacto social gerando resultado econômico sustentável.' },
  ]
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [storageType] = useState<'local' | 'cloud'>('local');

  // Initial Data Load
  useEffect(() => {
    const loadFromLocal = () => {
        const savedContent = localStorage.getItem('cosmmus_content_v2');
        if (savedContent) {
            try {
                setContent(JSON.parse(savedContent));
            } catch (e) {
                console.error("Failed to parse local content", e);
            }
        }
    }

    loadFromLocal();
  }, []);

  // Persistence Handler
  const updateContent = async (section: keyof SiteContent, data: any) => {
    // 1. Update State (Optimistic UI)
    const newContent = { ...content, [section]: data };
    setContent(newContent);

    // 2. Save to Persistence Layer (Local)
    localStorage.setItem('cosmmus_content_v2', JSON.stringify(newContent));
    console.log("Content saved to LocalStorage");
  };

  const resetToDefaults = () => {
    if (confirm('Tem certeza? Isso apagará todas as suas edições personalizadas.')) {
        setContent(defaultContent);
        localStorage.removeItem('cosmmus_content_v2');
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetToDefaults, storageType }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};