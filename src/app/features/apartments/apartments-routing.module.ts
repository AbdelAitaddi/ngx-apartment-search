import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import * as fromContainers from './containers';

// services
import { ApartmentsGuard, ApartmentExistsGuards } from './guard';

const routes: Routes = [
  {
    path: 'list',
    canActivate: [ApartmentsGuard],
    children: [
      {
        path: '',
        component: fromContainers.ApartmentListComponent,
      },
      {
        path: ':cityId',
        component: fromContainers.ApartmentListComponent,
      },
    ],
  },
  {
    path: 'detail/:apartmentId',
    canActivate: [ApartmentExistsGuards],
    component: fromContainers.ApartmentDetailComponent,
  },
  {
    path: 'favourites',
    canActivate: [ApartmentsGuard],
    component: fromContainers.ApartmentFavouritesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartmentsRoutingModule {}
