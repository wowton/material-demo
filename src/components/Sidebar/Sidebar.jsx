/*eslint-disable*/
import React, { PureComponent } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import {connect} from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.jsx";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import action from "store/actions";
import { Collapse } from "@material-ui/core";

class Sidebar extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isTextHidden: true,
            subMenuOpen: {}
        };
        this.initBreadcrumb = this.initBreadcrumb.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.handleMenuClick  = this.handleMenuClick.bind(this);
    }
    // verifies if routeName is the one active (in browser input)
    activeRoute(routeName) {
        return window.location.href.indexOf(routeName) > -1 ? true : false;
    }

    initBreadcrumb(link){
        this.props.initBreadcrumb(link);
    }
    handleMenuClick(e){
        let key = e.currentTarget.dataset.id;
        let newObj = Object.assign({}, this.state.subMenuOpen);
        newObj[key] = !this.state.subMenuOpen[key];
        this.setState({
            subMenuOpen: newObj
        });
    }
    renderMenu(route, props, isMainMenu) {
        let key = route.id;
        let menu;
        let subMenu = null;
        const { classes, color } = props;
        let listItemClasses = classNames({
            [" " + classes[color]]: this.activeRoute(route.layout + route.path)
        });
        const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: this.activeRoute(route.layout + route.path)
        });
        
        if (route.children) {
            subMenu = route.children.map(item=>(
                this.renderMenu(item, props)
            ));
        }
        menu = <React.Fragment key={key}>
            <ListItem button 
                data-id={key}
                onClick={isMainMenu ? this.handleMenuClick : null} 
                className={classes.itemLink + listItemClasses}>
                <Icon className={classNames(classes.itemIcon, whiteFontClasses)}>
                    <i className={classNames('fas', route.icon)}></i>
                </Icon>
                {(isMainMenu && subMenu !== null)? 
                <Icon className={classNames(classes.itemIconRight,this.state.isTextHidden?classes.itemTextHidden:null)}>
                    <i className="fas fa-chevron-left" 
                        style={{transform: this.state.subMenuOpen[key]?"rotate(-90deg)":"rotate(0deg)"}}></i>
                </Icon> : null}
                <ListItemText primary={route.name}
                    className={classNames(classes.itemText, whiteFontClasses, this.state.isTextHidden?classes.itemTextHidden:null)}
                    disableTypography={true}
                />
            </ListItem>
            {subMenu===null?null:
            <Collapse in={this.state.subMenuOpen[key]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding className={classes.subMenu}>
                    {subMenu}
                </List>
            </Collapse>}
        </React.Fragment>;
        if (route.path !== 'no') {
            return <NavLink
                to={route.layout + route.path}
                onClick={e=>this.initBreadcrumb({path: route.layout+route.path, icon: route.icon, name: route.name})}
                className={classes.item}
                activeClassName="active"
                key={key}>
                    {menu}
                </NavLink>
        } else {
            return menu;
        }
    }

    render() {
        const { classes, color, logo, image, logoText, routes } = this.props;
        var links = (
        <List className={classes.list}>
            {routes.map(item => {
                return this.renderMenu(item, this.props, true);
            })}
        </List>
        );
        var linksRight = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
            var listItemClasses = classNames({
                [" " + classes[color]]: this.activeRoute(prop.layout + prop.path)
            });
            const whiteFontClasses = classNames({
                [" " + classes.whiteFont]: this.activeRoute(prop.layout + prop.path)
            });
            return (
                <NavLink
                to={prop.layout + prop.path}
                className={classes.item}
                activeClassName="active"
                key={key}
                >
                <ListItem button className={classes.itemLink + listItemClasses}>
                    {typeof prop.icon === "string" ? (
                    <Icon
                        className={classNames(classes.itemIcon, whiteFontClasses, {
                        [classes.itemIconRTL]: this.props.rtlActive
                        })}
                    >
                        <i className={classNames('fas', prop.icon)}></i>
                    </Icon>
                    ) : (
                    <prop.icon
                        className={classNames(classes.itemIcon, whiteFontClasses, {
                        [classes.itemIconRTL]: this.props.rtlActive
                        })}
                    />
                    )}
                    <ListItemText
                    primary={this.props.rtlActive ? prop.rtlName : prop.name}
                    className={classNames(classes.itemText, whiteFontClasses, {
                        [classes.itemTextRTL]: this.props.rtlActive
                    })}
                    disableTypography={true}
                    />
                </ListItem>
                </NavLink>
            );
            })}
        </List>
        );

        var brand = (
        <div className={classes.logo}>
            <a
            href="#"
            className={classNames(classes.logoLink, {
                [classes.logoLinkRTL]: this.props.rtlActive
            })}
            >
            <div className={classes.logoImage}>
                <img src={logo} alt="logo" className={classes.img} />
            </div>
            <div className={classNames(classes.logoText,{[classes.itemTextHidden]:this.state.isTextHidden})}>
            {logoText}
            </div>
            </a>
        </div>
        );
        var brandRight = (
        <div className={classes.logo}>
            <a
            href="#"
            className={classNames(classes.logoLink, {
                [classes.logoLinkRTL]: this.props.rtlActive
            })}
            >
            <div className={classes.logoImage}>
                <img src={logo} alt="logo" className={classes.img} />
            </div>
            <div className={classNames(classes.logoText)}>
            {logoText}
            </div>
            </a>
        </div>
        );
        return (
        <div>
            <Hidden mdUp implementation="css">
            <Drawer
                variant="temporary"
                anchor={this.props.rtlActive ? "left" : "right"}
                open={this.props.open}
                classes={{
                paper: classNames(classes.drawerPaperRight, {
                    [classes.drawerPaperRTL]: this.props.rtlActive
                })
                }}
                onClose={this.props.handleDrawerToggle}
                ModalProps={{
                keepMounted: true // Better open performance on mobile.
                }}
            >
                {brandRight}
                <div className={classNames(classes.sidebarWrapper,"miniScrollbar")}>
                {this.props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
                {linksRight}
                </div>
                {image !== undefined ? (
                <div
                    className={classes.background}
                    style={{ backgroundImage: "url(" + image + ")" }}
                />
                ) : null}
            </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
            <Drawer
                onMouseEnter={()=>{this.setState({isTextHidden: false})}}
                onMouseLeave={()=>this.setState({isTextHidden: true})}
                anchor={this.props.rtlActive ? "right" : "left"}
                variant="permanent"
                open
                classes={{
                paper: classNames(classes.drawerPaper, {
                    [classes.drawerPaperRTL]: this.props.rtlActive
                })
                }}
            >
                {brand}
                <div className={classNames(classes.sidebarWrapper,"miniScrollbar")}>{links}</div>
                {image !== undefined ? (
                <div
                    className={classes.background}
                    style={{ backgroundImage: "url(" + image + ")" }}
                />
                ) : null}
            </Drawer>
            </Hidden>
        </div>
        );
    }
};

// Sidebar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   rtlActive: PropTypes.bool,
//   handleDrawerToggle: PropTypes.func,
//   bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
//   logo: PropTypes.string,
//   image: PropTypes.string,
//   logoText: PropTypes.string,
//   routes: PropTypes.arrayOf(PropTypes.object),
//   open: PropTypes.bool
// };

export default connect(state=>({...state}), action)(withStyles(sidebarStyle)(Sidebar));
