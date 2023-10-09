import { Injectable } from '@angular/core';

// services
import { Store } from './store.service';

// models
import { All_Cities } from '../models';
import { ApartmentsState } from './apartments.state';

// Initial state
const initialState: ApartmentsState = {
  apartments: [],
  favourites: [],
  selectedApartment: null,
  selectedBorough: All_Cities,
  selectedCity: All_Cities,
  loaded: false,
  loading: false,
};

@Injectable({
  providedIn: 'root',
})
export class ApartmentsStore extends Store<ApartmentsState> {
  constructor() {
    super(initialState);
  }
}
