import React, { Component } from 'react';

import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import Home from './Home';
import Edit from './Edit';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  }
});

const EditBtn = withRouter(({ history }) => (
  <Button color="inherit" onClick={() => { history.push('/edit') }}>
    Edit
  </Button>
))

const HomeBtn = withRouter(({ history }) => (
  <Button color="inherit" onClick={() => { history.push('/') }}>
    Home
  </Button>
))

class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = { storedData: null, newVal: null, drizzleState: null };
    this.contracts = context.drizzle.contracts;
  }

  render() {
    const { classes, onCheckingTxDone } = this.props;
    return (
      <Router>
        <div className="App">
          <CssBaseline />
          <AppBar position="static" color="default" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" align="left" noWrap className={classes.toolbarTitle}>
                Awesome Dapp
              </Typography>
              <HomeBtn />
              <EditBtn />
            </Toolbar>
          </AppBar>
          <main>
            <Route exact path="/" component={Home} />
            <Route path="/edit" component={Edit} />
          </main>

          <Snackbar
            anchorOrigin={{ 'vertical': 'bottom', 'horizontal': 'right'} }
            open={this.props.checkingTx}
            autoHideDuration={60000}
            onClose={onCheckingTxDone}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={
              <div>
                <span id="message-id">
                  Checking transaction on blockchain
                </span>
                <CircularProgress size={20} />
              </div>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onCheckingTxDone}
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />

          <p> Built by alant with <span role="img" aria-label="Love">❤️</span> </p>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

App.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    drizzleStatus: state.drizzleStatus,
    SimpleStorage: state.contracts.SimpleStorage,
    checkingTx: state.dappReducer.checkingTx
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckingTxDone: () => dispatch({ type: "CHECKING_TX_UI_DONE" })
  };
};

export default drizzleConnect(withStyles(styles)(App), mapStateToProps, mapDispatchToProps);
