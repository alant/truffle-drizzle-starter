import React, { Component } from 'react';

import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
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
    this.state = { storedData: null, newVal: null };
    this.contracts = context.drizzle.contracts;
  }

  async getStoredData() {
    // const contract = this.contracts.SimpleStorage;
    let storedData = await this.contracts.SimpleStorage.methods.storedData_().call();
    this.setState({storedData: storedData});
    // console.log("storedData: ", storedData);    
  }

  showCheckMetaMaskOverlay() {
    console.log("show the overlay@!");
  }
  showMetaMaskRejectMessage() {
    console.log("too bad you rejected it@!");
  }

  componentDidUpdate(prevProps) {
    if (this.props.SimpleStorage.initialized && this.props.SimpleStorage.initialized !== prevProps.SimpleStorage.initialized) {
      this.getStoredData();
    }
    if (this.props.checkMetaMask && this.props.checkMetaMask !== prevProps.checkMetaMask) {
      this.showCheckMetaMaskOverlay();
    }
    if (this.props.metaMaskReject && this.props.metaMaskReject !== prevProps.metaMaskReject) {
      this.showMetaMaskRejectMessage();
    }
    if (this.props.txSuccessful && prevProps.txSuccessful === false) {
      this.getStoredData();
    }

  }

  handleChange = (event) => {
    this.setState({newVal: event.target.value});
  }

  handleSubmit = (event) => {    
    this.contracts.SimpleStorage.methods.set.cacheSend(this.state.newVal);
    event.preventDefault();
  }

  render() {
    const { classes, onMetaMaskCheckDone, onTxErrorDone, onCheckingTxDone } = this.props;
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
          {/* <Grid container spacing={40} alignItems="flex-end">
            <div className={classes.heroContent}>             
                <div>
                  <Typography variant="subtitle1" align="center">
                    Storedata: {this.props.SimpleStorage.initialized ? ( this.state.storedData ) : (
                      <span>Loading...</span>
                      )}
                  </Typography>
                  <form onSubmit={this.handleSubmit} className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                      <InputLabel htmlFor="contractDataInput">New Value:</InputLabel>
                      <Input onChange={this.handleChange} id="contractDataInput" name="contractDataInput" autoFocus />
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                      Set
                    </Button>
                  </form>
                </div>
            </div>
          </Grid> */}
        </main>

        <Snackbar
          anchorOrigin={{ 'vertical': 'bottom', 'horizontal': 'right'} }
          open={this.props.checkingTx}
          autoHideDuration={45000}
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
    checkMetaMask: state.dappReducer.checkMetaMask,
    metaMaskReject: state.dappReducer.metaMaskReject,
    checkingTx: state.dappReducer.checkingTx,
    txSuccessful: state.dappReducer.txSuccessful
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMetaMaskCheckDone: () => dispatch({ type: "CHECK_METAMASK_DONE" }),
    onTxErrorDone: () => dispatch({ type: "TX_ERROR_METAMASK_DONE" }),
    onCheckingTxDone: () => dispatch({ type: "CHECKING_TX_UI_DONE" })
  };
};

export default drizzleConnect(withStyles(styles)(App), mapStateToProps, mapDispatchToProps);
