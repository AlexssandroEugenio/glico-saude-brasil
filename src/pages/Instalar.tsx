import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { 
  CheckCircle2, 
  Download, 
  Smartphone, 
  Monitor, 
  Zap, 
  Wifi, 
  Bell, 
  Heart,
  ChevronRight
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Instalar = () => {
  const { isInstalled, canInstall, platform, browser, promptInstall } = usePWAInstall();
  const [installing, setInstalling] = useState(false);

  const handleInstall = async () => {
    setInstalling(true);
    try {
      await promptInstall();
      toast({
        title: "✅ Instalação iniciada!",
        description: "Siga as instruções do navegador para concluir.",
      });
    } catch (error) {
      console.error('Erro ao instalar:', error);
      toast({
        title: "Erro ao instalar",
        description: "Tente novamente ou use as instruções manuais abaixo.",
        variant: "destructive",
      });
    } finally {
      setInstalling(false);
    }
  };

  useEffect(() => {
    if (isInstalled) {
      toast({
        title: "✅ App já instalado!",
        description: "Você pode acessar o GlicoSaúde pela tela inicial.",
      });
    }
  }, [isInstalled]);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-6 rounded-b-3xl shadow-[var(--shadow-elevated)]">
        <div className="max-w-2xl mx-auto">
          {isInstalled ? (
            <>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-8 w-8" />
                <h1 className="text-2xl font-bold">App Instalado! ✅</h1>
              </div>
              <p className="text-sm opacity-90">
                O GlicoSaúde está na tela inicial do seu dispositivo. Você pode fechar esta aba e abrir o app pelo ícone.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <Download className="h-8 w-8" />
                <h1 className="text-2xl font-bold">Instale o GlicoSaúde</h1>
              </div>
              <p className="text-sm opacity-90">
                Adicione o app à tela inicial para acesso rápido e experiência completa
              </p>
            </>
          )}
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {/* Botão de instalação automática */}
        {!isInstalled && canInstall && (
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground p-3 rounded-full">
                <Download className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Instalação Rápida</h3>
                <p className="text-sm text-muted-foreground">
                  Clique no botão para instalar com um toque
                </p>
              </div>
              <Button
                onClick={handleInstall}
                disabled={installing}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                {installing ? "Instalando..." : "Instalar Agora"}
              </Button>
            </div>
          </Card>
        )}

        {/* Instruções por plataforma */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 text-foreground">Como Instalar</h2>
          
          <Tabs defaultValue={platform === 'ios' ? 'ios' : platform === 'android' ? 'android' : 'desktop'} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="android">
                <Smartphone className="h-4 w-4 mr-2" />
                Android
              </TabsTrigger>
              <TabsTrigger value="ios">
                <Smartphone className="h-4 w-4 mr-2" />
                iOS
              </TabsTrigger>
              <TabsTrigger value="desktop">
                <Monitor className="h-4 w-4 mr-2" />
                Desktop
              </TabsTrigger>
            </TabsList>

            {/* Android */}
            <TabsContent value="android" className="space-y-4 mt-4">
              <div className="bg-accent/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Navegadores suportados:</strong> Chrome, Edge, Samsung Internet
                </p>
              </div>
              
              <ol className="space-y-3 text-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Toque no menu <strong>(⋮)</strong> no canto superior direito do navegador</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <span>Selecione <strong>"Adicionar à tela inicial"</strong> ou <strong>"Instalar app"</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <span>Confirme tocando em <strong>"Adicionar"</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                  <span>Pronto! O ícone do GlicoSaúde aparecerá na sua tela inicial 🎉</span>
                </li>
              </ol>
            </TabsContent>

            {/* iOS */}
            <TabsContent value="ios" className="space-y-4 mt-4">
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-lg">
                <p className="text-sm text-foreground">
                  ⚠️ <strong>Importante:</strong> No iOS, você deve usar o navegador <strong>Safari</strong>. A instalação não funciona no Chrome iOS.
                </p>
              </div>
              
              <ol className="space-y-3 text-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Toque no botão <strong>Compartilhar (⬆️)</strong> na parte inferior da tela</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <span>Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <span>Edite o nome se desejar e toque em <strong>"Adicionar"</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                  <span>Pronto! Acesse o GlicoSaúde direto da tela inicial 🎉</span>
                </li>
              </ol>
            </TabsContent>

            {/* Desktop */}
            <TabsContent value="desktop" className="space-y-4 mt-4">
              <div className="bg-accent/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Navegadores suportados:</strong> Chrome, Edge
                </p>
              </div>
              
              <ol className="space-y-3 text-foreground">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                  <span>Clique no ícone de instalação <strong>(➕)</strong> na barra de endereços</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                  <span>Ou clique no menu <strong>(⋮)</strong> → <strong>"Instalar GlicoSaúde"</strong></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                  <span>Confirme a instalação</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                  <span>O app abrirá em uma janela própria! 🎉</span>
                </li>
              </ol>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Benefícios */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-foreground">Por que instalar?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-4 hover-scale">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Acesso Instantâneo</h3>
                  <p className="text-sm text-muted-foreground">
                    Abra direto da tela inicial, sem digitar URL
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover-scale">
              <div className="flex items-start gap-3">
                <div className="bg-accent/50 text-accent-foreground p-2 rounded-lg">
                  <Wifi className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Funciona Offline</h3>
                  <p className="text-sm text-muted-foreground">
                    Seus dados sempre disponíveis, mesmo sem internet
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover-scale">
              <div className="flex items-start gap-3">
                <div className="bg-secondary/50 text-secondary-foreground p-2 rounded-lg">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Notificações</h3>
                  <p className="text-sm text-muted-foreground">
                    Receba lembretes de medição (em breve)
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 hover-scale">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-lg">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Experiência Nativa</h3>
                  <p className="text-sm text-muted-foreground">
                    Interface fluida como app de celular
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 text-foreground">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                O que é um PWA?
              </h3>
              <p className="text-sm text-muted-foreground ml-6">
                Progressive Web App - um site que funciona como aplicativo nativo, mas sem ocupar espaço da loja de apps.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                É seguro?
              </h3>
              <p className="text-sm text-muted-foreground ml-6">
                Sim! É o mesmo site, apenas instalado na tela inicial. Seus dados continuam seguros.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                Ocupa muito espaço?
              </h3>
              <p className="text-sm text-muted-foreground ml-6">
                Não! PWAs ocupam muito menos espaço que apps tradicionais (apenas ~2MB) e se atualizam automaticamente.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-primary" />
                Como desinstalar?
              </h3>
              <p className="text-sm text-muted-foreground ml-6">
                Basta remover o ícone da tela inicial como qualquer outro app: pressione e segure, depois selecione "Remover".
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Instalar;
