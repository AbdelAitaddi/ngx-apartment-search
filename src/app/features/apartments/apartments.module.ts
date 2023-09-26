import { NgModule } from '@angular/core';

import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

// modules
import { SharedModule } from '../../shared/shared.module';
import { ApartmentsRoutingModule } from './apartments-routing.module';
import {MaterialModule} from "../../shared/material.module";

// components
import * as fromContainers from './containers';
import * as fromComponents from './components';


@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(),
    MaterialModule,
    ApartmentsRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class ApartmentsModule {}
