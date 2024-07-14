import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../interfaces/customer';

@Pipe({
  name: 'filterByTransactionAmount',
  standalone: true
})
export class FilterByTransactionAmountPipe implements PipeTransform {

  transform(customers: Customer[],amount:number|null): Customer[] {
    if(!amount) return customers;
    let res:Customer[] = [];
    for(let i=0;i<customers.length;i++){
      let flag = true;
      for(let j=0;j<customers[i].transactions.length && flag;j++){
        if(customers[i].transactions[j].amount == amount){
          res.push(customers[i]);
          flag = false;
        }
      }
    }
    return res;
  }

}
