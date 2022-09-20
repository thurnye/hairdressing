import React from 'react';
import ReactDOM from 'react-dom';
import Service from './Service';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Service />, div);
  ReactDOM.unmountComponentAtNode(div);
});