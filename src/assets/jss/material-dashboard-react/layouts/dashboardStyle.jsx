import {
  drawerWidth,
  transition,
  container
} from "assets/jss/material-dashboard-react.jsx";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    marginBottom: "55px",
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "70px",
    padding: "10px 15px"//,
    //minHeight: "calc(100vh - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  }
});

export default appStyle;
