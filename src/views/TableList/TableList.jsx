import React, { PureComponent } from 'react'
import Axios from "axios";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class TableList extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      tableData: []
    }
  }
  componentDidMount(){
    Axios.get('https://5b5e71c98e9f160014b88cc9.mockapi.io/api/v1/lists')
    .then(res=>{
      res.data = [{"id":"1","name":"小红","age":20,"sex":"女"},{"id":"2","name":"小明","age":21,"sex":"男"},{"id":"3","name":"翠花","age":24,"sex":"女"},{"id":"4","name":"name 4","age":53,"sex":"sex 4"},{"id":"5","name":"name 5","age":82,"sex":"sex 5"}]
      this.setState({
        tableData: res.data
      });
           
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          {/* <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader> */}
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Age", "Gender"]}
              tableData={this.state.tableData}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                {id:"1", name:"Dakota Rice", price:"$36,738", hello:"Niger", world:"Oud-Turnhout"}
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    )
  }
}

TableList.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(TableList);
