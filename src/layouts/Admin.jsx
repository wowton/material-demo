import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
//import PerfectScrollbar from "perfect-scrollbar";
//import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import routes from "routes.js";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-4.jpg";
import logo from "assets/img/reactlogo.png";
import action from "store/actions";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        image: image,
        color: "blue",
        hasImage: true,
        fixedClasses: "dropdown show",
        mobileOpen: false,
        menus: []
    };
  }
  mainPanel = React.createRef();
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    //let menuData = [{"id":"2086d35a175b4ad495badf019806671f","parentId":"0","name":"医院组织管理","levels":1,"ismenu":1,"num":1,"url":"no","icon":"fa fa-laptop","children":[{"id":"131","parentId":"2086d35a175b4ad495badf019806671f","name":"部门管理","levels":2,"ismenu":1,"num":3,"url":"/dept","icon":"fa fa-leaf","children":null},{"id":"ec085e26ae0b46ad971cc5bd74334747","parentId":"2086d35a175b4ad495badf019806671f","name":"科室管理","levels":2,"ismenu":1,"num":11,"url":"/department","icon":"fa fa-cog ","children":null}]},{"id":"28b3afe280d54dc8b9014dff75a8a83b","parentId":"0","name":"在院病例","levels":1,"ismenu":1,"num":2,"url":"no","icon":"fas fa-align-center","children":[{"id":"b6b3b2915600431c9b14fb7ce0908a67","parentId":"28b3afe280d54dc8b9014dff75a8a83b","name":"在院病例列表","levels":2,"ismenu":1,"num":1,"url":"/inHospData/list","icon":"fas fa-child","children":null}]},{"id":"105","parentId":"0","name":"系统管理","levels":1,"ismenu":1,"num":3,"url":"no","icon":"fas fa-user-cog","children":[{"id":"106","parentId":"105","name":"用户管理","levels":2,"ismenu":1,"num":1,"url":"/mgr","icon":"fa fa-user","children":null},{"id":"114","parentId":"105","name":"角色管理","levels":2,"ismenu":1,"num":2,"url":"/role","icon":"fa fa-user-plus","children":null},{"id":"132","parentId":"105","name":"字典管理","levels":2,"ismenu":1,"num":4,"url":"/dict","icon":"fa fa-book","children":null},{"id":"119","parentId":"105","name":"菜单管理","levels":2,"ismenu":1,"num":4,"url":"/menu","icon":"fas fa-align-justify","children":null},{"id":"4b182892612b44b7af00c692a084d4ab","parentId":"105","name":"系统配置","levels":2,"ismenu":1,"num":5,"url":"/SysConfig","icon":"fas fa-cogs","children":null},{"id":"133","parentId":"105","name":"登录日志","levels":2,"ismenu":1,"num":6,"url":"/loginLog","icon":"fas fa-file-alt","children":null},{"id":"128","parentId":"105","name":"业务日志","levels":2,"ismenu":1,"num":6,"url":"/log","icon":"fa fa-eye","children":null},{"id":"130","parentId":"105","name":"监控管理","levels":2,"ismenu":1,"num":7,"url":"/druid","icon":"far fa-eye","children":null},{"id":"141","parentId":"105","name":"通知管理","levels":2,"ismenu":1,"num":9,"url":"/notice","icon":"fas fa-bell","children":null},{"id":"148","parentId":"105","name":"代码生成","levels":2,"ismenu":1,"num":10,"url":"/code","icon":"fa-user","children":null}]},{"id":"c1a65e997719467f87de7869af95cc66","parentId":"0","name":"首页数据管理","levels":1,"ismenu":1,"num":4,"url":"no","icon":"fa fa-database","children":[{"id":"b32cf4ca9c3644c5a7b14fc0ef3da0f3","parentId":"c1a65e997719467f87de7869af95cc66","name":"预分组知识库","levels":2,"ismenu":1,"num":1,"url":"/trainSample","icon":"fa fa-object-group","children":null},{"id":"435c614461614e9c9f759d2cb3e708b8","parentId":"c1a65e997719467f87de7869af95cc66","name":"历史数据导入","levels":2,"ismenu":1,"num":1,"url":"/MrHistoryImport","icon":"fas fa-archive","children":null}]},{"id":"3b0dc7a5f640491a8c8f70ec5c622ace","parentId":"0","name":"历史数据预分组","levels":1,"ismenu":1,"num":5,"url":"no","icon":"fab fa-google","children":[{"id":"717ee8c8ec43423c87c59410f8698791","parentId":"3b0dc7a5f640491a8c8f70ec5c622ace","name":"预分组","levels":2,"ismenu":1,"num":1,"url":"/mrHistoryGroup","icon":"fas fa-calendar-minus","children":null}]},{"id":"c61b13626ff047c6b7bd84900a02b1f0","parentId":"0","name":"对照库维护","levels":1,"ismenu":1,"num":6,"url":"no","icon":"fa fa-bars","children":[{"id":"cd90eebf03f444928eaad09fbba48e55","parentId":"c61b13626ff047c6b7bd84900a02b1f0","name":"对照库维护","levels":2,"ismenu":1,"num":1,"url":"/contrasmaintain","icon":"fa-coins","children":null}]},{"id":"e57802a6ac6845f98b14554e5bf84349","parentId":"0","name":"预分组准确性监测","levels":1,"ismenu":1,"num":7,"url":"no","icon":"fas fa-anchor","children":[{"id":"b0ec698e589148e89784d815513dee9b","parentId":"e57802a6ac6845f98b14554e5bf84349","name":"准确性监测","levels":2,"ismenu":1,"num":1,"url":"/accuracyMonitoring","icon":"fas fa-adjust","children":null}]},{"id":"a8014af564024426986164932676cf3a","parentId":"0","name":"测试菜单","levels":1,"ismenu":1,"num":100,"url":"no","icon":"fa fa-code","children":[{"id":"550ee4e17e7a42fd9c44824c352009ac","parentId":"a8014af564024426986164932676cf3a","name":"示例页面","levels":2,"ismenu":1,"num":2,"url":"/test/example","icon":"fa fa-flag-checkered","children":null}]}];
    
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.mainPanel.current.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <React.Fragment>
      <div className={classes.wrapper}>
        <Sidebar
          routes={this.props.menus.map(item=>({
            id: item.id,
            path: item.url,
            name: item.name,
            icon: item.icon,
            layout: "/admin",
            children: item.children.map(item=>({
              id: item.id,
              path: item.url,
              name: item.name,
              icon: item.icon,
              layout: "/admin",
              children: item.children
            }))
          }))}
          logoText={"DRG"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={this.mainPanel}>
            <Navbar
                routes={routes}
                handleDrawerToggle={this.handleDrawerToggle}
                {...rest}
            />
            <div className={classes.content}>
                <div className={classes.container}>{switchRoutes}</div>
            </div>
        </div>
      </div>
      <Footer />
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(connect(state=>({...state}),action)(Dashboard));
