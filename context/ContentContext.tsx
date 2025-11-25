import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, ContentContextType, ServiceItem, CaseItem, BlogPost } from '../types';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// --- CONFIGURAÇÃO DO FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyCdGDntiCHYxhZSlk4ZuC23lCYzoD72qBk",
    authDomain: "cosmmus-web.firebaseapp.com",
    projectId: "cosmmus-web",
    storageBucket: "cosmmus-web.firebasestorage.app",
    messagingSenderId: "92607580472",
    appId: "1:92607580472:web:9687bd0d862d204b8259cd"
};

// Initialize Firebase only if config is present and valid
let db: any = null;
let auth: any = null;
let isCloudConfigured = false;

if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "COLE_SUA_API_KEY_AQUI") {
    try {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
        isCloudConfigured = true;
        console.log("Firebase initialized");
    } catch (e) {
        console.error("Firebase initialization failed:", e);
        isCloudConfigured = false;
    }
}

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageType, setStorageType] = useState<'local' | 'cloud'>('local');

  // Initial Data Load
  useEffect(() => {
    const loadData = async () => {
        let cloudSuccess = false;

        if (isCloudConfigured && db) {
            try {
                // Try anonymous auth first to fix "insufficient permissions" if rules allow auth users
                if (auth) {
                    try {
                        await signInAnonymously(auth);
                    } catch (authError) {
                        console.warn("Anonymous auth failed (check Firebase Console to enable it):", authError);
                    }
                }

                const docRef = doc(db, "content", "main");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data loaded from Cloud:", docSnap.data());
                    setContent(docSnap.data() as SiteContent);
                    setStorageType('cloud');
                    cloudSuccess = true;
                } else {
                    // Initialize cloud with default content if empty
                    // Only try to write if we think we have permission, otherwise fallback
                    try {
                         await setDoc(docRef, defaultContent);
                         setStorageType('cloud');
                         cloudSuccess = true;
                         console.log("Initialized default content in Cloud");
                    } catch (writeErr) {
                         console.warn("Cannot write default content (Permissions?):", writeErr);
                         // If we can't write, we might still be able to read later, but for now fallback
                    }
                }
            } catch (error: any) {
                // Explicitly catch permission errors to avoid red noise
                if (error?.code === 'permission-denied' || error?.message?.includes('Missing or insufficient permissions')) {
                    console.warn("Cloud access denied (Security Rules). Switching to Local Storage mode.");
                } else {
                    console.error("Error getting document from Cloud:", error);
                }
                cloudSuccess = false;
            }
        }

        // Fallback to local if cloud failed or not configured
        if (!cloudSuccess) {
            loadFromLocal();
        }
        
        setIsLoaded(true);
    };

    const loadFromLocal = () => {
        const savedContent = localStorage.getItem('cosmmus_content');
        if (savedContent) {
            try {
                setContent(JSON.parse(savedContent));
            } catch (e) {
                console.error("Failed to parse local content", e);
            }
        }
        setStorageType('local');
    }

    loadData();
  }, []);

  // Persistence Handler
  const updateContent = async (section: keyof SiteContent, data: any) => {
    // 1. Update State (Optimistic UI)
    const newContent = { ...content, [section]: data };
    setContent(newContent);

    // 2. Save to Persistence Layer
    if (storageType === 'cloud' && db) {
        try {
            await setDoc(doc(db, "content", "main"), { [section]: data }, { merge: true });
            console.log("Content saved to Cloud");
        } catch (e: any) {
            console.error("Error saving to cloud", e);
            if (e?.code === 'permission-denied' || e?.message?.includes('Missing or insufficient permissions')) {
                alert("Erro de permissão: Você não tem acesso para gravar no banco de dados. As alterações foram salvas apenas localmente.");
                // Fallback to local save so user doesn't lose work
                localStorage.setItem('cosmmus_content', JSON.stringify(newContent));
            } else {
                alert("Erro ao salvar na nuvem. Verifique sua conexão.");
            }
        }
    } else {
        localStorage.setItem('cosmmus_content', JSON.stringify(newContent));
        console.log("Content saved to LocalStorage");
    }
  };

  const resetToDefaults = () => {
    if (confirm('Tem certeza? Isso apagará todas as suas edições personalizadas.')) {
        setContent(defaultContent);
        if (storageType === 'cloud' && db) {
            setDoc(doc(db, "content", "main"), defaultContent).catch(e => console.error("Cloud reset failed", e));
        } else {
            localStorage.removeItem('cosmmus_content');
        }
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
