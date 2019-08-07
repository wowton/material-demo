import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";

function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {typeof prop === 'string' ? prop : (prop.desc || prop.code)}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            let tableCells = [];
            if (tableHead !== undefined) {
              for (let index = 0; index < tableHead.length; index++) {
                let thisTableHead = tableHead[index];
                let key = typeof thisTableHead === 'string' ? thisTableHead : thisTableHead.code;
                if (thisTableHead && typeof thisTableHead.render === 'function') {
                  tableCells.push(<TableCell className={classes.tableCell} key={key}>{thisTableHead.render(prop[key])}</TableCell>);
                } else {
                  tableCells.push(<TableCell className={classes.tableCell} key={key}>{prop[key]}</TableCell>);
                }
              }
            } else {
              for (const key in prop) {
                if (prop.hasOwnProperty(key)) {
                  tableCells.push(<TableCell className={classes.tableCell} key={key}>{prop[key]}</TableCell>);
                }
              }
            }
            
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {tableCells}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  //tableHead: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.any)
};

export default withStyles(tableStyle)(CustomTable);
