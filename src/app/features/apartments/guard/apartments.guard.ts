import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

// models
import { CityTypesFilter, Statistics } from '../models';

// config
import { All_Cities } from '../config';

// services
import { ApartmentFacadeService } from '../facades';

// rxjs
import { of, Observable, combineLatest } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsGuard implements CanActivate {
  constructor(private facade: ApartmentFacadeService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const cityId = route.queryParams['city'] || All_Cities;
    return this.checkStore(cityId);
  }

  checkStore(cityId: CityTypesFilter): Observable<boolean> {
    return combineLatest([
      this.facade.loaded$.pipe(take(1)),
      this.facade.selectedCity$.pipe(take(1)),
      this.facade.statistics$,
    ]).pipe(
      switchMap(([loaded, selectedCity]: [boolean, CityTypesFilter, Statistics]) =>
        loaded && selectedCity === cityId ? of(loaded) : this.loadApartments(cityId)
      ),
      catchError(() => {
        this.router.navigateByUrl('/app-unavailable', { skipLocationChange: true }).then();
        return of(false);
      })
    );
  }

  loadApartments(cityId: CityTypesFilter): Observable<boolean> {
    return this.facade.getApartments(cityId).pipe(switchMap(() => of(true)));
  }
}
