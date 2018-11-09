import React, { Component } from 'react';

import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withStyles } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { drizzleConnect } from 'drizzle-react';


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
    // console.log('A val was submitted: ' + this.state.newVal);
    const stackId = this.contracts.SimpleStorage.methods.set.cacheSend(this.state.newVal);
    event.preventDefault();
  }

  render() {
    const { classes, onMetaMaskCheckDone, onTxErrorDone, onCheckingTxDone } = this.props;
    return (
      <div className="App">
        <CssBaseline />
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" align="left" noWrap className={classes.toolbarTitle}>
              Awesome Dapp
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <main>
          <Grid container spacing={40} alignItems="flex-end">
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
          </Grid>
        </main>
        <Dialog
          open={this.props.checkMetaMask}
          onClose={onMetaMaskCheckDone}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"It's time to check your metamask extension"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please go to MetaMask's window to finish the transaction.
              <LinearProgress />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onMetaMaskCheckDone} color="primary" autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ 'vertical': 'bottom', 'horizontal': 'right'} }
          open={this.props.metaMaskReject}
          autoHideDuration={6000}
          onClose={onTxErrorDone}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">You rejected the TX</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={onTxErrorDone}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
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
