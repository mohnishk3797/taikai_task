import { AppBar, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./job-board.css";
import { jobBoardColumns, jobBoardRows } from "../../data/data";
import useDebounce from "../../hooks/use-debounce";
import { IJobBoardRow } from "../../types/job-board-types";
import JobTable from "../../components/job-table";

function JobBoard() {
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const [rowData, setRowData] = useState<IJobBoardRow[]>(jobBoardRows);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const search = async (query: string): Promise<IJobBoardRow[]> => {
    let reg = new RegExp(query, "gi");
    let priority: IJobBoardRow[] = [];

    rowData.forEach(function (data: IJobBoardRow) {
      if (reg.test(data.jobTitle)) return priority.push(data);
    });
    return new Promise<IJobBoardRow[]>((resolve) => {
      resolve(priority);
    });
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      search(debouncedSearchTerm).then((results) => {
        setIsSearching(false);
        setRowData(results);
      });
    } else {
      setRowData(jobBoardRows);
    }
  }, [debouncedSearchTerm]);
  const handleUpArrowClick = (index: number) => {
    const sorted = [...rowData].sort((a, b) => {
      switch (index) {
        case 0:
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        case 1:
          if (a.jobTitle < b.jobTitle) {
            return -1;
          }
          if (a.jobTitle > b.jobTitle) {
            return 1;
          }
          return 0;
        case 2:
          if (a.description < b.description) {
            return -1;
          }
          if (a.description > b.description) {
            return 1;
          }
          return 0;
        case 3:
          if (a.skills < b.skills) {
            return -1;
          }
          if (a.skills > b.skills) {
            return 1;
          }
          return 0;
        case 4:
          if (a.companyMarket < b.companyMarket) {
            return -1;
          }
          if (a.companyMarket > b.companyMarket) {
            return 1;
          }
          return 0;
        case 5:
          if (a.jobType < b.jobType) {
            return -1;
          }
          if (a.jobType > b.jobType) {
            return 1;
          }
          return 0;
        case 6:
          if (a.location < b.location) {
            return -1;
          }
          if (a.location > b.location) {
            return 1;
          }
          return 0;
        default:
          return 0;
      }
    });
    setRowData(sorted);
  };
  const handleDownArrowClick = (index: number) => {
    const sorted = [...rowData].sort((a, b) => {
      switch (index) {
        case 0:
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        case 1:
          if (a.jobTitle > b.jobTitle) {
            return -1;
          }
          if (a.jobTitle < b.jobTitle) {
            return 1;
          }
          return 0;
        case 2:
          if (a.description > b.description) {
            return -1;
          }
          if (a.description < b.description) {
            return 1;
          }
          return 0;
        case 3:
          if (a.skills > b.skills) {
            return -1;
          }
          if (a.skills < b.skills) {
            return 1;
          }
          return 0;
        case 4:
          if (a.companyMarket > b.companyMarket) {
            return -1;
          }
          if (a.companyMarket < b.companyMarket) {
            return 1;
          }
          return 0;
        case 5:
          if (a.jobType > b.jobType) {
            return -1;
          }
          if (a.jobType < b.jobType) {
            return 1;
          }
          return 0;
        case 6:
          if (a.location > b.location) {
            return -1;
          }
          if (a.location < b.location) {
            return 1;
          }
          return 0;
        default:
          return 0;
      }
    });
    setRowData(sorted);
  };
  return (
    <article className="container">
      <header>
        <AppBar className="header" position="static">
          <h4 className="header_text">Job Board</h4>
        </AppBar>
      </header>
      <main className="main_container">
        <div className="action_container">
          <TextField
            placeholder="search by job title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <JobTable
          handleUpArrowClick={handleUpArrowClick}
          handleDownArrowClick={handleDownArrowClick}
          isSearching={isSearching}
          jobBoardColumns={jobBoardColumns}
          rowData={rowData}
        />
      </main>
    </article>
  );
}

export default JobBoard;
