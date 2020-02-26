import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../enum/constants.enum';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private service: DashboardService, readonly message: NzMessageService) {}
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
    this.handleGetKeys();
    this.selectedValue = '0';
    this.dbs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  }

  handleItem(key: string) {
    this.redisKey = key;
    this.service.handleKeyOfDetail(key).subscribe(val => {
      if (val.statusCode === 200) {
        this.content = val.data;
      }
    });
    this.service.handleKeyOfTtl(key).subscribe(val => {
      if (val.statusCode === 200) {
        this.redisTtl = val.data;
      }
    });
  }

  handleGetKeys() {
    return this.service.handleKeys().subscribe(val => {
      if (val.statusCode === 200) {
        this.keys = val.data;
        this.redisKey = val.data ? val.data[0] : '';
        this.handleItem(this.redisKey);
      }
    });
  }

  handleRenameOfKey() {}

  handleDelete(key: string) {
    return this.service.handleDelete(key).subscribe(val => {
      if (val.statusCode === 200 && val.data) {
        this.handleGetKeys();
        return this.message.success(`${key} 删除成功!`);
      }
    });
  }

  handleLogout() {
    sessionStorage.clear();
    this.handleRedirectLogin();
  }

  handleRedirectLogin() {
    this.router.navigateByUrl(Constants.UNLOGIN_FAILED_REDIRECT_URL);
  }
}
