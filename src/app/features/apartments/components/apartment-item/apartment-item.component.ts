import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

// models
import { Apartment } from '../../models';
import { Icon_list } from '../../../../core/services/icon.service';

@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentItemComponent {
  @Input() apartment: Apartment;
  @Input() selected: boolean = false;
  @Output() save = new EventEmitter<string>();
  @Output() remove = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();

  Icon_list = Icon_list;

  get apartmentAddress() {
    const {
      address: { streetName, houseNumber, postalCode, city },
    } = this.apartment;
    return `${streetName} ${houseNumber} ${postalCode} ${city}`;
  }

  get totalPrice() {
    const {
      details: {
        rent: { totalRent },
      },
      localization: { currency },
    } = this.apartment;
    return `${totalRent} ${currency}`;
  }

  get rentDetailInfo() {
    const {
      details: {
        rent: { baseRent, operationalCosts },
      },
    } = this.apartment;
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
