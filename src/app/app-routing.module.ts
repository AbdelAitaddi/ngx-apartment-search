import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// containers
import * as fromContainers from './core/containers';

// routes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'apartments',
    pathMatch: 'full',
  },
  {
    path: 'apartments',
    loadChildren: () => import('./features/apartments/apartments.module').then((m) => m.ApartmentsModule),
  },
  {
    path: 'about',
    title: 'i18n.core.pageTitle.about',
    component: fromContainers.AboutComponent,
  },
  {
    path: 'app-unavailable',
    title: 'i18n.core.pageTitle.appUnavailable',
    component: fromContainers.AppUnavailableComponent,
  },
  {
    path: '**',
    component: fromContainers.PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
})
export class AppRoutingModule {}
