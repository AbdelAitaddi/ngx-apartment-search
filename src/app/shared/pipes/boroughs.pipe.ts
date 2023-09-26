import { Pipe, PipeTransform } from '@angular/core';

// models
import { Apartment } from '../../features/apartments/models';

@Pipe({ name: 'byBoroughs' })
export class BoroughsPipe implements PipeTransform {

  transform(apartments: Apartment[], boroughs: string | null) {
    return boroughs?.length
      ? apartments.filter(apartment => boroughs.includes(apartment.address.borough))
      : apartments
    ;
  }

}
