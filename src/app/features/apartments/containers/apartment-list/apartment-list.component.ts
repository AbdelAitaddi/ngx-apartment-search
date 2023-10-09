import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// services
import { ApartmentFacadeService } from '../../facades';

// rxjs
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { All_Cities, Apartment, CityTypesFilter } from '../../models';
import { App_Route } from '../../../../core/models';
import { CityTypes } from '../../models';

export interface ViewModel {
  favourites: string[];
  selectedCity: CityTypesFilter;
  selectedBorough: string | typeof All_Cities;
  loading: boolean;
  loaded: boolean;
  boroughs: string[];
  cities: CityTypes[];
  apartmentByCity: Apartment[];
}

@UntilDestroy()
@Component({
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentListComponent implements OnInit {
  viewModel$: Observable<ViewModel>;

  constructor(private facade: ApartmentFacadeService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.viewModel$ = combineLatest([
      this.facade.favourites$,
      this.facade.selectedCity$,
      this.facade.selectedBorough$,
      this.facade.loading$,
      this.facade.loaded$,
      this.facade.boroughs$,
      this.facade.cities$,
      this.facade.apartmentByCity$,
    ]).pipe(
      map(([favourites, selectedCity, selectedBorough, loading, loaded, boroughs, cities, apartmentByCity]) => ({
        favourites,
        selectedCity,
        selectedBorough,
        loading,
        loaded,
        boroughs,
        cities,
        apartmentByCity,
      }))
    );

    this.route.params
      .pipe(
        untilDestroyed(this),
        map((params: Params) => params['cityId'] || All_Cities)
      )
      .subscribe((selectedCity) => {
        this.facade.updateSelectedCity(selectedCity);
      });
  }

  onBoroughSelected(boroughs: string | typeof All_Cities) {
    this.facade.updateSelectedBorough(boroughs);
  }

  onCitySelected(selectedCity: CityTypesFilter) {
    const path = selectedCity ? `/${selectedCity.toLowerCase()}` : '';
    this.location.go(`${App_Route.apartment_List}${path}`);

    this.facade.updateSelectedCity(selectedCity);
    this.facade.updateSelectedBorough(All_Cities);
  }
}
