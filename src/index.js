import React, { Component } from 'react';
import { render } from 'react-dom';
import TodoList from './TodoList';
// import './style.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <TodoList />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));