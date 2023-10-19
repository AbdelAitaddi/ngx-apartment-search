import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// modules
import { AppModule } from './app/app.module';

// config
import { APP_CONFIG } from './app/app.config';

// models
import { AppConfig } from './app/core/models';

const requestInit: RequestInit = {
  cache: 'no-cache',
};

fetch('/assets/app-config/config.json', requestInit)
  .then((res) => res.json())
  .then((appConfig: AppConfig) => {
    console.info('Application running with config:', appConfig);

    platformBrowserDynamic([{ provide: APP_CONFIG, useValue: appConfig }])
      .bootstrapModule(AppModule, { ngZoneEventCoalescing: true })
      .catch((err) => console.error(err));
  });
