import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {CityTypes} from "../../models/city.model";

@Component({
  selector: 'app-apartment-preview-list',
  templateUrl: './apartment-preview-list.component.html',
  styleUrls: ['./apartment-preview-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentPreviewListComponent {
  @Input() apartments: any;
  @Input() city: string | null;
  @Input() favourites: string[];
  @Input() selectedBorough: CityTypes | null;
}
