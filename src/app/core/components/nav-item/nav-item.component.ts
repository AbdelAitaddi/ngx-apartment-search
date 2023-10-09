import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

// models
import { AppRouteTypes } from '../../models';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  @Input() hint = '';
  @Input() name = '';
  @Input() icon = '';
  @Input() routerLink: AppRouteTypes = '/';
  @Output() toggle = new EventEmitter();
}
