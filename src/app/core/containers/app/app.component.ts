import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

// service
import { AppFacadeService } from '../../facades/app-facade.service';

// models
import { NavItem } from '../../models';
import { LanguageSelection } from '../../../shared/functional/translation/models';

// config
import { Icons, nav_List } from '../../config';
import { Language_Selection_Collection } from '../../../shared/functional/translation/config';

// rxjs
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  loading$: Observable<boolean>;
  isOpened$: Observable<boolean>;
  sidenavMode$: Observable<MatDrawerMode>;
  currentLanguage$: Observable<LanguageSelection>;

  readonly icons = Icons;
  readonly navList: NavItem[] = nav_List;
  readonly languageCollection: LanguageSelection[] = Language_Selection_Collection;

  ngOnInit() {
    this.loading$ = this.appFacade.loading$;
    this.isOpened$ = this.appFacade.isOpened$;
    this.sidenavMode$ = this.appFacade.sidenavMode$;
    this.currentLanguage$ = this.appFacade.currentLanguage$;

    this.appFacade.onLangChange$.pipe(filter(() => !!this.document)).subscribe((language: string) => {
      this.document.documentElement.lang = language;
    });
  }

  selectLanguage(selectedLang: LanguageSelection) {
    this.appFacade.selectLanguage(selectedLang);
  }

  constructor(private appFacade: AppFacadeService, @Inject(DOCUMENT) private document: Document) {}
}
