import React from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { IJobTableProps } from "../../types/job-board-types";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import "./job-table.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    marginTop: "20px",
  },
});

const JobTable: React.FC<IJobTableProps> = ({
  handleUpArrowClick,
  handleDownArrowClick,
  isSearching,
  rowData,
  jobBoardColumns,
}) => {
  const classes = useStyles();
  const renderRowData = () => {
    const temp: any = [];
    if (isSearching) return <div className="table_message">Loading</div>;
    if (!rowData.length)
      return <div className="table_message">No data found</div>;
    rowData.forEach((row) => {
      temp.push(
        <TableRow key={row.id}>
          <TableCell align="left">{row.id}</TableCell>
          <TableCell align="center">{row.jobTitle}</TableCell>
          <TableCell align="center">{row.description}</TableCell>
          <TableCell align="center">
            {row.skills.map((skill) => `${skill}, `)}
          </TableCell>
          <TableCell align="center">{row.companyMarket}</TableCell>
          <TableCell align="center">{row.jobType}</TableCell>
          <TableCell align="center">{row.location}</TableCell>
        </TableRow>
      );
    });
    return temp;
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className="table_head">
          <TableRow>
            {jobBoardColumns.map((column, i) => (
              <TableCell align="center">
                <b>{column}</b>
                <br />
                <span className="arrow" onClick={() => handleUpArrowClick(i)}>
                  <ArrowUpwardIcon fontSize="small" />
                </span>
                <span className="arrow" onClick={() => handleDownArrowClick(i)}>
                  <ArrowDownwardIcon fontSize="small" />
                </span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{renderRowData()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default JobTable;
