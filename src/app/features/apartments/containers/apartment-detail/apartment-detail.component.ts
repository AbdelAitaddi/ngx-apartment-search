import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

// models
import { Apartment } from '../../models';

// services
import {ApartmentFacadeService} from "../../facades/apartment-facade.service";

// rxjs
import {combineLatest, Observable} from 'rxjs';
import {map} from "rxjs/operators";


@Component({
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentDetailComponent implements OnInit {
  viewModel$: Observable<{apartment: Apartment | null, selected: boolean}>;

  constructor(private facade: ApartmentFacadeService) {}

  ngOnInit() {
    this.viewModel$ = combineLatest([
      this.facade.selectedApartment$,
      this.facade.favourites$
    ]).pipe(
      map(([apartment, favourites]) =>({
          apartment,
          selected: favourites.includes(apartment!.id!)
        })
      )
    );
  }

  onSave(apartmentId: string) {
    this.facade.addToFavourites(apartmentId);
  }

  onRemove(apartmentId: string) {
    this.facade.removeFromFavourites(apartmentId);
  }

}
