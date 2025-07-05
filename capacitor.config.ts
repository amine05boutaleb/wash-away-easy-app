
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a458e33771784b2fa6b23cf87cc238ed',
  appName: 'wash-away-easy-app',
  webDir: 'dist',
  server: {
    url: 'https://a458e337-7178-4b2f-a6b2-3cf87cc238ed.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3B82F6',
      showSpinner: false
    }
  }
};

export default config;
