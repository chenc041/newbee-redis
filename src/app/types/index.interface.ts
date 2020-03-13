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

export type OperaterType = 'rename' | 'resetTtl' | 'add';

export type ModalTitle = '重置ttl' | '重命名' | '新增';
