import { AppComponent } from './app/app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppUnavailableComponent } from './app-unavailable/app-unavailable.component';
import { AboutComponent } from './about/about.component';

export const containers = [AppComponent, PageNotFoundComponent, AppUnavailableComponent, AboutComponent];

export * from './app/app.component';
export * from './about/about.component';
export * from './page-not-found/page-not-found.component';
export * from './app-unavailable/app-unavailable.component';
