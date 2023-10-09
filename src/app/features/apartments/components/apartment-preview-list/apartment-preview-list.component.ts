import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

// models
import { Apartment } from '../../models';

@Component({
  selector: 'app-apartment-preview-list',
  templateUrl: './apartment-preview-list.component.html',
  styleUrls: ['./apartment-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentPreviewListComponent {
  @Input() apartments: Apartment[];
  @Input() favourites: string[];
}
