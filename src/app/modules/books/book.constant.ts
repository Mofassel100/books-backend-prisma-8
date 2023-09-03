export const BookFilterableFields: string[] = [
  'search' || 'category' || 'minPrice' || 'maxPrice',
];
export const BookSearchableFields: string[] = ['title' || 'author' || 'genre'];

export const BookRelationalFields: string[] = ['categoryId'];
export const BookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
