import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
// services
import { ApartmentFacadeService } from '../../facades';

// rxjs
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// models
import { Apartment } from '../../models';

interface ViewModel {
  apartment: Apartment | null;
  selected: boolean;
}

@Component({
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentDetailComponent implements OnInit {
  viewModel$: Observable<ViewModel>;

  constructor(private facade: ApartmentFacadeService, private location: Location) {}

  ngOnInit() {
    this.viewModel$ = combineLatest([this.facade.selectedApartment$, this.facade.favourites$]).pipe(
      map(([apartment, favourites]) => ({
        apartment,
        selected: favourites.includes(apartment!.id!),
      }))
    );
  }

  onSave(apartmentId: string) {
    this.facade.addToFavourites(apartmentId);
  }

  onRemove(apartmentId: string) {
    this.facade.removeFromFavourites(apartmentId);
  }

  onBack() {
    this.location.back();
  }
}
