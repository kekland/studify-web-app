export interface ILoadable<T> {
  loading: boolean;
  hasNoMore: boolean;
  items: T;
}