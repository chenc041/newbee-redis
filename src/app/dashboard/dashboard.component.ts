import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../constants/constants.enum';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private service: DashboardService, readonly message: NzMessageService) {}
  dbs: string[];
  keys: string[];
  content: string;
  userName: string;
  isVisible = false;
  selectedDb: string;
  modalTitle: '重置ttl' | '重命名' | '新增';
  operatorType: 'rename' | 'resetTtl' | 'add';

  @Input() redisTtl = 0;
  @Input() newKey: string;
  @Input() redisKey: string;
  @Input() expireTime: number;
  @Input() redisValue: string;

  ngOnInit() {
    if (sessionStorage.getItem(Constants.LOGIN_SUCCESS) !== 'true') {
      return this.handleRedirectLogin();
    }
    this.handleGetKeys();
    this.selectedDb = '0';
    this.userName = sessionStorage.getItem(Constants.LOGIN_USER_NAME);
    this.dbs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  }

  ngOnDestroy() {
    sessionStorage.removeItem(Constants.LOGIN_SUCCESS);
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
    this.service.handleKeys().subscribe(
      val => {
        if (val.statusCode === 200) {
          this.keys = val.data;
          if (val.data.length) {
            this.redisKey = val.data ? val.data[0] : '';
            this.handleItem(this.redisKey);
          }
        }
        console.log(val, '=====');
        if (val.statusCode === 401) {
          this.message.error('暂无权限, 请登录重试');
        }
      },
      error => console.log(error.error.statusCode, '======')
    );
  }

  handleRenameOfKey() {
    this.isVisible = true;
    this.modalTitle = '重命名';
    this.operatorType = 'rename';
  }

  handleResetTtl() {
    this.isVisible = true;
    this.modalTitle = '重置ttl';
    this.operatorType = 'resetTtl';
  }

  hanldeRefresh() {
    this.operatorType = 'resetTtl';
  }

  handleAddKey() {
    this.isVisible = true;
    this.modalTitle = '新增';
    this.operatorType = 'add';
  }

  handleDelete(key: string) {
    if (!key) {
      return this.message.error('暂无可删除 key');
    }
    this.service.handleDelete(key).subscribe(val => {
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

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
    const { newKey, expireTime, redisValue, operatorType, redisKey } = this;
    if ('add' === operatorType) {
      return this.service.handleSetKey(newKey, redisValue, expireTime).subscribe(val => {
        if (val.statusCode === 200 && val.data) {
          this.handleGetKeys();
          return this.message.success(`key ${newKey} 新增成功!`);
        } else {
          return this.message.error(`key ${newKey} 新增失败!`);
        }
      });
    }
    if ('resetTtl' === operatorType) {
      return this.service.handleResetTtlOfKey(redisKey, expireTime).subscribe(val => {
        if (val.statusCode === 200 && val.data) {
          this.handleGetKeys();
          return this.message.success(`key ${redisKey} 过期时间重置成功!`);
        } else {
          return this.message.error(`key ${redisKey} 过期时间重置失败!`);
        }
      });
    }
    if ('rename' === operatorType) {
      return this.service.handleRename(redisKey, newKey).subscribe(val => {
        if (val.statusCode === 200) {
          this.handleGetKeys();
          return this.message.success(`key ${redisKey} 重命名成功!`);
        } else {
          return this.message.error(`key ${redisKey} 重命名失败!`);
        }
      });
    }
  }
}
