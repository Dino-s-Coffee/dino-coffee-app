import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'dino-coffee',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    CapacitorHttp: {
      "enabled": true
    }
  }
};

export default config;
