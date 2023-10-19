import { ChangeDetectionStrategy, Component } from '@angular/core';

// config
import { App_Route } from '../../config';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  apartmentListRoute = App_Route.apartment_List;
}
