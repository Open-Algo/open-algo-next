import Tag from './Tag';

export default interface Solution {
  complexities: object[];
  tags: Tag[];
  solution: string;
  id: string;
  problem: string;
}
