export interface ITable {
  configuration?: IConfiguration[] | null;
  activeCategory?: IActiveCategory;
  searchingResults?: ISearchingResults;
  isLoading: boolean;
  error: string;
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
}

export interface ISearchingResults {
  totalCount?: number;
  items: any;
}
