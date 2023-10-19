import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// models
import { Apartment } from '../../models';

// config
import { App_Route, Icons } from '../../../../core/config';

@Component({
  selector: 'app-apartment-preview',
  templateUrl: './apartment-preview.component.html',
  styleUrls: ['./apartment-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentPreviewComponent {
  @Input() apartment: Apartment;
  @Input() isFavourite: boolean = false;

  apartmentDetailRoute = App_Route.apartment_detail;
  Icon_list = Icons;

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
}
