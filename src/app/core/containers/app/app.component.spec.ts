import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatDrawerMode } from '@angular/material/sidenav';

import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';

import { MaterialCoreModule } from '../../../shared/functional/material-core/material-core.module';
import { AppFacadeService } from '../../facades/app-facade.service';
import { AppComponent } from './app.component';
import { LanguageSelectionComponent, NavItemComponent } from '../../components';

import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Locale } from '../../../shared/functional/translation/config';

interface ViewModel {
  loading: boolean;
  isOpened: boolean;
  sidenavMode: MatDrawerMode;
  currentLanguage: { code: string; value: string };
  onLangChange: string | null;
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let document: jasmine.SpyObj<Document>;
  let facade: jasmine.SpyObj<AppFacadeService>;

  let viewModel$: BehaviorSubject<ViewModel>;

  beforeEach(() => {
    viewModel$ = new BehaviorSubject<ViewModel>({
      loading: false,
      isOpened: false,
      sidenavMode: 'over',
      currentLanguage: { code: Locale.EN, value: 'i18n.core.vocabulary.english' },
      onLangChange: null,
    });
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MaterialCoreModule, RouterModule, NoopAnimationsModule],
      declarations: [
        AppComponent,
        MockPipe(TranslatePipe),
        MockComponent(MatIcon),
        MockComponent(LanguageSelectionComponent),
        ,
        MockComponent(NavItemComponent),
      ],
      providers: [
        MockProvider(ActivatedRoute),
        {
          provide: Document,
          useValue: {
            documentElement: { lang: Locale.EN },
          },
        },
        {
          provide: AppFacadeService,
          useValue: {
            ...jasmine.createSpyObj(AppFacadeService, ['selectLanguage']),
            loading$: viewModel$.pipe(map((vm) => vm.loading)),
            isOpened$: viewModel$.pipe(map((vm) => vm.isOpened)),
            sidenavMode$: viewModel$.pipe(map((vm) => vm.sidenavMode)),
            currentLanguage$: viewModel$.pipe(map((vm) => vm.currentLanguage)),
            onLangChange$: viewModel$.pipe(map((vm) => vm.onLangChange)),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    document = TestBed.inject(Document) as jasmine.SpyObj<Document>;
    facade = TestBed.inject(AppFacadeService) as jasmine.SpyObj<AppFacadeService>;
    fixture.detectChanges();
  });

  afterEach(() => {
    viewModel$.complete();
  });

  it('should initialize component properties after onInit', waitForAsync(() => {
    fixture.detectChanges();

    component.loading$.pipe(take(1)).subscribe((loading) => expect(loading).toBeFalsy());
    component.isOpened$.pipe(take(1)).subscribe((isOpened) => expect(isOpened).toBeFalsy());
    component.sidenavMode$.pipe(take(1)).subscribe((sidenavMode) => expect(sidenavMode).toEqual('over'));
    component.currentLanguage$
      .pipe(take(1))
      .subscribe((currentLanguage) =>
        expect(currentLanguage).toEqual({ code: Locale.EN, value: 'i18n.core.vocabulary.english' })
      );

    expect(document.documentElement.lang).toEqual(Locale.EN);
  }));

  it('should select language', waitForAsync(() => {
    const selectedLang = { code: Locale.FR, value: 'i18n.core.vocabulary.french' };
    fixture.detectChanges();

    component.selectLanguage(selectedLang);

    expect(facade.selectLanguage).toHaveBeenCalledWith(selectedLang);
  }));
});
