export const BookFilterableFields: string[] = [
  'search' ||
    'categoryId' ||
    'id' ||
    'email' ||
    'minPrice' ||
    'maxPrice' ||
    'title' ||
    'author' ||
    'genre',
];
export const BookSearchableFields: string[] = [
  'id' || 'price' || 'title' || 'author' || 'genre',
];

export const BookRelationalFields: string[] = ['categoryId'];
export const BookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
