import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../enum/constants.enum';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private service: DashboardService) {}
  dbs: string[];
  keys: string[];
  content: string;
  selectedValue: string;

  @Input() redisKey: string;
  @Input() redisTtl: number;

  ngOnInit() {
    if (sessionStorage.getItem(Constants.LOGIN_SUCCESS) !== 'true') {
      return this.handleRedirectLogin();
    }
    this.redisKey = '11';
    this.redisTtl = 1000;
    this.handleGetKeys();
    this.selectedValue = '0';
    this.dbs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  }

  handleItem(key: string) {
    console.log(key);
  }

  handleGetKeys() {
    this.service.handleKeys().subscribe(keys => (this.keys = keys));
  }

  handleRedirectLogin() {
    this.router.navigateByUrl(Constants.UNLOGIN_FAILED_REDIRECT_URL);
  }
}
