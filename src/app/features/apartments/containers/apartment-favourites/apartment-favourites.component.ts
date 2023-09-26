import { ChangeDetectionStrategy, Component} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";

// services
import {ApartmentFacadeService} from "../../facades/apartment-facade.service";

// models
import { Apartment } from '../../models';

// rxjs
import {Observable} from "rxjs";


@UntilDestroy()
@Component({
  templateUrl: './apartment-favourites.component.html',
  styleUrls: ['./apartment-favourites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentFavouritesComponent {
  favourites$: Observable<string[]>;
  favouritesApartments$: Observable<Apartment[]>;

  constructor(private facade: ApartmentFacadeService) {}

  ngOnInit() {
    this.favouritesApartments$ = this.facade.favouritesApartments$;
    this.favourites$ = this.facade.favourites$;
  }

}
