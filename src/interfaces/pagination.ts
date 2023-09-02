export type IPaginationOptions = {
  page?: number | undefined | any;
  limit?: number | undefined;
  size?: number | undefined | any;
  sortBy?: string | undefined;
  sortOrder?: 'asc' | 'desc' | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
  category?: string | undefined;
  search?: string | undefined;
};
