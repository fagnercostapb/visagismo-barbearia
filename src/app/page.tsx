"use client";

import { useState, useEffect } from "react";
import { Camera, Save, Heart, Scissors, Shirt, User, Sparkles, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Tipos
interface Look {
  id: string;
  hairStyle: string;
  beardStyle: string;
  clothing: string[];
  imageStyle: string;
  savedAt: string;
}

interface StyleSuggestion {
  name: string;
  description: string;
  category: "hair" | "beard" | "clothing";
}

// Dados de estilos
const hairStyles = [
  { name: "Undercut Moderno", description: "Laterais raspadas com volume no topo", category: "hair" as const },
  { name: "Degradê Clássico", description: "Transição suave das laterais para o topo", category: "hair" as const },
  { name: "Pompadour", description: "Volume frontal com laterais curtas", category: "hair" as const },
  { name: "Slick Back", description: "Cabelo penteado para trás com brilho", category: "hair" as const },
  { name: "Franja Texturizada", description: "Franja solta com textura natural", category: "hair" as const },
  { name: "Buzz Cut", description: "Corte bem curto e uniforme", category: "hair" as const },
];

const beardStyles = [
  { name: "Barba Cheia", description: "Barba completa e bem aparada", category: "beard" as const },
  { name: "Cavanhaque", description: "Barba apenas no queixo", category: "beard" as const },
  { name: "Barba por Fazer", description: "3-5 dias de crescimento", category: "beard" as const },
  { name: "Bigode Estilizado", description: "Apenas bigode bem cuidado", category: "beard" as const },
  { name: "Barba Curta", description: "Barba aparada bem rente", category: "beard" as const },
  { name: "Sem Barba", description: "Rosto completamente barbeado", category: "beard" as const },
];

const clothingStyles = [
  { name: "Casual Elegante", description: "Camisa social + jeans escuro", category: "clothing" as const },
  { name: "Executivo", description: "Terno slim fit + gravata", category: "clothing" as const },
  { name: "Street Style", description: "Moletom + tênis + boné", category: "clothing" as const },
  { name: "Smart Casual", description: "Blazer + camiseta + calça chino", category: "clothing" as const },
  { name: "Esportivo", description: "Polo + calça esportiva + tênis", category: "clothing" as const },
  { name: "Minimalista", description: "Camiseta básica + calça alfaiataria", category: "clothing" as const },
];

const imageStyles = [
  { id: "professional", name: "Profissional", icon: "💼", description: "Sério e confiável" },
  { id: "creative", name: "Criativo", icon: "🎨", description: "Moderno e ousado" },
  { id: "casual", name: "Casual", icon: "👕", description: "Descontraído e acessível" },
  { id: "elegant", name: "Elegante", icon: "✨", description: "Sofisticado e refinado" },
];

export default function VisagismoApp() {
  const [selectedImageStyle, setSelectedImageStyle] = useState<string>("");
  const [selectedHair, setSelectedHair] = useState<string>("");
  const [selectedBeard, setSelectedBeard] = useState<string>("");
  const [selectedClothing, setSelectedClothing] = useState<string[]>([]);
  const [savedLooks, setSavedLooks] = useState<Look[]>([]);
  const [showSavedLooks, setShowSavedLooks] = useState(false);
  const [activeTab, setActiveTab] = useState("style");

  // Carregar looks salvos do localStorage
  useEffect(() => {
    const saved = localStorage.getItem("visagismo-looks");
    if (saved) {
      setSavedLooks(JSON.parse(saved));
    }
  }, []);

  // Salvar look atual
  const saveLook = () => {
    if (!selectedImageStyle || !selectedHair || !selectedBeard || selectedClothing.length === 0) {
      toast.error("Selecione todos os elementos antes de salvar!");
      return;
    }

    const newLook: Look = {
      id: Date.now().toString(),
      hairStyle: selectedHair,
      beardStyle: selectedBeard,
      clothing: selectedClothing,
      imageStyle: selectedImageStyle,
      savedAt: new Date().toISOString(),
    };

    const updatedLooks = [...savedLooks, newLook];
    setSavedLooks(updatedLooks);
    localStorage.setItem("visagismo-looks", JSON.stringify(updatedLooks));
    toast.success("Look salvo com sucesso!");
  };

  // Deletar look salvo
  const deleteLook = (id: string) => {
    const updatedLooks = savedLooks.filter(look => look.id !== id);
    setSavedLooks(updatedLooks);
    localStorage.setItem("visagismo-looks", JSON.stringify(updatedLooks));
    toast.success("Look removido!");
  };

  // Carregar look salvo
  const loadLook = (look: Look) => {
    setSelectedImageStyle(look.imageStyle);
    setSelectedHair(look.hairStyle);
    setSelectedBeard(look.beardStyle);
    setSelectedClothing(look.clothing);
    setShowSavedLooks(false);
    setActiveTab("style");
    toast.success("Look carregado!");
  };

  // Sugestões baseadas no estilo de imagem
  const getSuggestions = () => {
    const suggestions: { hair: StyleSuggestion[], beard: StyleSuggestion[], clothing: StyleSuggestion[] } = {
      hair: [],
      beard: [],
      clothing: []
    };

    if (selectedImageStyle === "professional") {
      suggestions.hair = [hairStyles[1], hairStyles[3]];
      suggestions.beard = [beardStyles[4], beardStyles[5]];
      suggestions.clothing = [clothingStyles[1], clothingStyles[3]];
    } else if (selectedImageStyle === "creative") {
      suggestions.hair = [hairStyles[0], hairStyles[2]];
      suggestions.beard = [beardStyles[0], beardStyles[2]];
      suggestions.clothing = [clothingStyles[2], clothingStyles[5]];
    } else if (selectedImageStyle === "casual") {
      suggestions.hair = [hairStyles[4], hairStyles[5]];
      suggestions.beard = [beardStyles[2], beardStyles[4]];
      suggestions.clothing = [clothingStyles[0], clothingStyles[4]];
    } else if (selectedImageStyle === "elegant") {
      suggestions.hair = [hairStyles[2], hairStyles[3]];
      suggestions.beard = [beardStyles[0], beardStyles[4]];
      suggestions.clothing = [clothingStyles[1], clothingStyles[3]];
    }

    return suggestions;
  };

  const suggestions = selectedImageStyle ? getSuggestions() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-2 sm:p-3 rounded-xl shadow-lg">
                <Scissors className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Visagismo Pro</h1>
                <p className="text-xs sm:text-sm text-slate-400">Consultoria de Imagem</p>
              </div>
            </div>
            <Button
              onClick={() => setShowSavedLooks(!showSavedLooks)}
              variant="outline"
              className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-white gap-2"
            >
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Salvos</span>
              {savedLooks.length > 0 && (
                <Badge className="bg-amber-600 text-white">{savedLooks.length}</Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Looks Salvos Modal */}
        {showSavedLooks && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800">
                <div>
                  <CardTitle className="text-white">Looks Salvos</CardTitle>
                  <CardDescription className="text-slate-400">
                    {savedLooks.length} look(s) salvo(s)
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSavedLooks(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                {savedLooks.length === 0 ? (
                  <p className="text-center text-slate-400 py-8">Nenhum look salvo ainda</p>
                ) : (
                  savedLooks.map((look) => (
                    <Card key={look.id} className="bg-slate-800/50 border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <Badge className="bg-amber-600 text-white">
                            {imageStyles.find(s => s.id === look.imageStyle)?.name}
                          </Badge>
                          <span className="text-xs text-slate-400">
                            {new Date(look.savedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-slate-300"><strong>Cabelo:</strong> {look.hairStyle}</p>
                          <p className="text-slate-300"><strong>Barba:</strong> {look.beardStyle}</p>
                          <p className="text-slate-300"><strong>Roupas:</strong> {look.clothing.join(", ")}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button
                            onClick={() => loadLook(look)}
                            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white"
                          >
                            Carregar
                          </Button>
                          <Button
                            onClick={() => deleteLook(look.id)}
                            variant="outline"
                            className="border-red-900 text-red-400 hover:bg-red-950"
                          >
                            Excluir
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Seleção de Estilo de Imagem */}
        <Card className="mb-6 sm:mb-8 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Qual imagem você deseja transmitir?
            </CardTitle>
            <CardDescription className="text-slate-400">
              Escolha o estilo que representa sua personalidade
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {imageStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => setSelectedImageStyle(style.id)}
                  className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedImageStyle === style.id
                      ? "border-amber-500 bg-amber-500/10 shadow-lg shadow-amber-500/20"
                      : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                  }`}
                >
                  <div className="text-3xl sm:text-4xl mb-2">{style.icon}</div>
                  <h3 className="font-semibold text-white mb-1">{style.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-400">{style.description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs de Sugestões */}
        {selectedImageStyle && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-slate-700">
              <TabsTrigger value="style" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                <Scissors className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Cabelo & Barba</span>
                <span className="sm:hidden">Estilo</span>
              </TabsTrigger>
              <TabsTrigger value="clothing" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                <Shirt className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Vestimenta</span>
                <span className="sm:hidden">Roupa</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                <User className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Visualizar</span>
                <span className="sm:hidden">Ver</span>
              </TabsTrigger>
            </TabsList>

            {/* Tab: Cabelo & Barba */}
            <TabsContent value="style" className="space-y-6">
              {/* Cabelo */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Estilos de Cabelo</CardTitle>
                  <CardDescription className="text-slate-400">
                    {suggestions ? "Sugestões personalizadas para você" : "Escolha seu estilo preferido"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {(suggestions ? suggestions.hair : hairStyles).map((style) => (
                      <button
                        key={style.name}
                        onClick={() => setSelectedHair(style.name)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedHair === style.name
                            ? "border-amber-500 bg-amber-500/10"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }`}
                      >
                        <h4 className="font-semibold text-white mb-1">{style.name}</h4>
                        <p className="text-sm text-slate-400">{style.description}</p>
                        {suggestions && (
                          <Badge className="mt-2 bg-amber-600 text-white text-xs">
                            Recomendado
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                  {!suggestions && (
                    <Button
                      variant="link"
                      className="mt-4 text-amber-500 hover:text-amber-400"
                      onClick={() => {
                        const allStyles = hairStyles.filter(s => !suggestions?.hair.includes(s));
                        setSelectedHair(allStyles[0]?.name || "");
                      }}
                    >
                      Ver todos os estilos <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Barba */}
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Estilos de Barba</CardTitle>
                  <CardDescription className="text-slate-400">
                    {suggestions ? "Sugestões personalizadas para você" : "Escolha seu estilo preferido"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {(suggestions ? suggestions.beard : beardStyles).map((style) => (
                      <button
                        key={style.name}
                        onClick={() => setSelectedBeard(style.name)}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedBeard === style.name
                            ? "border-amber-500 bg-amber-500/10"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }`}
                      >
                        <h4 className="font-semibold text-white mb-1">{style.name}</h4>
                        <p className="text-sm text-slate-400">{style.description}</p>
                        {suggestions && (
                          <Badge className="mt-2 bg-amber-600 text-white text-xs">
                            Recomendado
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Vestimenta */}
            <TabsContent value="clothing">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Combinações de Roupas</CardTitle>
                  <CardDescription className="text-slate-400">
                    {suggestions ? "Sugestões personalizadas para complementar seu visual" : "Escolha seus estilos preferidos"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {(suggestions ? suggestions.clothing : clothingStyles).map((style) => (
                      <button
                        key={style.name}
                        onClick={() => {
                          if (selectedClothing.includes(style.name)) {
                            setSelectedClothing(selectedClothing.filter(s => s !== style.name));
                          } else {
                            setSelectedClothing([...selectedClothing, style.name]);
                          }
                        }}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          selectedClothing.includes(style.name)
                            ? "border-amber-500 bg-amber-500/10"
                            : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                        }`}
                      >
                        <h4 className="font-semibold text-white mb-1">{style.name}</h4>
                        <p className="text-sm text-slate-400">{style.description}</p>
                        {suggestions && (
                          <Badge className="mt-2 bg-amber-600 text-white text-xs">
                            Recomendado
                          </Badge>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-slate-400 mt-4">
                    💡 Você pode selecionar múltiplos estilos
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab: Preview */}
            <TabsContent value="preview">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Seu Visual Completo</CardTitle>
                  <CardDescription className="text-slate-400">
                    Visualize todas as suas escolhas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Simulação de Foto */}
                  <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-slate-700 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-32 h-32 mx-auto bg-slate-700 rounded-full flex items-center justify-center">
                          <User className="w-16 h-16 text-slate-500" />
                        </div>
                        <div className="space-y-2 px-4">
                          <p className="text-slate-400 text-sm">Simulação de Estilo</p>
                          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                            <Camera className="w-4 h-4 mr-2" />
                            Adicionar Foto
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resumo das Escolhas */}
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <h4 className="font-semibold text-white mb-2">Estilo de Imagem</h4>
                      <p className="text-slate-300">
                        {selectedImageStyle
                          ? imageStyles.find(s => s.id === selectedImageStyle)?.name
                          : "Não selecionado"}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <h4 className="font-semibold text-white mb-2">Cabelo</h4>
                      <p className="text-slate-300">{selectedHair || "Não selecionado"}</p>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <h4 className="font-semibold text-white mb-2">Barba</h4>
                      <p className="text-slate-300">{selectedBeard || "Não selecionado"}</p>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                      <h4 className="font-semibold text-white mb-2">Vestimenta</h4>
                      <p className="text-slate-300">
                        {selectedClothing.length > 0
                          ? selectedClothing.join(", ")
                          : "Não selecionado"}
                      </p>
                    </div>
                  </div>

                  {/* Botão Salvar */}
                  <Button
                    onClick={saveLook}
                    className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg shadow-amber-500/20"
                    size="lg"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Salvar Este Look
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Call to Action Inicial */}
        {!selectedImageStyle && (
          <Card className="bg-gradient-to-br from-amber-900/20 to-amber-950/20 border-amber-800/50">
            <CardContent className="p-8 sm:p-12 text-center">
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Comece Sua Transformação
              </h2>
              <p className="text-slate-400 mb-6">
                Selecione o estilo de imagem que você deseja transmitir acima
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/50 mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-slate-400 text-sm">
          <p>Visagismo Pro - Consultoria de Imagem Profissional</p>
        </div>
      </footer>
    </div>
  );
}
