import { Component, OnInit } from '@angular/core';

import { Ikeys } from './interface/sideBar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  constructor() {}
  keys: Ikeys;
  dbs: string[];
  selectedValue: string;

  ngOnInit() {
    this.selectedValue = '0';
    this.keys = ['1', '2,', '3,', '4', '5', '6'];
    this.dbs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  }
  handleItem(item: string) {
    console.log('xxxxx', item, 'xxx');
  }
}
