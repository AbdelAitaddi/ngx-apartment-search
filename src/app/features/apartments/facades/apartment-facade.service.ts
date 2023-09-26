import {Injectable} from "@angular/core";
import {uniq} from "lodash";

// models
import {Apartment} from "../models";

// services
import {ApartmentsStore} from "../store";
import {ApartmentsService} from "../services/apartments.service";
import {GlobalLoadingIndicatorService} from "../../../core/services";

// rxjs
import { finalize, Observable, throwError} from "rxjs";
import {catchError, map, startWith, take, tap, withLatestFrom} from "rxjs/operators";
import {CityTypes} from "../models/city.model";

@Injectable({
  providedIn: 'root'
})
export class ApartmentFacadeService {
  constructor(
    private loadingIndicatorService: GlobalLoadingIndicatorService,
    private apartmentsService: ApartmentsService,
    private store: ApartmentsStore
  ) {}

  set apartments(apartments: Apartment[]) {
    this.store.set('apartments', apartments);
  }

  get apartments$(): Observable<Apartment[]> {
    return this.store.select<Apartment[]>('apartments');
  }

  set favourites(favourites: string[]) {
    this.store.set('favourites', favourites);
  }

  get favourites$(): Observable<string[]> {
    return this.store.select<string[]>('favourites');
  }

  set searchTerm(term: string | null) {
    this.store.set('searchTerm', term);
  }

  get searchTerm$(): Observable<string> {
    return this.store.select<string>('searchTerm');
  }

  set selectedApartment(apartment: Apartment | null) {
    this.store.set('selectedApartment', apartment);
  }

  get selectedApartment$(): Observable<Apartment | null> {
    return this.store.select<Apartment | null>('selectedApartment');
  }

  set selectedBorough(selectedBorough: CityTypes | null) {
    this.store.set('selectedBorough', selectedBorough);
  }

  get selectedBorough$(): Observable<CityTypes | null> {
    return this.store.select<CityTypes | null>('selectedBorough');
  }

  set loading(loading: boolean) {
    this.store.set('loading', loading);
  }

  get loading(): Observable<boolean> {
    return this.store.select<boolean>('loading');
  }

  set loaded(loaded: boolean) {
    this.store.set('loaded', loaded);
  }

  get loaded$(): Observable<boolean> {
    return this.store.select<boolean>('loaded');
  }

  /////////////////  Side effects //////////////

  get boroughs$(): Observable<{ id: number, text: string }[]> {
    return this.searchTerm$.pipe(
      withLatestFrom(this.apartments$),
      map(([searchTerm, apartments]: [string, Apartment[]]) => this.getMappedBoroughs(apartments, searchTerm)),
      startWith([]),
    )
  }

  get apartmentByCity$(): Observable<Apartment[]> {
    return this.searchTerm$.pipe(
      withLatestFrom(this.apartments$),
      map(([term, apartments]: [string, Apartment[]]) => term || term === ''
        ? this.filterByCityName(apartments, term)
        : apartments
      ),
    );
  }

  get favouritesApartments$(): Observable<Apartment[]> {
    return this.apartments$.pipe(
      withLatestFrom(this.favourites$),
      map(([apartments, favourites]: [Apartment[], string[]]) =>
        apartments.filter((apartment) =>  favourites.includes(apartment.id!))
      )
    );
  }

  updateSelectedBorough(boroughs: CityTypes | null) {
    this.selectedBorough = boroughs;
  }

  updateSearchTerm(searchTerm: string = '') {
    this.searchTerm = searchTerm;
  }

  getApartments(): Observable<Apartment[]> {
    this.loaded = false;
    this.loading = true;
    this.loadingIndicatorService.setLoading(true);
    return this.apartmentsService.getApartments()
      .pipe(
        map((apartments: Apartment[]) => apartments.filter((apartment: Apartment) => apartment.availableFromNowOn)),
        tap((apartments: Apartment[]) => {
          this.apartments = apartments;
          this.loaded = true;
        }),
        catchError(error => throwError(error)),
        finalize(() => {
          this.loading = false;
          this.loadingIndicatorService.setLoading(false);
        })
      );
  }

  getApartment(id: string): Observable<Apartment> {
    this.loadingIndicatorService.setLoading(true);
    return this.apartmentsService.getApartment(id)
      .pipe(
        tap((apartment: Apartment) => {
          this.selectedApartment = apartment;
        }),
        catchError(error => throwError(error)),
        finalize(() => this.loadingIndicatorService.setLoading(false))
      );
  }

  addToFavourites(apartmentId: string) {
    this.favourites$.pipe(
      take(1),
    ).subscribe((favourites: string[]) => {
      this.favourites = [...favourites, apartmentId]
    })

  }

  removeFromFavourites(apartmentId: string) {
    this.favourites$.pipe(
      take(1),
    ).subscribe((favourites: string[]) => {
      this.favourites = favourites.filter(favourite => favourite !== apartmentId);
    })
  }

  private filterByCityName(apartments: Apartment[], term: string): Apartment[] {
    return apartments.filter(
      ({ address: { city } }: Apartment) => city.toLocaleLowerCase().search(term.toLocaleLowerCase()) > -1
    );
  }

  private getMappedBoroughs(apartments: Apartment[], searchTerm: string): { id: number, text: string }[] {
    const apartmentsBvCity = searchTerm
    ? apartments
        .filter((apartment: Apartment) => apartment.address.city.toLocaleLowerCase().search(searchTerm.toLocaleLowerCase()) > -1)
    : apartments;

    return uniq(
      apartmentsBvCity
       .map(({ address: { borough } }: Apartment) => borough)
       .map((borough: string, index: number) => ({id: index + 1, text: borough }))
    )
  }

}
