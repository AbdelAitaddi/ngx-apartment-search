// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import { EventEmitter } from '@angular/core';
import 'zone.js/testing';
import { TitleStrategy } from '@angular/router';
import { getTestBed } from '@angular/core/testing';
import { MockInstance, MockService, ngMocks } from 'ng-mocks';
import { LangChangeEvent, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { of } from 'rxjs';

import { TemplatePageTitleStrategy } from './app/core/services';

const stringifyTranslation = (value: string, params) =>
  `translated:${value}` + (params ? `:${JSON.stringify(params)}` : '');

ngMocks.autoSpy('jasmine');

jasmine.getEnv().addReporter({
  specDone: MockInstance.restore,
  specStarted: MockInstance.remember,
  suiteDone: MockInstance.restore,
  suiteStarted: MockInstance.remember,
});

ngMocks.defaultMock(TranslatePipe, () => {
  return { transform: (value, params) => stringifyTranslation(value, params) };
});

ngMocks.defaultMock([TranslateService], () => ({
  instant: (value: string, params) => stringifyTranslation(value, params),
  get: (value: string, params) => of(stringifyTranslation(value, params)),
  onLangChange: { asObservable: () => of({ lang: 'en', translations: {} }) } as EventEmitter<LangChangeEvent>,
}));

ngMocks.defaultMock(TitleStrategy, () => MockService(TemplatePageTitleStrategy));

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
  teardown: { destroyAfterEach: true },
});
