import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, TitleStrategy } from '@angular/router';

// modules
import { MaterialModule } from '../shared/material.module';

// services
import { IconService } from './services/icon.service';
import { TemplatePageTitleStrategy } from './services';
import { throwIfAlreadyLoaded } from './helpers/modules-import-check';

// Components
import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [...fromContainers.containers, fromComponents.NavItemComponent],
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
        {
          provide: APP_INITIALIZER,
          useFactory: (iconService: IconService) => () => iconService.registerIcons(),
          deps: [IconService],
          multi: true,
        },
        {
          provide: TitleStrategy,
          useClass: TemplatePageTitleStrategy,
        },
      ],
    };
  }
}
