import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './core/containers';

// routes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'apartment',
    loadChildren: () => import('./features/apartments/apartments.module').then((m) => m.ApartmentsModule)
  },
  {
    path: 'home',
    component: fromContainers.HomeComponent
  },
  {
    path: '**',
    component: fromContainers.PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
})
export class AppRoutingModule { }

