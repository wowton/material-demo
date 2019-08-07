/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";

function Icons(props) {
  const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>Material Design Icons</h4>
            <p className={classes.cardCategoryWhite}>
              Handcrafted by our friends from{" "}
              <a
                href="https://design.google.com/icons/?ref=creativetime"
                target="_blank"
              >
                Google
              </a>
              ，
              <a
                href="https://fontawesome.com/icons?d=gallery&m=free"
                target="_blank"
              >
                FontAwesome
              </a>
            </p>
          </CardHeader>
          <CardBody>
            <iframe
              className={classes.iframe}
              src="https://fontawesome.com/icons?d=gallery&m=free"
              title="Icons iframe"
            >
              <p>Your browser does not support iframes.</p>
            </iframe>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(iconsStyle)(Icons);
