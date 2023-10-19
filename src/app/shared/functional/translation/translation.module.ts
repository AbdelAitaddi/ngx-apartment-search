import { HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { NgModule, ModuleWithProviders, APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

// config
import { Language_Selection_Collection } from './config';
import { APP_CONFIG, STORAGE } from '../../../app.config';

// models
import { AppConfig, StorageProvider } from '../../../core/models';
import { LanguageSelection, LocaleType } from './models';

// services
import { MyMissingTranslationHandler } from './services/mssing-translation-handler.service';
import { createTranslateLoader } from './services/create-translate-loader.service';

// directives
import * as fromDirectives from './directives';

// rxjs
import { forkJoin, from } from 'rxjs';

// prevents untranslated text in the UI
export function setLanguage(translate: TranslateService, appConfig: AppConfig, storage: StorageProvider) {
  return () => {
    const preferredLanguage = (<LocaleType>storage.localStore.getItem('preferredLanguage')) as LocaleType;
    const languageSelection = Language_Selection_Collection.find(
      (item: LanguageSelection) => item.code === preferredLanguage
    );

    const localeId = languageSelection?.code ?? appConfig.defaultLanguage;
    return forkJoin([from(loadLocale(localeId)), translate.use(localeId)]);
  };
}

// dynamically load the angular locale
export function loadLocale(locale: string): Promise<void> {
  return new Promise((resolve) => {
    import(
      /* webpackInclude: /(de|da|en|en-GB|fr|fr-CA|sv|af|ar|bg|bn|bs|ca|cs|cy|el|es|et|fa|fi|fil|he|hi|hr|ht|hu|id|is|it|ja|ko|lt|lv|mg|ms|mt|nb|nl|pl|pt|ro|ru|sk|sl|sr|sw|ta|te|th|tr|uk|ur|vi|zh|zh-Hans)\.mjs$/ */
      `/node_modules/@angular/common/locales/${locale}.mjs`
    ).then((module) => {
      registerLocaleData(module.default);
      resolve();
    });
  });
}

@NgModule({
  imports: [TranslateModule],
  declarations: [...fromDirectives.directives],
  exports: [TranslateModule, ...fromDirectives.directives],
})
export class TranslationModule {
  static forRoot(): [ModuleWithProviders<TranslateModule>, ModuleWithProviders<TranslateModule>] {
    return [
      {
        ngModule: TranslationModule,
        providers: [TRANSLATION_PROVIDER],
      },
      TranslateModule.forRoot({
        isolate: false,
        useDefaultLang: false,
        missingTranslationHandler: {
          provide: MissingTranslationHandler,
          useClass: MyMissingTranslationHandler,
        },
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient, APP_CONFIG],
        },
      }),
    ];
  }
}

export const TRANSLATION_PROVIDER: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: setLanguage,
  deps: [TranslateService, APP_CONFIG, STORAGE],
  multi: true,
};
