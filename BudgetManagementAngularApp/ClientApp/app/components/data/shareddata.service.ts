import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    firstDate: Date;
    lastDate: Date;
}