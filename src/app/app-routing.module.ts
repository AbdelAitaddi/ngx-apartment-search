import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// containers
import * as fromContainers from './core/containers';

// routes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'apartment/list',
    pathMatch: 'full',
  },
  {
    path: 'apartment',
    loadChildren: () => import('./features/apartments/apartments.module').then((m) => m.ApartmentsModule),
  },
  {
    path: 'about',
    component: fromContainers.AboutComponent,
  },
  {
    path: '**',
    component: fromContainers.PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })],
})
export class AppRoutingModule {}
