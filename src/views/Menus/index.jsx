import React, { useState, useEffect } from 'react'
import Table from 'components/Table';
import Axios from 'axios';
import { MTableToolbar } from 'material-table';
import { Button } from '@material-ui/core';
import moment from 'moment';

export default function Index() {
    const [menus, setMenus] = useState([]);
    useEffect(() => {
        Axios.get('/menu/list').then(res=>{
            setMenus(res.data);
        })
        return () => {
            
        };
    }, [])
    return (
        <>
        <Table
            title='菜单列表'
            columns={[
                {title: '菜单名称', field: 'NAME', align: 'center', valign: 'middle', sortable: true,width:'17%'},
                //{title: '菜单编号', field: 'CODE', visible: false,align: 'center', valign: 'middle', sortable: true,width:'12%'},
                //{title: '菜单父编号', field: 'PCODE', visible: false,align: 'center', valign: 'middle', sortable: true},
                {title: '请求地址', field: 'URL', align: 'center', valign: 'middle', sortable: true,width:'15%'},
                {title: '排序', field: 'NUM', align: 'center', valign: 'middle', sortable: true},
                //{title: '层级', field: 'LEVELS', align: 'center',visible: false, valign: 'middle', sortable: true},
                //{title: '是否是菜单', field: 'ISMENUNAME', align: 'center', visible: false,valign: 'middle', sortable: true},
                {title: '状态', field: 'STATUSNAME', align: 'center', valign: 'middle', sortable: true},
                {title: '备注', field: 'TIPS', align: 'center', valign: 'middle', sortable: true}
            ]}
            data={menus}
            options={
                {selection: true}
            }
            //isLoading={true}
            parentChildData={(row, rows) => rows.find(a => a.CODE === row.PCODE)}
            components={{
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    <div style={{padding: '0px 10px 10px 10px'}}>
                        <Button variant="contained" color="default">添加</Button>
                        <Button color="secondary">编辑</Button>
                    </div>
                  </div>
                ),
              }}
            />
        <Table
            title='日志列表'
            columns={[
                {title: '日志类型', field: 'logtype', align: 'center', valign: 'middle', sortable: true},
                {title: '日志名称', field: 'logname', align: 'center', valign: 'middle', sortable: true},
                {title: '用户名称', field: 'userid', align: 'center', valign: 'middle'},
                //{title: '类名', field: 'classname', align: 'center', valign: 'middle', sortable: true},
                //{title: '方法名', field: 'method', align: 'center', valign: 'middle', sortable: true},
                {title: '时间', field: 'createtime', align: 'center', valign: 'middle', sortable: true, render : function(value,row,index){
                    return moment(value).format('YYYY-MM-DD hh:mm:ss');
                }},
                {title: '具体消息', field: 'message'}
            ]}
            data={query=>new Promise((resolve, reject)=>{
                Axios.get('/log/list',{
                    params:{
                        size: query.pageSize,
                        current: query.page+1,
                        condition: query.search
                    }
                }).then(res=>{
                    resolve({
                        data: res.data.records,
                        page: res.data.current-1,
                        totalCount: res.data.total 
                    })
                })
            })}
            options={
                {selection: true}
            }
            />
        </>
    )
}
