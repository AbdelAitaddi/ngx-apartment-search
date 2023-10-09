import { ChangeDetectionStrategy, Component } from '@angular/core';

// services
import { ApartmentFacadeService } from '../../facades';

// rxjs
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { All_Cities, Apartment, CityTypesFilter } from '../../models';

interface ViewModel {
  favouritesApartments: Apartment[];
  favourites: string[];
  selectedCity: CityTypesFilter;
  selectedBorough: string | typeof All_Cities;
  loading: boolean;
  loaded: boolean;
}

@Component({
  templateUrl: './apartment-favourites.component.html',
  styleUrls: ['./apartment-favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentFavouritesComponent {
  viewModel$: Observable<ViewModel>;

  constructor(private facade: ApartmentFacadeService) {}

  ngOnInit() {
    this.viewModel$ = combineLatest([
      this.facade.favouritesApartments$,
      this.facade.favourites$,
      this.facade.loading$,
      this.facade.loaded$,
      this.facade.selectedCity$,
      this.facade.selectedBorough$,
    ]).pipe(
      map(([favouritesApartments, favourites, loading, loaded, selectedCity, selectedBorough]) => ({
        favouritesApartments,
        favourites,
        loading,
        loaded,
        selectedCity,
        selectedBorough,
      }))
    );
  }
}
