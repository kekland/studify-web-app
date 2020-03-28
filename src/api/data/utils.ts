export type DateOrString = Date | string

export interface IPaginatedQuery {
  skip: number;
  limit?: number;
}

export type CanBeNull<T> = undefined | T