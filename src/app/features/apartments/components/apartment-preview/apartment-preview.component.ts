import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


// models
import { Apartment } from '../../models';

@Component({
  selector: 'app-apartment-preview',
  templateUrl: './apartment-preview.component.html',
  styleUrls: ['./apartment-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentPreviewComponent {
  @Input() apartment: Apartment;
  @Input() favourites: string[];
  @Input() searchText: string | null;

  get apartmentAddress() {
    const { address: { streetName, houseNumber, postalCode, city } } = this.apartment;
    return `${streetName} ${houseNumber} ${postalCode} ${city}`;
  }

  get totalPrice() {
    const { details: { rent: {totalRent} }, localization: { currency }} = this.apartment;
    return `${totalRent} ${currency}`;
  }

  get isFavourite(): boolean {
    return this.favourites.includes(this.apartment.id!);
  }
}
