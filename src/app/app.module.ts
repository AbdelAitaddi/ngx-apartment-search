import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// modules
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './core/containers';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
