import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {FormBuilder, FormControl} from '@angular/forms';

// models
import {Cities, CityTypes} from "../../models/city.model";

// rxjs
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';



@UntilDestroy()
@Component({
  selector: 'app-apartment-filter',
  templateUrl: './apartment-filter.component.html',
  styleUrls: ['./apartment-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApartmentFilterComponent implements OnInit, OnDestroy {
  @Output() selectBoroughs = new EventEmitter<CityTypes | null>();
  @Output() search = new EventEmitter<string>();
  @Input() boroughsCollection: { id: number, text: string }[];
  @Input() set searchTerm(term: string) {
    this.searchControl.setValue(term, { emitEvent: false});
    this.boroughsControl.setValue('', { emitEvent: true});
  };

  cities: { id: string, text: string }[] = Object
    .keys(Cities)
    .reduce((cities, city) => ([
      ...cities,
      { id: city, text: city }
    ]), [] as { id: string, text: string }[]);

  form = this.fb.group({
    search: [''],
    boroughs: [''],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.searchControl
      .valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe(searchTerm => this.search.emit(searchTerm));

      this.boroughsControl
        .valueChanges
        .pipe(
          untilDestroyed(this),
        )
        .subscribe(value => this.selectBoroughs.emit(value));
  }

  get searchControl() {
    return this.form.get('search') as FormControl;
  }

  get boroughsControl() {
    return this.form.get('boroughs') as FormControl;
  }

  ngOnDestroy() {
  }
}
