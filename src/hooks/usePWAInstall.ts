import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface PWAInstallInfo {
  isInstalled: boolean;
  canInstall: boolean;
  platform: 'ios' | 'android' | 'desktop' | 'unknown';
  browser: string;
  promptInstall: () => Promise<void>;
}

export const usePWAInstall = (): PWAInstallInfo => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | 'desktop' | 'unknown'>('unknown');
  const [browser, setBrowser] = useState('unknown');

  useEffect(() => {
    // Detectar se já está instalado (modo standalone)
    const checkInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isIOSStandalone = (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone || isIOSStandalone);
    };

    // Detectar plataforma e navegador
    const detectPlatform = () => {
      const ua = navigator.userAgent.toLowerCase();
      
      // Detectar navegador
      if (ua.includes('chrome')) setBrowser('Chrome');
      else if (ua.includes('safari') && !ua.includes('chrome')) setBrowser('Safari');
      else if (ua.includes('firefox')) setBrowser('Firefox');
      else if (ua.includes('edg')) setBrowser('Edge');
      else setBrowser('Outro');

      // Detectar plataforma
      if (/iphone|ipad|ipod/.test(ua)) {
        setPlatform('ios');
      } else if (/android/.test(ua)) {
        setPlatform('android');
      } else if (/win|mac|linux/.test(ua)) {
        setPlatform('desktop');
      } else {
        setPlatform('unknown');
      }
    };

    checkInstalled();
    detectPlatform();

    // Capturar evento beforeinstallprompt (Android/Desktop Chrome/Edge)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    // Detectar quando app é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt) {
      console.log('Prompt de instalação não disponível');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Usuário aceitou instalação');
    } else {
      console.log('Usuário recusou instalação');
    }
    
    setDeferredPrompt(null);
  };

  return {
    isInstalled,
    canInstall: deferredPrompt !== null,
    platform,
    browser,
    promptInstall,
  };
};
