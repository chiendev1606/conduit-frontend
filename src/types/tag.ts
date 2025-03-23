export type Tag = {
  id: number;
  name: string;
  count: number;
};

export type TagsResponse = {
  tags: Tag[];
};
