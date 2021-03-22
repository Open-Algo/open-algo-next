import Diagram from './Diagram';
export default interface Solution {
  title: string;
  time_complexity: string;
  space_complexity: string;
  tags: string[];
  solution: string;
  id: string;
  problem: string;
  packages: string[];
  explanation: string;
  templates: string[];
  diagrams: Diagram[];
}
