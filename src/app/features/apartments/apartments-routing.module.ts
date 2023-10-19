import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import * as fromContainers from './containers';

// services
import { ApartmentsGuard, ApartmentExistsGuards } from './guard';

const routes: Routes = [
  {
    path: '',
    title: 'i18n.core.pageTitle.apartments',
    canActivate: [ApartmentsGuard],
    component: fromContainers.ApartmentListComponent,
  },
  {
    path: 'detail/:apartmentId',
    title: 'i18n.core.pageTitle.apartmentDetail',
    canActivate: [ApartmentExistsGuards],
    component: fromContainers.ApartmentDetailComponent,
  },
  {
    path: 'favourites',
    title: 'i18n.core.pageTitle.favourites',
    component: fromContainers.ApartmentFavouritesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApartmentsRoutingModule {}
