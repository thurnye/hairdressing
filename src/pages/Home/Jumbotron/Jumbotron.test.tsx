import React from 'react';
import ReactDOM from 'react-dom';
import Jumbotron from './Jumbotron';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Jumbotron />, div);
  ReactDOM.unmountComponentAtNode(div);
});