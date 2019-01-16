import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Totals } from './totals';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-show-totals',
  templateUrl: './show-totals.component.html',
  styleUrls: ['./show-totals.component.css']
})
export class ShowTotalsComponent implements OnInit {
  priceTotals: Totals[] = [];
  @Input() totals: Totals[];
  constructor() { }

  ngOnInit() {
    // console.log("Totals on init " + JSON.stringify(this.totals));
    this.priceTotals = this.totals;
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log("Totals on change " + JSON.stringify(this.totals));
    this.priceTotals = this.totals;
  }
}
