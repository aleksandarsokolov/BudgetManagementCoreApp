import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-icons',
  templateUrl: './convert-to-icon.component.html',
  styleUrls: ['./convert-to-icon.component.css']
})
export class ConvertToIconComponent implements OnInit {
  icons: string[] = ["fa-star"];
  @Input() types!: string[];

  constructor() { }

  ngOnInit() {
    this.icons = ["home","attach_money"];
  }

}
