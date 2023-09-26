import {ChangeDetectionStrategy, Component, HostListener, ViewChild} from '@angular/core';
import {GlobalLoadingIndicatorService} from "../../services";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent  {
  loading$ = this.loadingIndicatorService.loading$;

  constructor(
    private loadingIndicatorService: GlobalLoadingIndicatorService
  ) {}

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  readonly navList = [
    {route: '/home', name: 'Home', icon: 'home', hint: 'view app description'},
    {route: '/apartment/list', name: 'Apartments', icon: 'real_estate_agent', hint: 'find your next flat'},
    {route: '/apartment/favourites', name: 'My Favourites', icon: 'favorite',  hint: 'view you favourites'}
  ];

  opened = false;

  ngOnInit() {
    this.opened = window.innerWidth < 992;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.opened = !((event?.target as Window).innerWidth < 768);
  }

  isBiggerScreen() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return Boolean(width < 992);
  }

}
