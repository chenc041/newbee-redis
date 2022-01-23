export interface LoginType {
  name: string;
  host: string;
  port: string;
  password: string;
  db: number;
}

export interface Response<T> {
  statusCode: number;
  data: T;
}

export type OperateType = 'rename' | 'resetTtl' | 'add';

export type ModalTitle = '重置 TTL' | '重命名' | '新增';
