import React, { PureComponent } from 'react'
import GridItem from 'components/Grid/GridItem';
import GridContainer from 'components/Grid/GridContainer';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardBody from 'components/Card/CardBody';
import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle';
import { withStyles } from '@material-ui/core';
import Table from 'components/Table';
import moment from 'moment';
import Axios from 'axios';

class Users extends PureComponent {
    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={4} md={4} lg={2} xl={1}>
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>组织机构</h4>
                            <p className={classes.cardCategoryWhite}></p>
                        </CardHeader>
                        <CardBody>
                            <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                                <TreeItem nodeId="1" label="Applications: ">
                                    <TreeItem nodeId="2" label="Calendar : app" />
                                    <TreeItem nodeId="3" label="Chrome : app" />
                                    <TreeItem nodeId="4" label="Webstorm : app" />
                                </TreeItem>
                                <TreeItem nodeId="5" label="Documents: ">
                                    <TreeItem nodeId="6" label="Material-UI : app">
                                        <TreeItem nodeId="7" label="src : ">
                                            <TreeItem nodeId="8" label="index : js" />
                                            <TreeItem nodeId="9" label="tree-view : js" />
                                        </TreeItem>
                                    </TreeItem>
                                </TreeItem>
                            </TreeView>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={8} md={8} lg={10} xl={11}>
                    <Table
                        tableHeaderColor="success"
                        title="用户列表"
                        columns={[
                            //{field: 'selectItem', radio: true},
                            //{title: 'id', field: 'ID', visible: false, align: 'center', valign: 'middle'},
                            {title: '账号', field: 'ACCOUNT', align: 'center', valign: 'middle', sortable: true},
                            {title: '姓名', field: 'NAME', align: 'center', valign: 'middle', sortable: true},
                            {title: '性别', field: 'SEXNAME', align: 'center', valign: 'middle', sortable: true},
                            {title: '角色', field: 'ROLENAME', align: 'center', valign: 'middle', sortable: true},
                            {title: '部门', field: 'DEPTNAME', align: 'center', valign: 'middle', sortable: true},
                            //{title: '邮箱', field: 'EMAIL', align: 'center', valign: 'middle', sortable: true},
                            //{title: '电话', field: 'PHONE', align: 'center', valign: 'middle', sortable: true},
                            {title: '创建时间', field: 'CREATETIME', align: 'center', valign: 'middle', sortable: true,
                                render : function(value,row,index){
                                    return moment(value).format('YYYY-MM-DD');
                                }},
                            {title: '状态', field: 'STATUSNAME', align: 'center', valign: 'middle', sortable: true}
                        ]}
                        data={query=>new Promise((resolve, reject)=>{
                            Axios.get('/mgr/list').then(res=>{
                                resolve({
                                    data: res.data
                                })
                            })
                        })}
                    />
                </GridItem>
            </GridContainer>
        )
    }
}

export default withStyles(dashboardStyle)(Users);