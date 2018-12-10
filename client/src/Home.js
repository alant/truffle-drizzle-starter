import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { withStyles } from '@material-ui/core/styles';

import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

const styles = theme => ({
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  }
});

class Home extends Component {
  constructor(props, context) {
    super(props);
    this.state = { storedData: null };
    this.contracts = context.drizzle.contracts;
  }

  async getStoredData() {
    let storedData = await this.contracts.SimpleStorage.methods.storedData_().call();
    this.setState({storedData: storedData});
  }

  componentDidMount() {
    if (this.props.SimpleStorage.initialized) {
      this.getStoredData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.SimpleStorage.initialized && this.props.SimpleStorage.initialized !== prevProps.SimpleStorage.initialized) {
      this.getStoredData();
    }
    if (this.props.txSuccessful && prevProps.txSuccessful === false) {
      this.getStoredData();
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
          <Grid container spacing={40} alignItems="flex-end">
            <div className={classes.heroContent}>
                <div>
                  <Typography variant="subtitle1" align="center">
                    Stored data: {
                      this.props.SimpleStorage.initialized ? (this.state.storedData) : (<span> Loading... </span>)
                    }
                  </Typography>
                </div>
            </div>
          </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

Home.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    SimpleStorage: state.contracts.SimpleStorage,
    txSuccessful: state.dappReducer.txSuccessful
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMetaMaskCheckDone: () => dispatch({ type: "CHECK_METAMASK_DONE" }),
    onTxErrorDone: () => dispatch({ type: "TX_ERROR_METAMASK_DONE" }),
  };
};

export default drizzleConnect(withStyles(styles)(Home), mapStateToProps, mapDispatchToProps);
