export type IOrderBooks = {
  bookId: string | undefined;
  quantity: number | undefined;
};

export type IOrderCreateData = {
  userId: string;
  orderedBooks: IOrderBooks[];
};
