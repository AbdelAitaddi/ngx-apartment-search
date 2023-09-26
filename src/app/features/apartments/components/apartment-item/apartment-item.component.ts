import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';


// models
import { Apartment } from '../../models';

@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ApartmentItemComponent {
  @Input() apartment: Apartment;
  @Input() selected: boolean;
  @Output() save = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();


  get apartmentAddress() {
    const { address: { streetName, houseNumber, postalCode, city } } = this.apartment;
    return `${streetName} ${houseNumber} ${postalCode} ${city}`;
  }

  get totalPrice() {
    const { details: { rent: {totalRent} }, localization: { currency }} = this.apartment;
    return `${totalRent} ${currency}`;
  }

  get rentDetailInfo() {
    const { details: { rent: {baseRent, operationalCosts} } } = this.apartment;
    return `baseRent: ${baseRent} +  operational Costs: ${operationalCosts}`;
  }

  toggleFavourite(apartmentId: string) {
    if (this.selected) {
      this.remove.emit(apartmentId);
    } else {
      this.save.emit(apartmentId);
    }

  }

}
