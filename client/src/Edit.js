import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { drizzleConnect } from 'drizzle-react';
import PropTypes from 'prop-types';

class Edit extends Component {
  constructor(props, context) {
    super(props);
    this.state = { newVal: null };
    this.contracts = context.drizzle.contracts;
  }

  handleSubmit = (event) => {
    this.contracts.SimpleStorage.methods.set.cacheSend(this.state.newVal);
    event.preventDefault();
  }

  componentDidUpdate(prevProps) {
    const { onRedirectToHomeDone } = this.props;
    if (this.props.redirectToHome && this.props.redirectToHome !== prevProps.redirectToHome) {
      this.props.history.push('/');
      onRedirectToHomeDone();
    }
  }

  handleChange = (event) => {
    this.setState({newVal: event.target.value});
  }

  render() {
    const { onMetaMaskCheckDone, onTxErrorDone } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="contractDataInput">New Value:</InputLabel>
            <Input onChange={this.handleChange} id="contractDataInput" name="contractDataInput" autoFocus />
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Set
          </Button>
        </form>
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
              {"Please go to MetaMask's window to finish the transaction."}
            </DialogContentText>
            <LinearProgress />
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
              // className={classes.close}
              onClick={onTxErrorDone}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

Edit.contextTypes = {
  drizzle: PropTypes.object
}

const mapStateToProps = state => {
  return {
    checkMetaMask: state.dappReducer.checkMetaMask,
    metaMaskReject: state.dappReducer.metaMaskReject,
    redirectToHome: state.dappReducer.redirectToHome
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMetaMaskCheckDone: () => dispatch({ type: "CHECK_METAMASK_DONE" }),
    onTxErrorDone: () => dispatch({ type: "TX_ERROR_METAMASK_DONE" }),
    onRedirectToHomeDone: () => dispatch({ type: "REDIRECT_TO_HOME_DONE"})
  };
};

export default drizzleConnect(Edit, mapStateToProps, mapDispatchToProps);
