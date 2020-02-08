import { Component, OnInit } from '@angular/core';

import { Ikeys } from './interface/sideBar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  keys: Ikeys;

  ngOnInit() {
    this.keys = [
      '1',
      '2,',
      '3,',
      '4',
      '5',
      '6',
      '8',
      '7',
      '9',
      '0',
      '10',
      '12',
      '1',
      '2,',
      '3,',
      '4',
      '5',
      '6',
      '8',
      '7',
      '9',
      '0',
      '10',
      '1112',
    ];
  }
  handleItem(item: string) {
    console.log('xxxxx', item, 'xxx');
  }

  handleDemo() {
    console.log('super man');
  }
}
