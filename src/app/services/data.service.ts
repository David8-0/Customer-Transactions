import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Customer } from '../interfaces/customer';
import { Transaction } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseURL:string=`http://localhost:3000/`;
  constructor(private _http:HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this._http.get<Customer[]>(`${this.baseURL}customers`);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this._http.get<Transaction[]>(`${this.baseURL}transactions`);
  }
}
