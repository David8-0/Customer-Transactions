import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Customer } from '../../interfaces/customer';
import { Transaction } from '../../interfaces/transaction';
import { FilterByNamePipe } from '../../pipes/filter-by-name.pipe';
import { FilterByTransactionAmountPipe } from '../../pipes/filter-by-transaction-amount.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from '../chart/chart.component';
import { LocalDataService } from '../../services/local-data.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule,FormsModule,FilterByNamePipe,FilterByTransactionAmountPipe,ChartComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit{

  nameSearchKey:string="";
  transactionSearchKey:number|null=null;
  customers:Customer[]=[];
  transactions:Transaction[] = [];
  selectedCustomer:Customer= {} as Customer;
  constructor(private _data:DataService,private _local:LocalDataService){}

   ngOnInit() {
       this._data.getAllCustomers().subscribe({
        next:(res)=>{
          this.customers=res;
        },
        error:(err)=>{
          this.customers = this._local.getAllCustomers();
        }
        
      });

       this._data.getAllTransactions().subscribe({
        next:(res)=>{
          this.transactions=res;
          this.customers.forEach(customer => {
            customer.transactions = [];
            this.transactions.forEach(transaction =>{
              if(customer.id == transaction.customer_id && customer.transactions){
                customer.transactions.push(transaction);
              }
            })
          });
        },
        error:(err)=>{
          this.transactions=this._local.getAllTransactions();
          this.customers.forEach(customer => {
            customer.transactions = [];
            this.transactions.forEach(transaction =>{
              if(customer.id == transaction.customer_id && customer.transactions){
                customer.transactions.push(transaction);
              }
            })
          });
        },
        complete:()=>{
          
          
         
        }
        
      });
  }

  selectCustomer(customer:Customer){
    this.selectedCustomer=customer;
  }
}
