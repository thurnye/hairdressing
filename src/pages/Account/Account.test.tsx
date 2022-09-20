import React from 'react';
import ReactDOM from 'react-dom';
import Account from './Account';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Account />, div);
  ReactDOM.unmountComponentAtNode(div);
});