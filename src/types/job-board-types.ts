export interface IJobBoardRow {
  id: number;
  jobTitle: string;
  description: string;
  skills: string[];
  companyMarket: string;
  jobType: string;
  location: string;
}
export interface IJobTableProps {
  handleUpArrowClick: (index: number) => void;
  handleDownArrowClick: (index: number) => void;
  isSearching: boolean;
  rowData: IJobBoardRow[];
  jobBoardColumns: string[];
}
