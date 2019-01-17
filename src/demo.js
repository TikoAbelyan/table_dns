import React from 'react';
// import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import App from "./App";

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input:{
    opacity:0,
    transition:'0.4s'
  },
  button: {
    top: 550,
    background:"#c1c1c1"
  },
  placeholder: {
    height: 40,
  },
});

class DelayingAppearance extends React.Component {
  state = {
    loading: false,
    query: 'idle'
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleClickLoading = () => {
    this.setState(state => ({
      loading: !state.loading,
    }));
  };

  handleClickQuery = () => {
    clearTimeout(this.timer);

    if (this.state.query !== 'idle') {
      this.setState({
        query: 'idle',
        
      });
      return;
    }

    this.setState({
      query: 'progress',
      
    });
    this.timer = setTimeout(() => {
      this.setState({
        query: 'success',
        opacity:0
      });
      
    }, 2e3);
  };
 
  render() {
    const { classes } = this.props;
    const { query } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.placeholder}>
        
          {query === 'success' ? (
            <div>
              <Typography>Welcome to Calculate</Typography>
              <App />
            </div>
          ) : (<Fade
              in={query === 'progress'}
              style={{
                transitionDelay: query === 'progress' ? '800ms' : '0ms',
              }}
              unmountOnExit
            >
              <CircularProgress />
            </Fade>
          )
          }
        </div>
        <div>
        <Button onClick={this.handleClickQuery} className={classes.button}>
          {query !== 'idle' ? 'Reset' : 'Simulate a load'}
        </Button>
        </div>
      </div>
    );
  }
}

// DelayingAppearance.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(DelayingAppearance);
