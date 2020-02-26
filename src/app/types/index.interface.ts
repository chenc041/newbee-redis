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
