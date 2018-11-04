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

import { withStyles } from '@material-ui/core/styles';

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
              <Button variant="contained" color="primary">
                Hello World
              </Button>
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

export default withStyles(styles)(App);
// export default App;
