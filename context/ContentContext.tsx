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
      title: 'Arquitetura de Negócios',
      description: 'Não fazemos apenas planos; desenhamos ecossistemas de lucro e eficiência.',
      iconName: 'Briefcase',
      features: ['Diagnóstico Profundo', 'Modelagem de Negócios', 'Inteligência de Mercado']
    },
    {
      id: 'coop',
      title: 'Ecossistema Coop',
      description: 'Potencializamos a força coletiva com governança de elite e estratégias de expansão.',
      iconName: 'Users',
      features: ['Engenharia Social', 'Políticas de Expansão', 'Cultura de Alta Performance']
    },
    {
      id: 'finances',
      title: 'Inteligência de Capital',
      description: 'Transforme números frios em combustível para crescimento exponencial.',
      iconName: 'TrendingUp',
      features: ['Blindagem Financeira', 'Otimização de Custos', 'Valuation & Funding']
    },
    {
      id: 'sustainability',
      title: 'Impacto Regenerativo',
      description: 'Lucro e propósito não disputam espaço. Eles se multiplicam.',
      iconName: 'Leaf',
      features: ['ESG na Prática', 'Design Circular', 'Legado Socioambiental']
    },
    {
      id: 'vortex',
      title: 'Vórtex Digital',
      description: 'Contabilidade preditiva. Saia do retrovisor e olhe para o horizonte.',
      iconName: 'Calculator',
      features: ['Dashboards Preditivos', 'Compliance Inteligente', 'Eficiência Tributária']
    },
    {
      id: 'training',
      title: 'Academy Cosmmus',
      description: 'Forjamos líderes capazes de navegar no caos e criar ordem.',
      iconName: 'GraduationCap',
      features: ['Imersões de Impacto', 'Mentoria Executiva', 'Treinamento de Elite']
    }
  ],
  cases: [
    { id: '1', category: 'Cooperativas', title: 'Reestruturação de Governança Coop', img: 'https://picsum.photos/400/300?random=1' },
    { id: '2', category: 'Empresas', title: 'Escalando Vendas B2B', img: 'https://picsum.photos/400/300?random=2' },
    { id: '3', category: 'Sustentabilidade', title: 'Projeto Carbono Neutro', img: 'https://picsum.photos/400/300?random=3' },
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
        const savedContent = localStorage.getItem('cosmmus_content');
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
    localStorage.setItem('cosmmus_content', JSON.stringify(newContent));
    console.log("Content saved to LocalStorage");
  };

  const resetToDefaults = () => {
    if (confirm('Tem certeza? Isso apagará todas as suas edições personalizadas.')) {
        setContent(defaultContent);
        localStorage.removeItem('cosmmus_content');
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