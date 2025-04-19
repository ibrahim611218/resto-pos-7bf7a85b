
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.2698a2d5223a4de7bff6e0b99faa5f82',
  appName: 'resto-pos',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: ['*']
  },
  plugins: {
    // Configure plugins to work offline
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
