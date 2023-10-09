import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormControl } from '@angular/forms';

// models
import { All_Cities, CityTypes, CityTypesFilter } from '../../models';

// rxjs
import { distinctUntilChanged } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-apartment-filter',
  templateUrl: './apartment-filter.component.html',
  styleUrls: ['./apartment-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentFilterComponent implements OnInit {
  @Input() set selectedCity(city: CityTypesFilter) {
    this.cityControl.setValue(city, { emitEvent: false });
  }
  @Input() set selectedBorough(borough: string | typeof All_Cities) {
    this.boroughControl.setValue(borough, { emitEvent: false });
  }
  @Input() boroughs: string[] = [];
  @Input() cities: CityTypes[] = [];
  @Output() boroughSelected = new EventEmitter<string | typeof All_Cities>();
  @Output() citySelected = new EventEmitter<CityTypesFilter>();

  private fb = new FormBuilder();

  form = this.fb.group({
    city: All_Cities,
    borough: All_Cities,
  });

  ngOnInit() {
    this.cityControl.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((selectedCity) => this.citySelected.emit(selectedCity));

    this.boroughControl.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((value) => this.boroughSelected.emit(value));
  }

  get cityControl() {
    return this.form.get('city') as FormControl;
  }

  get boroughControl() {
    return this.form.get('borough') as FormControl;
  }
}
