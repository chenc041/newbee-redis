import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../constants/constants.enum';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DashboardService } from './dashboard.service';
import { StoreService } from '../services/store.service';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { OperateType, ModalTitle } from '../types/index.interface';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private readonly router: Router,
    private readonly store: StoreService,
    private readonly service: DashboardService,
    private readonly message: NzMessageService
  ) {}
  keys: string[];
  content: string;
  userName: string;
  isVisible = false;
  selectedDb: number;
  backUpKeys: string[];
  searchText$ = new Subject<string>();
  modalTitle: ModalTitle;
  operatorType: OperateType;

  @Input() redisTtl = 0;
  @Input() newKey: string;
  @Input() redisKey: string;
  @Input() expireTime: string;
  @Input() redisValue: string;

  ngOnInit() {
    if (!sessionStorage.getItem(Constants.USER_TOKEN)) {
      return this.handleRedirectLogin();
    }
    this.searchText$
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((value) => {
          let results: string[] = [];
          if (value) {
            results = this.keys.filter((key) => key.includes(value));
          } else {
            results = this.backUpKeys;
          }
          return of(results);
        })
      )
      .subscribe((val) => (this.keys = val));
    this.handleGetKeys();
    this.handleCurrentUser();
  }

  ngOnDestroy() {
    sessionStorage.removeItem(Constants.USER_TOKEN);
  }

  handleSearchValue(value: string) {
    this.searchText$.next(value);
  }

  handleItem(key: string) {
    this.redisKey = key;
    this.service.handleKeyOfDetail(key).subscribe((val) => {
      if (val.statusCode === 200) {
        this.content = val.data;
      }
    });
    this.handleKeyOfTtl(key);
  }

  handleGetKeys() {
    this.service.handleKeys().subscribe((val) => {
      if (val.statusCode === 200) {
        this.keys = val.data;
        this.backUpKeys = val.data;
        if (val.data.length) {
          this.redisKey = val.data ? val.data[0] : '';
          this.handleItem(this.redisKey);
        }
      }
      if (val.statusCode === 401) {
        this.message.error('暂无权限, 请登录重试');
      }
    });
  }

  handleOperator(title: ModalTitle, type: OperateType) {
    this.isVisible = true;
    this.modalTitle = title;
    this.operatorType = type;
  }

  handleRefresh(key: string) {
    this.handleKeyOfTtl(key);
  }

  handleDelete(key: string) {
    if (!key) {
      return this.message.error('暂无可删除 key');
    }
    this.service.handleDelete(key).subscribe((val) => {
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
    this.router.navigateByUrl(Constants.LOGIN_FAILED_REDIRECT_URL);
  }

  handleCancel() {
    this.isVisible = false;
    this.newKey = '';
    this.redisValue = '';
    this.expireTime = '';
  }

  handleOk() {
    this.isVisible = false;
    const { newKey, expireTime, redisValue, operatorType, redisKey } = this;
    if ('add' === operatorType) {
      return this.service.handleSetKey(newKey, redisValue, expireTime).subscribe((val) => {
        if (val.statusCode === 200 && val.data) {
          this.handleGetKeys();
          this.newKey = '';
          this.redisValue = '';
          this.expireTime = '';
          return this.message.success(`key ${newKey} 新增成功!`);
        } else {
          return this.message.error(`key ${newKey} 新增失败!`);
        }
      });
    }
    if ('resetTtl' === operatorType) {
      return this.service.handleResetTtlOfKey(redisKey, expireTime).subscribe((val) => {
        if (val.statusCode === 200 && val.data) {
          this.handleGetKeys();
          this.expireTime = '';
          return this.message.success(`key ${redisKey} 过期时间重置成功!`);
        } else {
          return this.message.error(`key ${redisKey} 过期时间重置失败!`);
        }
      });
    }
    if ('rename' === operatorType) {
      return this.service.handleRename(redisKey, newKey).subscribe((val) => {
        if (val.statusCode === 200) {
          this.handleGetKeys();
          this.newKey = '';
          return this.message.success(`key ${redisKey} 重命名成功!`);
        } else {
          return this.message.error(`key ${redisKey} 重命名失败!`);
        }
      });
    }
  }

  handleCurrentUser() {
    this.service.handleUserInfo().subscribe((val) => {
      this.userName = val.data.name;
      this.selectedDb = val.data.db;
    });
  }

  private handleKeyOfTtl(key: string) {
    this.service.handleKeyOfTtl(key).subscribe((val) => {
      if (val.statusCode === 200) {
        if (val.data === -2) {
          this.redisTtl = 0;
          this.redisKey = '';
          this.message.warning(`${key} 已经过期啦!`);
          this.handleGetKeys();
        } else {
          this.redisTtl = val.data;
        }
      }
    });
  }
}
