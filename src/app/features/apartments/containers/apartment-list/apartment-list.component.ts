import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

// rxjs
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// services
import { ApartmentFacadeService } from '../../facades';

// models
import { CityTypes, Apartment, CityTypesFilter, Statistics } from '../../models';

// config
import { All_Cities } from '../../config';

export interface ViewModel {
  favouritesIds: string[];
  selectedCity: CityTypesFilter;
  selectedBorough: string | typeof All_Cities;
  loading: boolean;
  loaded: boolean;
  allDataLoaded: boolean;
  boroughs: string[];
  cities: CityTypes[];
  apartmentByCity: Apartment[];
  statistics: Statistics;
}

@UntilDestroy()
@Component({
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentListComponent implements OnInit {
  viewModel$: Observable<ViewModel>;

  ngOnInit() {
    this.viewModel$ = combineLatest([
      this.facade.favouritesIds$,
      this.facade.selectedCity$,
      this.facade.selectedBorough$,
      this.facade.loading$,
      this.facade.loaded$,
      this.facade.allDataLoaded$,
      this.facade.boroughs$,
      this.facade.cities$,
      this.facade.apartments$,
      this.facade.statistics$,
    ]).pipe(
      map(
        ([
          favouritesIds,
          selectedCity,
          selectedBorough,
          loading,
          loaded,
          allDataLoaded,
          boroughs,
          cities,
          apartmentByCity,
          statistics,
        ]) => ({
          favouritesIds,
          selectedCity,
          selectedBorough,
          loading,
          loaded,
          allDataLoaded,
          boroughs,
          cities,
          apartmentByCity,
          statistics,
        })
      )
    );

    this.route.queryParams
      .pipe(
        untilDestroyed(this),
        map((params: Params) => params['city'] || All_Cities)
      )
      .subscribe((selectedCity) => {
        this.facade.updateSelectedCity(selectedCity);
      });

    this.facade.onScrollEvent$.pipe(untilDestroyed(this)).subscribe();
  }

  onScrollDown() {
    this.facade.loadMore();
  }

  onBoroughSelected(boroughs: string | typeof All_Cities) {
    this.facade.updateSelectedBorough(boroughs);
  }

  onCitySelected(city: CityTypesFilter) {
    this.router.navigate([], { queryParams: { city } }).then(() => this.facade.onCitySelected(city).subscribe());
  }

  constructor(private facade: ApartmentFacadeService, private route: ActivatedRoute, private router: Router) {}
}
