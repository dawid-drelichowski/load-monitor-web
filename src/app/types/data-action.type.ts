import { DataActionNames } from './data-action-names.type';

export interface DataAction {
  name: DataActionNames;
  interval?: number;
}
