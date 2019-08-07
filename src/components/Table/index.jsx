import React,{ forwardRef } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import MaterialTable from "material-table";
import { MTableHeader } from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function CustomTable({ ...props }) {
  const {classes, options, components, ...rest} = props;
  return (
    <MaterialTable
        style={{marginBottom: '20px'}}
        {...rest}
        className={classes.table}
        icons={tableIcons}
        options={{
            ...options,
            exportButton: true,
            actionsColumnIndex: -1,//动作按钮在右边
        }}
        components={{
            ...components,
            MTableHeader: props=>{
                return <MTableHeader {...props} draggable={false}/>
            }
        }}
        localization={{
            toolbar: {
                nRowsSelected: '{0} 行被选择',
                addRemoveColumns: '添加或删除行',
                showColumnsTitle: '显示列标题',
                showColumnsAriaLabel: '显示列标题',
                exportTitle: '导出表格',
                exportAriaLabel: '导出表格',
                exportName: '导出为CSV',
                searchTooltip: '搜索',
                searchPlaceholder: '搜索'
            },
            header: {
                actions: '操作'
            },
            body: {
                emptyDataSourceMessage: '无数据',
                addTooltip: '添加',
                deleteTooltip: '删除',
                editTooltip: '编辑',
                filterRow: {
                    filterTooltip: '过滤'
                },
                editRow: {
                    deleteText: '确定要删除吗？',
                    cancelTooltip: '取消',
                    saveTooltip: '保存',
                }
            },
            grouping: {
                placeholder: '拖过来'
            },
            pagination: {
                labelDisplayedRows: '{from}-{to} 共 {count}条',
                labelRowsSelect: '行',
                labelRowsPerPage: '每页显示',
                firstAriaLabel: '首页',
                firstTooltip: '首页',
                previousAriaLabel: '上一页',
                previousTooltip: '上一页',
                nextAriaLabel: '下一页',
                nextTooltip: '下一页',
                lastAriaLabel: '尾页',
                lastTooltip: '尾页'
            }
        }}
    />
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
