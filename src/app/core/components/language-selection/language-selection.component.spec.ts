import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { MockModule, MockPipe } from 'ng-mocks';

import { MaterialCoreModule } from '../../../shared/functional/material-core/material-core.module';
import { LanguageSelectionComponent } from './language-selection.component';
import { Language_Selection_Collection } from '../../../shared/functional/translation/config';

describe('NavItemComponent', () => {
  let component: LanguageSelectionComponent;
  let fixture: ComponentFixture<LanguageSelectionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(MaterialCoreModule), NoopAnimationsModule],
      declarations: [LanguageSelectionComponent, MockPipe(TranslatePipe)],
    })
      .overrideComponent(LanguageSelectionComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelectionComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    const [language] = Language_Selection_Collection;
    component.currentLanguage = language;
    component.languages = Language_Selection_Collection.slice();
  });

  it('should display current language', () => {
    fixture.detectChanges();
    const currentLanguage = fixture.debugElement.query(By.css('[data-test-id="current-language"]'));
    expect(currentLanguage.nativeElement.innerHTML).toEqual('translated:i18n.core.vocabulary.english');
  });

  it('should display language selection menu', () => {
    fixture.detectChanges();
    const menuItems = fixture.debugElement.queryAll(By.css('[data-test-id="language-menu-item"]'));
    expect(menuItems.length).toEqual(3);
  });

  it('should emit selected language event on its output when change language is clicked', () => {
    spyOn(component.selectLanguage, 'emit');
    fixture.detectChanges();

    const [firstMenuItem] = fixture.debugElement.queryAll(By.css('[data-test-id="language-menu-item"]'));
    firstMenuItem.nativeElement.click();

    expect(firstMenuItem.attributes['class']).toContain('active');
    expect(firstMenuItem.nativeElement.innerHTML.trim()).toEqual('translated:i18n.core.vocabulary.english');
    expect(component.selectLanguage.emit).toHaveBeenCalledWith(Language_Selection_Collection[0]);
  });
});
