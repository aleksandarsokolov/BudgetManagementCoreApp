import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IProduct } from '../products/product';
import { Product, IResponse, IProductType } from '../bills/bill';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';
    private productTypeUrl = 'api/products/productTypes.json';

    private baseUrl;

    constructor(private http: HttpClient, @Inject('BASE_URL') appUrl: string) {
        this.baseUrl = appUrl + '/api/';
    }
    
    getProductsByID(id: number): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }


    getProductTypes(): Observable<IProductType[]> {
        return this.http.get<IProductType[]>(this.baseUrl + 'Product/GetProductTypes').pipe(
            catchError(this.handleError)
        );
    }

    getProductBrands(): Observable<string[]> {
        return this.http.get<string[]>(this.baseUrl + 'Product/GetProductBrands').pipe(
            catchError(this.handleError)
        );
    }

    getProductsByBillID(id: number): Observable<IProduct[]> {
        console.log('BillID: ' + id);
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            map((data: any) => {
                const results: IProduct[] = [];
                data.map((item: any) => {
                    if (item.billId == id) {
                        results.push(item);
                    }
                });
                return results;
            }),
            catchError(this.handleError)
        )
    }


    saveProduct(p: Product) {
        const prod = JSON.stringify(p);
        const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<IResponse>(this.baseUrl + 'Product/SaveProduct', prod, {
            headers: headerOptions
        }).pipe(
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
