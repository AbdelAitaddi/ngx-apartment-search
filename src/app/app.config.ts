import { APP_INITIALIZER, ErrorHandler, FactoryProvider, InjectionToken, LOCALE_ID } from '@angular/core';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { IconsService } from './core/services/icons.service';
import { TranslateService } from '@ngx-translate/core';
import { TitleStrategy } from '@angular/router';
import { GlobalErrorHandler, TemplatePageTitleStrategy } from './core/services';

// models
import { AppConfig, StorageProvider } from './core/models';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export const WINDOW = new InjectionToken<Window>('window');
export const BROWSER_LOCATION = new InjectionToken<Location>('window location');
export const STORAGE = new InjectionToken<StorageProvider>('storageObject');

export const WINDOW_PROVIDER: FactoryProvider = {
  provide: WINDOW,
  useFactory: () => window,
};

export const STORAGE_PROVIDER: FactoryProvider = {
  provide: STORAGE,
  useFactory: (): StorageProvider => {
    return {
      localStore: localStorage,
      sessionStore: sessionStorage,
    };
  },
};

export const BROWSER_LOCATION_PROVIDER: FactoryProvider = {
  provide: BROWSER_LOCATION,
  useFactory: () => window.location,
};

export const BASE_HREF_PROVIDER: FactoryProvider = {
  provide: APP_BASE_HREF,
  useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(),
  deps: [PlatformLocation],
};

export const ICONS_INIT_PROVIDER: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: (iconService: IconsService) => () => iconService.registerIcons(),
  deps: [IconsService],
  multi: true,
};

export const LOCALE_ID_PROVIDER: FactoryProvider = {
  provide: LOCALE_ID,
  useFactory: (translate: TranslateService) => translate.currentLang,
  deps: [TranslateService],
};

export const TITLE_STRATEGY_PROVIDER = {
  provide: TitleStrategy,
  useClass: TemplatePageTitleStrategy,
};

export const ERROR_HANDLER_PROVIDER = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandler,
};
