import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

// service
import { GlobalLoadingIndicatorService } from '../../services';

// components

// models
import { nav_List, NavItem } from '../../models';

// rxjs
import { Observable } from 'rxjs';
import { Icon_list, IconTypes } from '../../services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;

  readonly navList: NavItem[] = nav_List;
  readonly locationCityIcon: IconTypes = Icon_list.locationCity;

  loading$: Observable<boolean>;
  opened = false;

  constructor(private loadingIndicatorService: GlobalLoadingIndicatorService) {}

  ngOnInit() {
    this.loading$ = this.loadingIndicatorService.loading$;
    this.opened = window.innerWidth < 768;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.opened = !((event?.target as Window).innerWidth < 768);
  }

  get isBiggerScreen(): 'over' | 'side' {
    return Boolean((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 992)
      ? 'over'
      : 'side';
  }
}
