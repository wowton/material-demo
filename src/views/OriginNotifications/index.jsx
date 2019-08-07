import React, { PureComponent } from 'react'
import { Button, Snackbar, IconButton} from '@material-ui/core';
import {Route,NavLink,Switch} from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from 'react-redux';
import Test from 'views/Test';
import action from 'store/actions';
import Axios from 'axios';
import Table from 'components/Table/Table';
import CustomInput from 'components/CustomInput/CustomInput';
import CardHeader from 'components/Card/CardHeader';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';

class index extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            tableData: []
        }
        this.closeHandler = this.closeHandler.bind(this);
        this.getDict = this.getDict.bind(this);
        this.getDept = this.getDept.bind(this);
    }
    timer = null;
    componentWillMount() {
        this.getDept();
    }
    getDept(){
        Axios.post('/dept/list').then(res=>{
            console.log(res);
            
        }).catch(err=>{
            console.log(err);
            
        });
    }
    getDict(word){
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            if (word) {
                Axios.get('/test/getDict/'+word.toUpperCase()).then(res=>{
                    this.setState({
                        tableData: res.data
                    })
                });
            }
        }, 200);
    }
    closeHandler(){
        this.setState({open: false});
    }
    render() {
        return (
            <Switch>
                <Route path="/admin/origin" exact key="1299">
                    <Card>
                        <CardHeader message={"hello"}>Hello Google</CardHeader>
                        <CardBody>
                            <Button color="default" onClick={()=>this.setState({open: true})}>go</Button>
                
                            <NavLink to="/admin/origin/test" onClick={e=>this.props.addBreadcrumb({path:'/admin/origin/test',name:'Test',icon:'fa-vial'})}><i className="fas fa-vial"></i>Test</NavLink>
                            <CustomInput
                                labelText="关键词"
                                id="company-disabled"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                onChange={e=>this.getDict(e.target.value)}
                            />
                            <Table tableHead={[
                                {code:'drgCode',desc: 'DRG编码'},
                                {code: 'drgDesc', desc: 'DRG描述'},
                                {code:'verCode'}]} 
                                tableData={this.state.tableData}
                            />
                        </CardBody>
                    </Card>
                    <Snackbar 
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        autoHideDuration={1000}
                        onClose={this.closeHandler}
                        open={this.state.open}
                        message={'hello notification'} 
                        action={[
                            <IconButton 
                                key="1234" 
                                onClick={this.closeHandler}
                                >
                                <CloseIcon/>
                            </IconButton>
                        ]}/>
                </Route>
                <Route path="/admin/origin/test" component={Test} key="test"/>
            </Switch>
        )
    }
}

export default connect(state=>({...state}), action)(index);