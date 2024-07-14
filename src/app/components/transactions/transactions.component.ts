import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Customer } from '../../interfaces/customer';
import { Transaction } from '../../interfaces/transaction';
import { FilterByNamePipe } from '../../pipes/filter-by-name.pipe';
import { FilterByTransactionAmountPipe } from '../../pipes/filter-by-transaction-amount.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule,FormsModule,FilterByNamePipe,FilterByTransactionAmountPipe],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit{

  nameSearchKey:string="";
  transactionSearchKey:number|null=null;
  customers:Customer[]=[];
  transactions:Transaction[] = [];

  constructor(private _data:DataService){}

   ngOnInit() {
       this._data.getAllCustomers().subscribe({
        next:(res)=>{
          this.customers=res;
        },
        error:(err)=>{
          console.log(err);
        }
        
      });

       this._data.getAllTransactions().subscribe({
        next:(res)=>{
          this.transactions=res;
           this.customers.forEach(customer => {
            customer.transactions = [];
            this.transactions.forEach(transaction =>{
              if(customer.id == transaction.customer_id){
                customer.transactions.push(transaction);
              }
            })
          });
          console.log(this.customers);
          
        },
        error:(err)=>{
          console.log(err);
        }
        
      });
  }

}
