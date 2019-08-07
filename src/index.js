import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.jsx";
import Login from 'views/Login';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/css/material-dashboard-react.css?v=1.7.0";
import store from "store";
import {persistor} from 'store';
import AuthRoute from "components/AuthRoute";
import Axios from "axios";
import { SnackbarProvider } from "notistack";

import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { PersistGate } from "redux-persist/integration/react";

const history = createBrowserHistory();

//  REQUEST 请求异常拦截
Axios.interceptors.request.use(config => {
    //==========  所有请求之前都要执行的操作  ==============
    nprogress.start();
    return config;
}, err => {
    //==================  错误处理  ====================
    //Message.error({message: '请求超时!'});
    return Promise.resolve(err);
})

//  RESPONSE 响应异常拦截
Axios.interceptors.response.use(data => {
    nprogress.done();
    // 第一种方式
    // 根据返回的code值来做不同的处理（和后端约定）
    switch (data.code) {
        case '0':
            // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
            return data

        // 需要重新登录
        case 'SHIRO_E5001':

            history.replace(`/login`)

            // 不显示提示消息
            data.description = ''
            break;
        default:
            return data;
    }

    // 第二种方式，仅对200和error状态处理
    if (data.status && data.status === 200) {
        //Message.error({message: data.data.msg});
        return;
    }
    console.log(data);

    return data;
}, err => {
    nprogress.done();
    //==============  错误处理  ====================
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)'; break;
            case 401:
                err.message = '未授权，请重新登录(401)';
                sessionStorage.removeItem('userName');
                history.replace('/login');
                break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错(${err.response.status})!`;
        }
    } else {
        err.message = '连接服务器失败!'
    }
    //Message.err( {message: err.message } )
    return Promise.reject(err);
})

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                <Router history={history}>
                    <Switch>
                        <AuthRoute path="/admin" component={Admin} />
                        <Route path="/login" component={Login} />
                        <Redirect from="/" to="/admin/origin" />
                    </Switch>
                </Router>
            </SnackbarProvider>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
