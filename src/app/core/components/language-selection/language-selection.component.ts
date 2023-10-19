import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

// models
import { LanguageSelection } from '../../../shared/functional/translation/models';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSelectionComponent {
  @Input() currentLanguage: LanguageSelection;
  @Input() languages: LanguageSelection[] = [];
  @Output() selectLanguage = new EventEmitter<LanguageSelection>();
}
