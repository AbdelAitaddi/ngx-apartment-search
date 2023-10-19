import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// models
import { Apartment, CityTypesFilter, Statistics } from '../../models';
import { All_Cities } from '../../config';

@Component({
  selector: 'app-apartment-preview-list',
  templateUrl: './apartment-preview-list.component.html',
  styleUrls: ['./apartment-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentPreviewListComponent {
  @Input() city: CityTypesFilter;
  @Input() favouritesIds: string[];
  @Input() apartments: Apartment[] = [];
  @Input() statistics: Statistics;
  @Input() allDataLoaded: boolean = false;
  @Input() showLocation: boolean = false;

  get isCity() {
    return this.city !== All_Cities;
  }

  isFavourite(apartment: Apartment): boolean {
    return this.favouritesIds.includes(apartment.id!);
  }
}
