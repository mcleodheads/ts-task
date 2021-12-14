export interface ITable {
  configuration?: IConfiguration[] | null;
  activeCategory: IActiveCategory;
  searchingResults?: ISearchingResults;
  isLoading: boolean;
  error: string;
  filteredItems: IFilter;
  modalItem: unknown;
}

export interface IConfiguration {
  name: string;
}

export interface IActiveCategory {
  name: string;
  columns: IColumns[];
}

export interface IColumns {
  name: string;
  displayNameKey: string;
  type: string;
  id: string;
}

export interface ISearchingResults {
  totalCount?: number;
  items: any;
}

export interface IFilter {
  data: string[];
  selectorsIsLoading: boolean;
  selectorFields?: string[];
  emptyResponse: boolean;
}

export interface ICell {
  value: string;
  column: any;
  row: any;
}
