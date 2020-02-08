import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
})
export class ContentComponent implements OnInit {
  constructor() {}

  @Input() redisKey: string;
  @Input() redisTtl: number;

  ngOnInit(): void {
    this.redisKey = '111 ---->';
    this.redisTtl = 1000;
  }
}
