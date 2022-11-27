import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Gallery />, div);
  ReactDOM.unmountComponentAtNode(div);
});