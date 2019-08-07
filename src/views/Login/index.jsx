import React, { PureComponent, createRef } from 'react'

import loginImg from "assets/img/login-pic.png";
import 'assets/sass/login.scss';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import {connect} from 'react-redux';
import action from "store/actions/index.js";
import { withSnackbar } from 'notistack';

class index extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            account: 'admin',
            password: '111111',
            doLogin: false
        }
        this.account = createRef();
        this.password = createRef();
        this.changeHandler = this.changeHandler.bind(this);
        this.enterKeyHandler = this.enterKeyHandler.bind(this);
        this.login = this.login.bind(this);
    }

    changeHandler(values) {
        this.setState({
            ...values
        })
    }
    enterKeyHandler(e) {
        if (e.keyCode === 13) {
            this.login();
        }
    }
    componentWillMount() {
        if (sessionStorage.getItem('userName')) {
            this.props.history.push('/');
        }
    }
    login() {
        if (this.state.account.trim() === '') {
            this.props.enqueueSnackbar('兄dei，你的用户名呢！', {
                variant: 'warning',
                preventDuplicate: true,//只显示一个通知框
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                autoHideDuration: 2000
            });
            
            this.account.current.focus();
            return;
        }
        if (this.state.password.trim() === '') {
            this.props.enqueueSnackbar('兄dei，没密码还想登录？', {
                variant: 'warning',
                preventDuplicate: true,//只显示一个通知框
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
                autoHideDuration: 2000
            });
            this.password.current.focus();
            return;
        }

        this.setState({
            doLogin: true
        })
        Axios.post('/loginAjax',{
            account: this.state.account,
            password: this.state.password
        }).then(res=>{
            if (res.status === 200) {
                let date = new Date();
                let {menu, user, roleName, deptName, session }= res.data;
                
                this.props.setUsername(user.name);
                this.props.setMenus(menu);
                console.log(roleName,deptName);
                
                sessionStorage.setItem('userName', user.account);
                date.setTime(date.getTime()+session.timeout);
                document.cookie = `JSESSIONID=${session.id};path=/;expires=${date.toGMTString()}`;
                this.props.history.push('/');
            }
        }).catch(err=>{
            if (err.response) {
                this.props.enqueueSnackbar(err.response.data.message?err.response.data.message:err.message, {
                    variant: 'warning',
                    preventDuplicate: true,//只显示一个通知框
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                    autoHideDuration: 2000
                });
                this.setState({
                    doLogin: false
                });
            } else {
                console.log(err);
            }
        });
    }

    render() {
        return (
            <div style={{display: "flex"}}>
                <div className="container-login">
                    <div className="wrap-login">
                        <div className="login-pic js-tilt" data-tilt>
                            <img src={loginImg} alt="Login" />
                        </div>
                        <form className="login-form">
                            <h3 className="login-form-title">住院医疗服务监测与分析系统</h3>
                            <div className="login-form-body">
                                <div className="wrap-input validate-input">
                                    <input className="input" type="text" ref={this.account} placeholder="用户名" value={this.state.account}
                                        onChange={e=>this.changeHandler({account: e.target.value})} 
                                        onKeyUp={this.enterKeyHandler} />
                                    <span className="focus-input"></span>
                                    <span className="symbol-input"><i className="fas fa-user"></i></span>
                                </div>
                                <div className="wrap-input validate-input">
                                    <input className="input" type="password" ref={this.password} placeholder="密码" value={this.state.password}
                                        onChange={e=>this.changeHandler({password: e.target.value})} 
                                        onKeyUp={this.enterKeyHandler} />
                                    <span className="focus-input"></span>
                                    <span className="symbol-input"><i className="fas fa-lock"></i></span>
                                </div>
                                {/* <div className="wrap-input validate-input">
                                    <input className="input" type="text" id="jCaptchaCode" name="jCaptchaCode" placeholder="验证码"  autoComplete="off"/>
                                    <span className="focus-input"></span>
                                    <span className="symbol-input"><i className="fas fa-laptop-code"></i></span>
                                </div> 
                                <img src="jcaptcha.jpg" style={{height: "50px"}} id="checkCode" onClick='refreshCode()' className="checkCode" alt=""/>
                                */}
                                <div className="container-login-form-btn">
                                    <Button className="login-form-btn" type="button" onClick={this.login} disabled={this.state.doLogin}>
                                        {this.state.doLogin ? <span>正在登录 <i className="fas fa-spinner fa-spin"></i></span> : '登录'}
                                    </Button>
                                </div>
                                <div className="text-center">
                                    <a href="void()">Create your Account
                                        <i className="fa fa-long-arrow-right"></i>
                                    </a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <footer className="footer">
                        <div className="container">
                            <p id="CopyRight">Copyright © {new Date().getFullYear()} WOWTON</p>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default withRouter(withSnackbar(connect(state=>({...state}), action)(index)));