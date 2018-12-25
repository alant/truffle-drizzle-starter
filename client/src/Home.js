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
  componentDidUpdate(prevProps) {
    const { onGetStoredValue } = this.props;
    if (this.props.SimpleStorage.initialized && this.props.SimpleStorage.initialized !== prevProps.SimpleStorage.initialized) {
      onGetStoredValue();
    }
    if (this.props.txSuccessful && prevProps.txSuccessful === false) {
      onGetStoredValue();
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
                    { 'Storeddata:' }
                    { this.props.gotStoredValue
                      ? this.props.storedValue
                      : <span> Loading... </span>
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

const mapStateToProps = state => {
  return {
    SimpleStorage: state.contracts.SimpleStorage,
    txSuccessful: state.dappReducer.txSuccessful,
    gotStoredValue: state.dappReducer.gotStoredValue,
    storedValue: state.dappReducer.storedValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetStoredValue: () => dispatch({ type: "GET_STORED_VALUE" })
  };
};

function withLoadingIndicator(Component) {
  return function EnhancedComponent({ isDrizzleLoading, ...props }) {
    if (!isDrizzleLoading) {
      return <Home {...props} />;
    }
    return <div>Drizzle loading</div>
  }
}

const HomeWithDrizzleLoadingIndicator = withLoadingIndicator(Home);

export default drizzleConnect(withStyles(styles)(HomeWithDrizzleLoadingIndicator), mapStateToProps, mapDispatchToProps);
