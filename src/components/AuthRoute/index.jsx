import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

export default class AuthRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: sessionStorage.getItem('userName') ? true: false
        }
    }
    componentWillMount() {
        nprogress.start();
        if (!this.state.isLogin) {
            return <Redirect to="/login" />
        }
    }
    componentDidMount() {
        nprogress.done();
    }
    render() {
        const {component: Component,...rest} = this.props;
        return (
            <Route {...rest} render={props=>{
                return this.state.isLogin ? <Component {...props} /> : <Redirect to="/login" />
            }}/>
        )
    }
}
