import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// pipes
import * as fromPipes from './pipes';

const sharedModule = [CommonModule, ReactiveFormsModule];

@NgModule({
  imports: [...sharedModule],
  declarations: [...fromPipes.pipes],
  exports: [...sharedModule, ...fromPipes.pipes],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
