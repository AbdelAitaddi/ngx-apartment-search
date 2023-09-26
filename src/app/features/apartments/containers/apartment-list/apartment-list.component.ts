import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

// services
import {ApartmentFacadeService} from "../../facades/apartment-facade.service";

// models
import { Apartment } from '../../models';

// rxjs
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {CityTypes} from "../../models/city.model";


@UntilDestroy()
@Component({
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentListComponent implements OnInit, OnDestroy {
  boroughs$: Observable<{ id: number, text: string }[]>;
  searchTerm$: Observable<string>;
  favourites$: Observable<string[]>;
  apartments$: Observable<Apartment[]>;
  selectedBorough$: Observable<CityTypes | null>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private facade: ApartmentFacadeService,
  ) {
    this.route.params
      .pipe(
        untilDestroyed(this),
        map((params: Params) => params['cityId'])
      )
      .subscribe(term => {
        this.facade.updateSearchTerm(term);
      });
  }

  ngOnInit() {
    this.boroughs$ = this.facade.boroughs$;
    this.searchTerm$ = this.facade.searchTerm$;
    this.favourites$ = this.facade.favourites$;
    this.apartments$ = this.facade.apartmentByCity$;
    this.selectedBorough$ = this.facade.selectedBorough$;
  }

  onSelectedBorough(boroughs: CityTypes | null) {
   this.facade.updateSelectedBorough(boroughs);
  }

  onSearch(searchTerm: string = '') {
    const path = searchTerm !== '' ? `/${searchTerm}` : '';
    this.location.go(`/apartment/list${path}`);
    this.facade.updateSearchTerm(searchTerm);
  }

  ngOnDestroy() {}

}
