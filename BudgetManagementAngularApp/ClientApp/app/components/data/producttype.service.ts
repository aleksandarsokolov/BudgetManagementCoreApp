import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IProduct } from '../products/product';
import { Product, IResponse, IProductType } from '../bills/bill';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {
  private productUrl = 'api/producttypes/products.json';
    private productTypeUrl = 'api/producttypes/productTypes.json';

    private baseUrl;

    constructor(private http: HttpClient, @Inject('BASE_URL') appUrl: string) {
        this.baseUrl = appUrl + '/api/';
    }


    getProductTypes(): Observable<IProductType[]> {
        return this.http.get<IProductType[]>(this.baseUrl + 'ProductType/GetProductTypes').pipe(
            catchError(this.handleError)
        );
    }
    

    private handleError(err: HttpErrorResponse) {
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
