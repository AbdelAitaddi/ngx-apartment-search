import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

// config
import { BROWSER_LOCATION } from '../../../app.config';

@Component({
  templateUrl: './app-unavailable.component.html',
  styleUrls: ['./app-unavailable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppUnavailableComponent {
  constructor(@Inject(BROWSER_LOCATION) private location: Location) {}

  reload() {
    this.location.reload();
  }
}
