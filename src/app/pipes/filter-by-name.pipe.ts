import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../interfaces/customer';

@Pipe({
  name: 'filterByName',
  standalone: true
})
export class FilterByNamePipe implements PipeTransform {

  transform(customers: Customer[],str:string): Customer[] {
    return customers.filter(
      customer =>customer.name?.toLocaleLowerCase().includes(str.toLowerCase()) 
    );
  }

}
