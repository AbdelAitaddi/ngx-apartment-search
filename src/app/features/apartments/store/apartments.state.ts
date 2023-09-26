import { Apartment } from '../models';
import {CityTypes} from "../models/city.model";

export interface ApartmentsState {
  apartments: Apartment[];
  selectedApartment: Apartment | null;
  favourites: string[],
  selectedBorough: CityTypes | null;
  searchTerm: string | null;
  loaded: boolean;
  loading: boolean;
}
