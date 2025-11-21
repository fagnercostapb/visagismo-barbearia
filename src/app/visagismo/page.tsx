"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, ChevronRight, Share2, Download, RefreshCw, TrendingUp, Award, Users, Zap, CheckCircle2, ArrowRight, Copy, Check, Upload, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Tipos
interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    scores: {
      classico: number;
      criativo: number;
      esportivo: number;
      elegante: number;
      casual: number;
    };
  }[];
}

interface Profile {
  id: string;
  name: string;
  icon: string;
  description: string;
  psychologicalProfile: string;
  keywords: string[];
  haircuts: string[];
  beardStyles: string[];
  clothingStyles: string[];
  colorPalette: string[];
  percentage: number;
  gradient: string;
  border: string;
}

// Quiz completo
const quizQuestions: Question[] = [
  {
    id: "q1",
    text: "Como você gostaria de ser visto em um primeiro encontro profissional?",
    options: [
      { text: "Confiável e organizado", scores: { classico: 3, criativo: 0, esportivo: 0, elegante: 2, casual: 0 } },
      { text: "Inovador e ousado", scores: { classico: 0, criativo: 3, esportivo: 1, elegante: 0, casual: 1 } },
      { text: "Energético e acessível", scores: { classico: 0, criativo: 1, esportivo: 3, elegante: 0, casual: 2 } },
      { text: "Sofisticado e refinado", scores: { classico: 2, criativo: 0, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q2",
    text: "Qual ambiente você se sente mais confortável?",
    options: [
      { text: "Escritório corporativo", scores: { classico: 3, criativo: 0, esportivo: 0, elegante: 2, casual: 0 } },
      { text: "Estúdio criativo ou coworking", scores: { classico: 0, criativo: 3, esportivo: 1, elegante: 1, casual: 2 } },
      { text: "Academia ou ao ar livre", scores: { classico: 0, criativo: 0, esportivo: 3, elegante: 0, casual: 2 } },
      { text: "Restaurante fino ou evento social", scores: { classico: 1, criativo: 1, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q3",
    text: "Qual palavra melhor descreve seu estilo ideal?",
    options: [
      { text: "Tradicional", scores: { classico: 3, criativo: 0, esportivo: 0, elegante: 2, casual: 0 } },
      { text: "Autêntico", scores: { classico: 0, criativo: 3, esportivo: 1, elegante: 1, casual: 2 } },
      { text: "Prático", scores: { classico: 1, criativo: 0, esportivo: 3, elegante: 0, casual: 2 } },
      { text: "Luxuoso", scores: { classico: 2, criativo: 1, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q4",
    text: "Como você prefere passar seu tempo livre?",
    options: [
      { text: "Lendo ou organizando projetos", scores: { classico: 3, criativo: 1, esportivo: 0, elegante: 2, casual: 0 } },
      { text: "Criando algo novo ou explorando arte", scores: { classico: 0, criativo: 3, esportivo: 0, elegante: 1, casual: 1 } },
      { text: "Praticando esportes ou atividades físicas", scores: { classico: 0, criativo: 0, esportivo: 3, elegante: 0, casual: 2 } },
      { text: "Jantando fora ou em eventos sociais", scores: { classico: 1, criativo: 1, esportivo: 0, elegante: 3, casual: 1 } },
    ],
  },
  {
    id: "q5",
    text: "Qual tipo de acessório você mais usaria?",
    options: [
      { text: "Relógio clássico e gravata", scores: { classico: 3, criativo: 0, esportivo: 0, elegante: 2, casual: 0 } },
      { text: "Pulseiras, anéis ou piercings", scores: { classico: 0, criativo: 3, esportivo: 1, elegante: 0, casual: 2 } },
      { text: "Relógio esportivo e boné", scores: { classico: 0, criativo: 0, esportivo: 3, elegante: 0, casual: 2 } },
      { text: "Relógio de luxo e abotoaduras", scores: { classico: 2, criativo: 0, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q6",
    text: "Como você gosta de cortar seu cabelo?",
    options: [
      { text: "Corte tradicional e bem definido", scores: { classico: 3, criativo: 0, esportivo: 1, elegante: 2, casual: 0 } },
      { text: "Corte moderno com textura", scores: { classico: 0, criativo: 3, esportivo: 1, elegante: 1, casual: 2 } },
      { text: "Corte prático e fácil de manter", scores: { classico: 1, criativo: 0, esportivo: 3, elegante: 0, casual: 2 } },
      { text: "Corte sofisticado com acabamento premium", scores: { classico: 2, criativo: 1, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q7",
    text: "Qual sua preferência de barba?",
    options: [
      { text: "Bem aparada ou sem barba", scores: { classico: 3, criativo: 0, esportivo: 1, elegante: 2, casual: 0 } },
      { text: "Barba cheia estilizada", scores: { classico: 0, criativo: 3, esportivo: 2, elegante: 1, casual: 1 } },
      { text: "Barba por fazer (3-5 dias)", scores: { classico: 0, criativo: 2, esportivo: 2, elegante: 0, casual: 3 } },
      { text: "Barba desenhada e refinada", scores: { classico: 2, criativo: 1, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q8",
    text: "Qual cor você mais usa no dia a dia?",
    options: [
      { text: "Azul marinho, cinza ou preto", scores: { classico: 3, criativo: 0, esportivo: 1, elegante: 2, casual: 1 } },
      { text: "Cores vibrantes ou estampas", scores: { classico: 0, criativo: 3, esportivo: 1, elegante: 0, casual: 2 } },
      { text: "Cores neutras e confortáveis", scores: { classico: 1, criativo: 0, esportivo: 3, elegante: 0, casual: 3 } },
      { text: "Tons escuros sofisticados", scores: { classico: 2, criativo: 1, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q9",
    text: "Qual seu calçado preferido?",
    options: [
      { text: "Sapato social de couro", scores: { classico: 3, criativo: 0, esportivo: 0, elegante: 3, casual: 0 } },
      { text: "Tênis diferenciado ou botas", scores: { classico: 0, criativo: 3, esportivo: 2, elegante: 0, casual: 2 } },
      { text: "Tênis esportivo", scores: { classico: 0, criativo: 0, esportivo: 3, elegante: 0, casual: 3 } },
      { text: "Sapato italiano ou mocassim", scores: { classico: 2, criativo: 0, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q10",
    text: "Como você se prepara para uma foto importante?",
    options: [
      { text: "Terno e postura formal", scores: { classico: 3, criativo: 0, esportivo: 0, elegante: 2, casual: 0 } },
      { text: "Look autêntico que me representa", scores: { classico: 0, criativo: 3, esportivo: 1, elegante: 1, casual: 2 } },
      { text: "Roupa confortável e natural", scores: { classico: 0, criativo: 1, esportivo: 3, elegante: 0, casual: 3 } },
      { text: "Roupa de grife e acessórios premium", scores: { classico: 2, criativo: 1, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q11",
    text: "Como você se comporta em reuniões importantes?",
    options: [
      { text: "Preparado, pontual e objetivo", scores: { classico: 3, criativo: 0, esportivo: 1, elegante: 2, casual: 0 } },
      { text: "Criativo e com ideias inovadoras", scores: { classico: 0, criativo: 3, esportivo: 1, elegante: 1, casual: 1 } },
      { text: "Direto ao ponto e prático", scores: { classico: 1, criativo: 0, esportivo: 3, elegante: 0, casual: 2 } },
      { text: "Articulado e persuasivo", scores: { classico: 2, criativo: 1, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q12",
    text: "Qual sua rede social favorita?",
    options: [
      { text: "LinkedIn", scores: { classico: 3, criativo: 0, esportivo: 0, elegante: 2, casual: 0 } },
      { text: "Instagram ou TikTok", scores: { classico: 0, criativo: 3, esportivo: 2, elegante: 1, casual: 2 } },
      { text: "Strava ou apps de fitness", scores: { classico: 0, criativo: 0, esportivo: 3, elegante: 0, casual: 1 } },
      { text: "Pinterest ou blogs de lifestyle", scores: { classico: 1, criativo: 2, esportivo: 0, elegante: 3, casual: 1 } },
    ],
  },
  {
    id: "q13",
    text: "Qual seu objetivo com sua imagem pessoal?",
    options: [
      { text: "Transmitir credibilidade profissional", scores: { classico: 3, criativo: 0, esportivo: 0, elegante: 2, casual: 0 } },
      { text: "Expressar minha personalidade única", scores: { classico: 0, criativo: 3, esportivo: 1, elegante: 1, casual: 2 } },
      { text: "Parecer saudável e ativo", scores: { classico: 0, criativo: 0, esportivo: 3, elegante: 0, casual: 2 } },
      { text: "Demonstrar sucesso e sofisticação", scores: { classico: 2, criativo: 0, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
  {
    id: "q14",
    text: "Qual frase mais combina com você?",
    options: [
      { text: "A primeira impressão é a que fica", scores: { classico: 3, criativo: 0, esportivo: 0, elegante: 3, casual: 0 } },
      { text: "Seja você mesmo, todos os outros já existem", scores: { classico: 0, criativo: 3, esportivo: 1, elegante: 0, casual: 2 } },
      { text: "Mente sã, corpo são", scores: { classico: 0, criativo: 0, esportivo: 3, elegante: 0, casual: 2 } },
      { text: "O estilo é a única coisa que não se pode comprar", scores: { classico: 1, criativo: 2, esportivo: 0, elegante: 3, casual: 0 } },
    ],
  },
];

// Perfis completos
const profiles: Record<string, Profile> = {
  classico: {
    id: "classico",
    name: "Clássico Profissional",
    icon: "💼",
    description: "Você transmite confiança, credibilidade e organização",
    psychologicalProfile: "Você é oficialmente do time Clássico Profissional. Isso significa que, quando você entra em um ambiente, sua energia ideal é de confiança, estabilidade e competência. Pessoas com seu perfil são vistas como líderes naturais, confiáveis e organizadas. Sua imagem trabalha a seu favor em ambientes corporativos, entrevistas e situações que exigem autoridade.",
    keywords: ["Credibilidade", "Organização", "Confiança", "Liderança", "Estabilidade"],
    haircuts: [
      "Degradê clássico com laterais curtas",
      "Side part tradicional bem definido",
      "Corte executivo com volume controlado"
    ],
    beardStyles: [
      "Barba curta bem aparada",
      "Rosto barbeado (clean)",
      "Barba desenhada com contornos precisos"
    ],
    clothingStyles: [
      "Terno slim fit em tons sóbrios (azul marinho, cinza, preto)",
      "Camisa social branca ou azul clara + calça alfaiataria",
      "Blazer + calça chino + sapato social"
    ],
    colorPalette: ["Azul marinho", "Cinza chumbo", "Branco", "Preto", "Bordô"],
    percentage: 18,
    gradient: "from-blue-500/20 to-slate-500/20",
    border: "border-blue-500/30"
  },
  criativo: {
    id: "criativo",
    name: "Criativo Autêntico",
    icon: "🎨",
    description: "Você expressa originalidade, inovação e personalidade única",
    psychologicalProfile: "Você é oficialmente do time Criativo Autêntico. Isso significa que, quando você entra em um ambiente, sua energia ideal é de inovação, autenticidade e ousadia. Pessoas com seu perfil são vistas como visionárias, originais e inspiradoras. Sua imagem trabalha a seu favor em ambientes criativos, startups, redes sociais e situações que valorizam individualidade.",
    keywords: ["Autenticidade", "Inovação", "Ousadia", "Originalidade", "Inspiração"],
    haircuts: [
      "Undercut moderno com volume no topo",
      "Franja texturizada e despojada",
      "Corte assimétrico ou com design"
    ],
    beardStyles: [
      "Barba cheia estilizada",
      "Barba por fazer (3-5 dias) com textura",
      "Cavanhaque moderno"
    ],
    clothingStyles: [
      "Jaqueta de couro + camiseta estampada + jeans destroyed",
      "Moletom oversized + calça cargo + tênis de cano alto",
      "Camisa estampada + calça colorida + acessórios"
    ],
    colorPalette: ["Preto", "Vinho", "Verde militar", "Mostarda", "Cores vibrantes"],
    percentage: 22,
    gradient: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30"
  },
  esportivo: {
    id: "esportivo",
    name: "Esportivo Dinâmico",
    icon: "⚡",
    description: "Você transmite energia, praticidade e vitalidade",
    psychologicalProfile: "Você é oficialmente do time Esportivo Dinâmico. Isso significa que, quando você entra em um ambiente, sua energia ideal é de vitalidade, praticidade e ação. Pessoas com seu perfil são vistas como ativas, saudáveis e acessíveis. Sua imagem trabalha a seu favor em ambientes informais, atividades ao ar livre e situações que valorizam autenticidade e energia.",
    keywords: ["Energia", "Praticidade", "Vitalidade", "Acessibilidade", "Ação"],
    haircuts: [
      "Buzz cut ou corte militar",
      "Degradê esportivo curto",
      "Corte prático de fácil manutenção"
    ],
    beardStyles: [
      "Barba por fazer (3 dias)",
      "Barba curta uniforme",
      "Sem barba (praticidade)"
    ],
    clothingStyles: [
      "Polo + calça esportiva + tênis",
      "Camiseta técnica + shorts + tênis de corrida",
      "Moletom + calça jogger + tênis esportivo"
    ],
    colorPalette: ["Azul royal", "Cinza mescla", "Preto", "Verde neon", "Branco"],
    percentage: 25,
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30"
  },
  elegante: {
    id: "elegante",
    name: "Elegante Sofisticado",
    icon: "✨",
    description: "Você demonstra refinamento, sucesso e bom gosto",
    psychologicalProfile: "Você é oficialmente do time Elegante Sofisticado. Isso significa que, quando você entra em um ambiente, sua energia ideal é de refinamento, sucesso e distinção. Pessoas com seu perfil são vistas como bem-sucedidas, cultas e sofisticadas. Sua imagem trabalha a seu favor em eventos sociais, jantares de negócios e situações que exigem presença marcante.",
    keywords: ["Refinamento", "Sofisticação", "Sucesso", "Distinção", "Prestígio"],
    haircuts: [
      "Pompadour com volume e brilho",
      "Slick back penteado para trás",
      "Corte italiano com acabamento premium"
    ],
    beardStyles: [
      "Barba desenhada e refinada",
      "Barba cheia bem cuidada",
      "Rosto barbeado com acabamento perfeito"
    ],
    clothingStyles: [
      "Terno de três peças + gravata de seda + sapato italiano",
      "Blazer de veludo + camisa de linho + calça alfaiataria",
      "Casaco de lã + suéter de cashmere + calça de alfaiataria"
    ],
    colorPalette: ["Preto", "Cinza carvão", "Azul marinho", "Vinho", "Caramelo"],
    percentage: 15,
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30"
  },
  casual: {
    id: "casual",
    name: "Casual Descontraído",
    icon: "👕",
    description: "Você transmite naturalidade, conforto e acessibilidade",
    psychologicalProfile: "Você é oficialmente do time Casual Descontraído. Isso significa que, quando você entra em um ambiente, sua energia ideal é de naturalidade, conforto e proximidade. Pessoas com seu perfil são vistas como acessíveis, autênticas e confiáveis. Sua imagem trabalha a seu favor em ambientes informais, encontros casuais e situações que valorizam simplicidade e autenticidade.",
    keywords: ["Naturalidade", "Conforto", "Acessibilidade", "Autenticidade", "Simplicidade"],
    haircuts: [
      "Franja solta e natural",
      "Corte médio com textura",
      "Estilo despojado sem muito produto"
    ],
    beardStyles: [
      "Barba por fazer (3-5 dias)",
      "Barba leve e natural",
      "Sem barba (estilo clean)"
    ],
    clothingStyles: [
      "Camisa básica + jeans + tênis branco",
      "Camisa de flanela + camiseta + jeans",
      "Suéter + calça chino + tênis casual"
    ],
    colorPalette: ["Branco", "Cinza", "Azul jeans", "Verde oliva", "Bege"],
    percentage: 20,
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30"
  }
};

type Screen = "landing" | "quiz" | "loading" | "result" | "photoSimulation" | "share";

export default function VisagismoApp() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Profile | null>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [copied, setCopied] = useState(false);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    const question = quizQuestions[currentQuestion];
    setAnswers({ ...answers, [question.id]: optionIndex });

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // Calcular resultado
      calculateResult();
    }
  };

  const calculateResult = () => {
    setScreen("loading");

    // Calcular pontuação de cada perfil
    const scores: Record<string, number> = {
      classico: 0,
      criativo: 0,
      esportivo: 0,
      elegante: 0,
      casual: 0
    };

    Object.entries(answers).forEach(([questionId, optionIndex]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      if (question) {
        const option = question.options[optionIndex];
        Object.entries(option.scores).forEach(([profile, score]) => {
          scores[profile] += score;
        });
      }
    });

    // Encontrar perfil com maior pontuação
    const maxScore = Math.max(...Object.values(scores));
    const winnerProfile = Object.keys(scores).find(key => scores[key] === maxScore) || "classico";

    setTimeout(() => {
      setResult(profiles[winnerProfile]);
      setScreen("result");
    }, 2500);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("A foto deve ter no máximo 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setUserPhoto(e.target?.result as string);
        toast.success("Foto carregada! Veja como você ficaria com seu novo estilo.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleShare = async () => {
    const text = `Acabei de descobrir meu estilo de imagem com o VisageMatch! Deu ${result?.icon} ${result?.name}. Faz aí também! 🔥`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meu Resultado - VisageMatch",
          text: text,
          url: window.location.href
        });
        toast.success("Compartilhado com sucesso!");
      } catch (err) {
        console.log("Erro ao compartilhar:", err);
      }
    } else {
      // Fallback: copiar para clipboard
      try {
        await navigator.clipboard.writeText(text + " " + window.location.href);
        toast.success("Texto copiado! Cole nas suas redes sociais.");
      } catch (error) {
        // Fallback: criar elemento temporário para copiar
        const textArea = document.createElement("textarea");
        textArea.value = text + " " + window.location.href;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success("Texto copiado! Cole nas suas redes sociais.");
        } catch (err) {
          toast.error("Não foi possível copiar o texto");
        }
        document.body.removeChild(textArea);
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback: criar elemento temporário para copiar
      const textArea = document.createElement("textarea");
      textArea.value = window.location.href;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        toast.success("Link copiado!");
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        toast.error("Não foi possível copiar o link");
      }
      document.body.removeChild(textArea);
    }
  };

  const handleRestart = () => {
    setScreen("landing");
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setUserName("");
    setUserEmail("");
    setUserPhoto(null);
  };

  const handleSubmitLead = () => {
    if (!userName || !userEmail) {
      toast.error("Preencha seu nome e e-mail para continuar");
      return;
    }

    // Aqui você pode integrar com sua API/CRM
    console.log("Lead capturado:", { userName, userEmail, profile: result?.id });
    toast.success("Obrigado! Em breve você receberá recomendações exclusivas.");
    setScreen("photoSimulation");
  };

  // Renderizar sempre o componente completo
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {screen === "landing" && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-8 text-center">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                VisageMatch
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mx-auto">
                Descubra seu estilo de imagem ideal através de um quiz personalizado
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-blue-900">Análise Completa</h3>
                  <p className="text-sm text-blue-700">14 perguntas estratégicas para entender seu perfil</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-purple-900">5 Perfis Únicos</h3>
                  <p className="text-sm text-purple-700">Clássico, Criativo, Esportivo, Elegante e Casual</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-cyan-900">Recomendações</h3>
                  <p className="text-sm text-cyan-700">Cortes, barba, roupas e cores ideais para você</p>
                </CardContent>
              </Card>
            </div>

            <Button
              onClick={() => setScreen("quiz")}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Começar Quiz
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {screen === "quiz" && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl w-full space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Pergunta {currentQuestion + 1} de {quizQuestions.length}</h2>
              <Progress value={progress} className="w-full max-w-md mx-auto" />
            </div>

            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  {quizQuestions[currentQuestion].text}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      variant="outline"
                      className="w-full p-4 h-auto text-left justify-start hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-200"
                    >
                      <span className="text-gray-700">{option.text}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {screen === "loading" && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-10 h-10 text-white animate-spin" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">Analisando seu perfil...</h2>
              <p className="text-gray-600">Estamos processando suas respostas para encontrar seu estilo ideal</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Analisando respostas...</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Calculando perfil psicológico...</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">Gerando recomendações...</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "result" && result && (
        <div className="min-h-screen p-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Seu Resultado</h2>
              <p className="text-gray-600">Baseado nas suas respostas, descobrimos seu perfil de imagem</p>
            </div>

            <Card className={`shadow-xl bg-gradient-to-br ${result.gradient} border-2 ${result.border}`}>
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">{result.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{result.name}</h3>
                <p className="text-lg text-gray-700 mb-6">{result.description}</p>

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {result.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-500" />
                    Perfil Psicológico
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{result.psychologicalProfile}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-cyan-500" />
                    Recomendações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Cortes de Cabelo:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {result.haircuts.map((cut, index) => (
                        <li key={index}>• {cut}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Estilos de Barba:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {result.beardStyles.map((style, index) => (
                        <li key={index}>• {style}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-500" />
                  Estilo de Roupas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {result.clothingStyles.map((style, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">{style}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-500" />
                  Paleta de Cores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {result.colorPalette.map((color, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-gray-300"
                        style={{
                          backgroundColor: color.toLowerCase().includes('azul') ? '#1e40af' :
                                          color.toLowerCase().includes('cinza') ? '#6b7280' :
                                          color.toLowerCase().includes('preto') ? '#000000' :
                                          color.toLowerCase().includes('branco') ? '#ffffff' :
                                          color.toLowerCase().includes('vinho') ? '#7c2d12' :
                                          color.toLowerCase().includes('verde') ? '#16a34a' :
                                          color.toLowerCase().includes('mostarda') ? '#d97706' :
                                          color.toLowerCase().includes('bordô') ? '#7c2d12' :
                                          color.toLowerCase().includes('caramelo') ? '#d97706' :
                                          color.toLowerCase().includes('bege') ? '#d4a574' : '#6b7280'
                        }}
                      ></div>
                      <span className="text-sm text-gray-700">{color}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleShare}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar Resultado
              </Button>
              <Button
                onClick={handleCopyLink}
                variant="outline"
              >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? "Copiado!" : "Copiar Link"}
              </Button>
              <Button
                onClick={() => setScreen("photoSimulation")}
                variant="outline"
              >
                <Camera className="w-4 h-4 mr-2" />
                Simular com Foto
              </Button>
            </div>

            <div className="text-center">
              <Button
                onClick={handleRestart}
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refazer Quiz
              </Button>
            </div>
          </div>
        </div>
      )}

      {screen === "photoSimulation" && result && (
        <div className="min-h-screen p-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Simulação com Foto</h2>
              <p className="text-gray-600">Veja como você ficaria com seu novo estilo de imagem</p>
            </div>

            {!userPhoto ? (
              <Card className="shadow-xl">
                <CardContent className="p-8 text-center">
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Envie sua foto</h3>
                  <p className="text-gray-600 mb-6">Para ver a simulação do seu novo estilo</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Escolher Foto
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle>Sua Foto Atual</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <img
                      src={userPhoto}
                      alt="Foto atual do usuário"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-xl">
                  <CardHeader>
                    <CardTitle>Simulação - {result.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">{result.icon}</div>
                        <p className="text-gray-600">Simulação do seu novo estilo</p>
                        <p className="text-sm text-gray-500 mt-2">Aqui seria aplicada a IA para simular o visual</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setScreen("result")}
                variant="outline"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Voltar ao Resultado
              </Button>
              <Button
                onClick={handleRestart}
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refazer Quiz
              </Button>
            </div>
          </div>
        </div>
      )}

      {screen === "share" && result && (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full space-y-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Compartilhar Resultado</h2>
              <p className="text-gray-600">Mostre seu estilo para os amigos!</p>
            </div>

            <Card className="shadow-xl">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{result.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{result.name}</h3>
                <p className="text-gray-700 mb-6">{result.description}</p>

                <div className="space-y-3">
                  <Button
                    onClick={handleShare}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="w-full"
                  >
                    {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {copied ? "Copiado!" : "Copiar Link"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                onClick={() => setScreen("result")}
                variant="ghost"
                className="text-gray-500 hover:text-gray-700"
              >
                Voltar ao Resultado
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}