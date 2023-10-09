import { ChangeDetectionStrategy, Component } from '@angular/core';

// models
import { App_Route } from '../../models';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  apartmentListRoute = App_Route.apartment_List;
}
