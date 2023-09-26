import { Injectable } from '@angular/core';

// models
import { ApartmentsState } from './apartments.state';

// services
import {Store} from "./store.service";

// Initial state
const initialState: ApartmentsState = {
  apartments: [],
  selectedApartment: null,
  favourites: [],
  selectedBorough: null,
  searchTerm: '',
  loaded: false,
  loading: false
};

@Injectable({
  providedIn: 'root',
})
export class ApartmentsStore extends Store<ApartmentsState> {
  constructor() {
    super(initialState);
  }
}
