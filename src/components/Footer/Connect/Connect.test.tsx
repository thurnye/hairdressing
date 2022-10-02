import React from 'react';
import ReactDOM from 'react-dom';
import Connect from './Connect';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Connect />, div);
  ReactDOM.unmountComponentAtNode(div);
});