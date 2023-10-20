import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// models
import { CityTypesFilter } from '../../models';

// config
import { All_Cities } from '../../config';

@Component({
  selector: 'app-apartment-count-preview',
  templateUrl: './apartment-count-preview.component.html',
  styleUrls: ['./apartment-count-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentCountPreviewComponent {
  @Input() city: CityTypesFilter;
  @Input() apartmentCount: number = 0;
  @Input() statistic: number;
  @Input() showLocation: boolean = false;

  get isCity() {
    return this.city !== All_Cities;
  }
}
