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
    private baseUrl;

    constructor(private http: HttpClient, @Inject('BASE_URL') appUrl: string) {
        this.baseUrl = appUrl + '/api/';
    }

    getBills(startDate: Date, endDate: Date): Observable<IBill[]> {
        const begin = ((startDate.getTime() * 10000) + 621355968000000000);
        const end = ((endDate.getTime() * 10000) + 621355968000000000);

        const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        let params = new HttpParams().set("startDate", JSON.stringify(begin)).set("endDate", JSON.stringify(end)); 

        return this.http.get<IBill[]>(this.baseUrl + 'Bill/GetBills', {
            params: params
        }).pipe(
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

    getBillByID(id: number): Observable<IBill> {
        const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
        let params = new HttpParams().set("billid", JSON.stringify(id)); //Create new HttpParams

        return this.http.get<IBill>(this.baseUrl + 'Bill/GetBillByID', {
            params: params
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