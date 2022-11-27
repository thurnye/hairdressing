import React from 'react';
import ReactDOM from 'react-dom';
import AccountNav from './AccountNav';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccountNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});