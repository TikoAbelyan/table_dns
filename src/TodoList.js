import React, { Component } from 'react';
import paginate from 'paginate-array';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import CircularProgress from '@material-ui/core/CircularProgress';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    tableRow: {
      cursor: 'pointer'
    },
    panel: {
      width: '100%' ,
      display: 'flex',
      justifyContent: 'space-between!important'
    },
    tableCell: {
      padding: '0'
    } ,
    heading: {
      width: '100%'
    }
  });





class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      size: 5,
      page: 1,
      currPage: null
    }

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`)
      .then(response => response.json())
      .then(todos => {
        const { page, size } = this.state;

        const currPage = paginate(todos, page, size);

        this.setState({
          ...this.state,
          todos,
          currPage
        });
      });
  }

  previousPage() {
    const { currPage, page, size, todos } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(todos, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }

  nextPage() {
    const { currPage, page, size, todos } = this.state;

    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(todos, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }

  handleChange(e) {
    const { value } = e.target;
    const { todos, page } = this.state;

    const newSize = +value;
    const newPage = 1;
    const newCurrPage = paginate(todos, newPage, newSize);

    this.setState({
      ...this.state,
      size: newSize,
      page: newPage,
      currPage: newCurrPage
    });
  }

  
  render() {
    const { page, size, currPage } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div>page: {page}</div>
        <div>size: {size}</div>
        <div>
          <label for="size">Size</label>
          <select name="size" id="size" onChange={this.handleChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>



        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>
                    <i className="material-icons arrow" onClick={this.sortUp}>
                      arrow_drop_up

                    </i>
                    ID
                </TableCell>
                <TableCell align="right">
                    <i className="material-icons arrow" >
                    arrow_drop_up
                    </i>
                    firstName
                </TableCell>
                <TableCell align="right">
                  <i className="material-icons arrow" >
                    arrow_drop_down
                  </i>
                    lastName
                </TableCell>
                <TableCell align="right">
                  <i className="material-icons arrow" >
                    arrow_drop_down
                  </i>
                  email
                </TableCell>
                <TableCell align="right">
                  <i className="material-icons arrow" >
                    arrow_drop_down
                  </i>
                  phone
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Paper>







        {currPage &&
          <div>
            {currPage.data.map(todo =>
                       




<Table key={todo.id}>
                      <TableBody>
                        <TableRow>
                      <TableCell component="th" scope="row" className={classes.tableCell}>
                        <ExpansionPanel>
                          <ExpansionPanelSummary >
                            <div className={classes.panel}>
                            <Typography className={classes.heading} component="div">{todo.id}</Typography>
                            <Typography className={classes.heading} component="div">{todo.firstName}</Typography>
                            <Typography className={classes.heading} component="div">{todo.lastName}</Typography>
                            <Typography className={classes.heading} component="div">{todo.email}</Typography>
                            <Typography className={classes.heading} component="div">{todo.phone}</Typography>
                            </div>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <Typography component="h1" variant="h5">
                              {todo.firstName} {todo.lastName}
                            </Typography>
                          </ExpansionPanelDetails>
                          <ExpansionPanelDetails className="info">
                            <List className={classes.root}>
                              <ListItem>
                                <ListItemText primary="Description" secondary={todo.description} />
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText primary="Street" secondary={todo.address.streetAddress} />
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText primary="City" secondary={todo.address.city} />
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText primary="State" secondary={todo.address.state} />
                              </ListItem>
                              <Divider component="li" />
                              <ListItem>
                                <ListItemText primary="Index" secondary={todo.address.zip} />
                              </ListItem>
                              <Divider component="li" />
                            </List>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </TableCell>
                    </TableRow>
                      </TableBody>
                      
                    </Table>





                 )}
          </div>
        }
        <button onClick={this.previousPage}>Previous Page</button>
        <button onClick={this.nextPage}>Next Page</button>
      </div>
    )
  }
}

export default withStyles(styles)(TodoList);