import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { MockComponent, MockModule, MockPipe } from 'ng-mocks';

import { App_Route, nav_List } from '../../config';

import { NavItemComponent } from './nav-item.component';
import { MaterialCoreModule } from '../../../shared/functional/material-core/material-core.module';
import { MatIcon } from '@angular/material/icon';

@Component({ template: '' })
export class DummyComponent {}

describe('NavItemComponent', () => {
  let component: NavItemComponent;
  let fixture: ComponentFixture<NavItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavItemComponent, MockPipe(TranslatePipe), MockComponent(MatIcon)],
      imports: [MockModule(MaterialCoreModule), RouterTestingModule, NoopAnimationsModule],
      providers: [provideRouter([{ path: 'apartment/list', component: DummyComponent }])],
    })
      .overrideComponent(NavItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavItemComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    const [{ hint, name, route }] = nav_List;
    component.hint = hint;
    component.name = name;
    component.routerLink = route;
  });

  it('should render property binding inputs', () => {
    fixture.detectChanges();

    const navItemNameElem = fixture.debugElement.query(By.css('[data-test-id="nav-item-name"]'));
    const navItemHintElem = fixture.debugElement.query(By.css('[data-test-id="nav-item-hint"]'));

    expect(navItemNameElem.nativeElement.innerHTML).toEqual('translated:i18n.core.pageName.menuApartment.label');
    expect(navItemHintElem.nativeElement.innerHTML).toEqual('translated:i18n.core.pageName.menuApartment.hint');
  });

  it('should emit toggle event on its output when the navigation item is clicked', () => {
    spyOn(component.toggle, 'emit');
    fixture.detectChanges();

    const navItemElem = fixture.debugElement.query(By.css('[data-test-id="nav-item-link"]'));
    navItemElem.nativeElement.click();

    expect(navItemElem.attributes['href']).toEqual(App_Route.apartment_List);
    expect(component.toggle.emit).toHaveBeenCalled();
  });
});
