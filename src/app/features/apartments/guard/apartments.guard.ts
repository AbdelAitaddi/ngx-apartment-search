import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// models
import { Apartment } from '../models';

// services
import { ApartmentFacadeService } from '../facades';

// rxjs
import { of, Observable, EMPTY } from 'rxjs';
import { switchMap, catchError, take, tap, filter } from 'rxjs/operators';
import { App_Route } from '../../../core/models';

@Injectable({
  providedIn: 'root',
})
export class ApartmentsGuard implements CanActivate {
  constructor(private facade: ApartmentFacadeService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore() {
    return this.facade.loaded$.pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.loadApartments().subscribe();
        }
      }),
      filter(Boolean),
      take(1)
    );
  }

  loadApartments(): Observable<Apartment[]> {
    return this.facade.getApartments().pipe(
      catchError(() => {
        this.router.navigate([App_Route.about]).then();
        return EMPTY;
      })
    );
  }
}
