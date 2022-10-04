import React from 'react';
import ReactDOM from 'react-dom';
import BookOnline from './BookOnline';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BookOnline />, div);
  ReactDOM.unmountComponentAtNode(div);
});