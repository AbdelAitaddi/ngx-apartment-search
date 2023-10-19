import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedCoreModule } from '../../shared/core/shared-core.module';
import { MaterialCoreModule } from '../../shared/functional/material-core/material-core.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// modules
import { ApartmentsRoutingModule } from './apartments-routing.module';
import { TranslationModule } from '../../shared/functional/translation/translation.module';

// components
import * as fromContainers from './containers';
import * as fromComponents from './components';

// pipes
import * as fromPipes from './pipes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedCoreModule,
    MaterialCoreModule,
    TranslationModule,
    ApartmentsRoutingModule,
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components, ...fromPipes.pipes],
})
export class ApartmentsModule {}
