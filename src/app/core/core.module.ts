import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modules
import { MaterialCoreModule } from '../shared/functional/material-core/material-core.module';
import { TranslationModule } from '../shared/functional/translation/translation.module';

// services
import { throwIfAlreadyLoaded } from './helpers';

// Components
import * as fromContainers from './containers';
import * as fromComponents from './components';

// config
import {
  BASE_HREF_PROVIDER,
  BROWSER_LOCATION_PROVIDER,
  ERROR_HANDLER_PROVIDER,
  ICONS_INIT_PROVIDER,
  LOCALE_ID_PROVIDER,
  STORAGE_PROVIDER,
  TITLE_STRATEGY_PROVIDER,
  WINDOW_PROVIDER,
} from '../app.config';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialCoreModule, TranslationModule],
  declarations: [...fromContainers.containers, fromComponents.components],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    throwIfAlreadyLoaded<CoreModule>(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        BASE_HREF_PROVIDER,
        LOCALE_ID_PROVIDER,
        ICONS_INIT_PROVIDER,
        TITLE_STRATEGY_PROVIDER,
        ERROR_HANDLER_PROVIDER,
        WINDOW_PROVIDER,
        STORAGE_PROVIDER,
        BROWSER_LOCATION_PROVIDER,
      ],
    };
  }
}
