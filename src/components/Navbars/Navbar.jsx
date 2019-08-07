import React from "react";
import {connect} from 'react-redux';
import classNames from "classnames";
import PropTypes from "prop-types";
import {NavLink} from 'react-router-dom'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import RTLNavbarLinks from "./RTLNavbarLinks.jsx";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";
import { Breadcrumbs, Typography } from "@material-ui/core";
import action from "store/actions/index.js";

function Header({ ...props }) {
  function makeBreadcrumb() {
    return props.breadcrumb.map((item, index, arr) => {
      if (index < arr.length-1) {
        return (
          <NavLink to={item.path} key={index} onClick={e=>props.removeBreadcrumb(item.path)}>
            <i className={classNames('fas', item.icon)}></i>
            {item.name}
          </NavLink>
        );
      } else {
        return (
          <Typography color="textPrimary" key={index}>
            <i className={classNames('fas', item.icon)}></i>
            {item.name}
          </Typography>
        );
      }
    });
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Breadcrumbs aria-label="Breadcrumb">
            {makeBreadcrumb()}
          </Breadcrumbs>
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(headerStyle)(connect(state=>({...state}), action)(Header));
