import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

// models
import { Apartment } from '../models';
import { App_Route } from '../../../core/models';

// services
import { ApartmentsStore } from '../store';
import { ApartmentFacadeService } from '../facades';

// rxjs
import { Observable, of } from 'rxjs';
import { map, take, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApartmentExistsGuards implements CanActivate {
  constructor(private store: ApartmentsStore, private router: Router, private facade: ApartmentFacadeService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const { apartmentId } = route.params;

    return this.checkStore(apartmentId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(apartmentId: string) {
    return this.facade.loaded$.pipe(
      take(1),
      switchMap((loaded) => {
        if (!loaded) {
          return this.getApartmentById(apartmentId);
        }

        return this.hasApartment(apartmentId);
      })
    );
  }

  getApartmentById(apartmentId: string) {
    return this.facade.getApartment(apartmentId).pipe(
      switchMap(() => of(true)),
      catchError(() => {
        this.router.navigate([App_Route.apartment_List]).then();
        return of(false);
      })
    );
  }

  hasApartment(apartmentId: string): Observable<boolean> {
    return this.facade.apartments$.pipe(
      map((apartments: Apartment[]) => {
        const apartmentExists = apartments.find((apartment) => apartment.id === apartmentId);
        if (apartmentExists) {
          this.facade.selectedApartment = apartmentExists;
          return true;
        }
        this.router.navigate([App_Route.apartment_List]).then();
        return false;
      })
    );
  }
}
