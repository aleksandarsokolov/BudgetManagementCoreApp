import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IBill, Bill, IResponse } from '../bills/bill';


@Injectable({
  providedIn: 'root'
})
export class BillService {
    private billsUrl = '/api/products/bills.json';
    private baseUrl;

    constructor(private http: HttpClient, @Inject('BASE_URL') appUrl: string) {
        this.baseUrl = appUrl + '/api/';
    }

    getBills(): Observable<IBill[]> {
        return this.http.get<IBill[]>(this.baseUrl + 'Bill/GetBills').pipe(
            catchError(this.handleError)
        );
    }

    saveBill(b: Bill) {
        const bill = JSON.stringify(b);
        const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<IResponse>(this.baseUrl + 'Bill/SaveBill', bill, {
            headers: headerOptions
        }).pipe(
            catchError(this.handleError)
            );
    }

    deleteBill(b: number) {
        const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<IResponse>(this.baseUrl + 'Bill/DeleteBill', JSON.stringify(b), {
            headers: headerOptions
        }).pipe(
            catchError(this.handleError)
        );

    }


  private handleError(err: HttpErrorResponse){
      // in a real world app, we may send the server to some remote logging infrastructure
      // instead of just logging it to the console
      let errorMessage = '';
      if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
      } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      }
      console.error(errorMessage);
      return throwError(errorMessage);
      
    }
}