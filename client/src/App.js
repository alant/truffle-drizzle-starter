import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

import { withStyles } from '@material-ui/core/styles';

import { drizzleConnect } from 'drizzle-react'


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
  },
})

class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = { storedData: null, newVal: null };
    this.contracts = context.drizzle.contracts;
  }

  async getStoredData() {
    console.log("componentDidMount!");
    const contract = this.contracts.SimpleStorage;
    console.log("this.contracts: ",  this.contracts);
    console.log("contract: ", contract);

    let storedData = await this.contracts.SimpleStorage.methods.storedData_().call();
    this.setState({storedData: storedData});
    console.log("storedData: ", storedData);    
  }

  componentDidUpdate(prevProps) {
    if (this.props.SimpleStorage.initialized && this.props.SimpleStorage.initialized !== prevProps.SimpleStorage.initialized) {
      this.getStoredData();
    }
  }

  handleChange = (event) => {
    this.setState({newVal: event.target.value});
  }

  handleSubmit = (event) => {    
    console.log('A val was submitted: ' + this.state.newVal);
    const stackId = this.contracts.SimpleStorage.methods.set.cacheSend(this.state.newVal);
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
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
    SimpleStorage: state.contracts.SimpleStorage
  }
}

export default drizzleConnect(withStyles(styles)(App), mapStateToProps);
// export default App;
