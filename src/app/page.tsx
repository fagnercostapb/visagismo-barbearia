"use client";

import { useState } from "react";
import Link from "next/link";
import { Scissors, Calendar, Users, BarChart3, DollarSign, Receipt, Package, Gift, Target, TrendingUp, Award, Zap, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function BarbeariaDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "agendamento", label: "Agendamentos", icon: Calendar },
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "financeiro", label: "Financeiro", icon: DollarSign },
    { id: "estoque", label: "Estoque", icon: Package },
    { id: "visagismo", label: "Visagismo", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/60 border-b border-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">BarberPro</h1>
                <p className="text-sm text-gray-600">Gestão Completa</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0">
                Online
              </Badge>
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                B
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="backdrop-blur-xl bg-white/60 border border-white/60 shadow-xl">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                          activeSection === item.id
                            ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg"
                            : "text-gray-700 hover:bg-white/60"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === "dashboard" && <DashboardContent />}
            {activeSection === "visagismo" && <VisagismoSection />}
            {/* Outras seções podem ser adicionadas aqui */}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardContent() {
  const stats = [
    {
      title: "Agendamentos Hoje",
      value: "12",
      change: "+15%",
      icon: Calendar,
      color: "from-blue-400 to-cyan-500"
    },
    {
      title: "Receita do Dia",
      value: "R$ 1.250",
      change: "+8%",
      icon: DollarSign,
      color: "from-green-400 to-emerald-500"
    },
    {
      title: "Clientes Ativos",
      value: "247",
      change: "+12%",
      icon: Users,
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Avaliação Média",
      value: "4.9★",
      change: "+0.1",
      icon: Award,
      color: "from-amber-400 to-orange-500"
    }
  ];

  const recentAppointments = [
    { client: "João Silva", service: "Corte + Barba", time: "14:30", status: "confirmado" },
    { client: "Pedro Santos", service: "Corte Masculino", time: "15:00", status: "em_andamento" },
    { client: "Lucas Oliveira", service: "Barba Completa", time: "15:30", status: "agendado" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-100/60 to-purple-100/60 border border-cyan-300/60 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo à BarberPro! ✂️</h2>
            <p className="text-gray-700">Sistema completo de gestão para barbearias modernas</p>
          </div>
          <div className="text-6xl">💼</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="backdrop-blur-xl bg-white/60 border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-0">
                    {stat.change}
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="backdrop-blur-xl bg-white/60 border border-white/60 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-600" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>
            <Button variant="outline" className="w-full justify-start backdrop-blur-xl bg-white/60 border-2 border-white/60">
              <Users className="w-4 h-4 mr-2" />
              Cadastrar Cliente
            </Button>
            <Button variant="outline" className="w-full justify-start backdrop-blur-xl bg-white/60 border-2 border-white/60">
              <Receipt className="w-4 h-4 mr-2" />
              Registrar Venda
            </Button>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/60 border border-white/60 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Agendamentos Hoje
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 backdrop-blur-xl bg-white/40 rounded-xl border border-white/60">
                  <div>
                    <p className="font-medium text-gray-800">{appointment.client}</p>
                    <p className="text-sm text-gray-600">{appointment.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{appointment.time}</p>
                    <Badge
                      className={`${
                        appointment.status === "confirmado" ? "bg-green-100 text-green-700" :
                        appointment.status === "em_andamento" ? "bg-blue-100 text-blue-700" :
                        "bg-gray-100 text-gray-700"
                      } border-0`}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features Overview */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-purple-100/60 to-pink-100/60 border border-purple-300/60 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Recursos Disponíveis
          </CardTitle>
          <CardDescription>
            Tudo que você precisa para gerenciar sua barbearia com eficiência
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="backdrop-blur-xl bg-white/60 rounded-xl p-4 border border-white/60">
              <Calendar className="w-8 h-8 text-cyan-600 mb-2" />
              <h3 className="font-bold text-gray-800 mb-1">Agendamento Online</h3>
              <p className="text-sm text-gray-600">Clientes agendam 24/7 pelo app</p>
            </div>
            <div className="backdrop-blur-xl bg-white/60 rounded-xl p-4 border border-white/60">
              <Users className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-bold text-gray-800 mb-1">CRM Completo</h3>
              <p className="text-sm text-gray-600">Histórico e preferências dos clientes</p>
            </div>
            <div className="backdrop-blur-xl bg-white/60 rounded-xl p-4 border border-white/60">
              <DollarSign className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-bold text-gray-800 mb-1">Controle Financeiro</h3>
              <p className="text-sm text-gray-600">Fluxo de caixa e relatórios</p>
            </div>
            <div className="backdrop-blur-xl bg-white/60 rounded-xl p-4 border border-white/60">
              <Package className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-bold text-gray-800 mb-1">Gestão de Estoque</h3>
              <p className="text-sm text-gray-600">Produtos e suprimentos</p>
            </div>
            <div className="backdrop-blur-xl bg-white/60 rounded-xl p-4 border border-white/60">
              <Gift className="w-8 h-8 text-pink-600 mb-2" />
              <h3 className="font-bold text-gray-800 mb-1">Programa de Fidelidade</h3>
              <p className="text-sm text-gray-600">Pontos e recompensas</p>
            </div>
            <div className="backdrop-blur-xl bg-white/60 rounded-xl p-4 border border-white/60">
              <Sparkles className="w-8 h-8 text-amber-600 mb-2" />
              <h3 className="font-bold text-gray-800 mb-1">Visagismo</h3>
              <p className="text-sm text-gray-600">Consultoria de imagem para clientes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function VisagismoSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="backdrop-blur-xl bg-gradient-to-br from-purple-100/60 to-pink-100/60 border border-purple-300/60 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Visagismo para Clientes 🎨</h2>
            <p className="text-gray-700">Ajude seus clientes a descobrirem o estilo ideal</p>
          </div>
          <div className="text-6xl">✨</div>
        </div>
      </div>

      {/* Visagismo Features */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="backdrop-blur-xl bg-white/60 border border-white/60 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Como Funciona
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-gray-800">Cliente faz o quiz</p>
                <p className="text-sm text-gray-600">14 perguntas sobre personalidade e estilo</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-gray-800">Recebe recomendações</p>
                <p className="text-sm text-gray-600">Cabelo, barba, roupa e cores ideais</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-gray-800">Simulação visual</p>
                <p className="text-sm text-gray-600">Upload de foto para ver o resultado</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-xl bg-white/60 border border-white/60 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-600" />
              Benefícios para seu Negócio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">Aumenta fidelização dos clientes</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">Diferencial competitivo</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">Upsell de serviços e produtos</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700">Marketing boca a boca</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-cyan-100/60 to-purple-100/60 border-2 border-cyan-400/60 shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Pronto para oferecer visagismo aos seus clientes?
          </h3>
          <p className="text-gray-700 mb-6">
            Redirecione seus clientes para o quiz de visagismo e ajude-os a descobrirem seu estilo ideal.
          </p>
          <Link href="/visagismo">
            <Button className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-600 text-white text-lg py-6 px-8 rounded-xl font-bold shadow-xl">
              <Sparkles className="w-5 h-5 mr-2" />
              Acessar Visagismo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}