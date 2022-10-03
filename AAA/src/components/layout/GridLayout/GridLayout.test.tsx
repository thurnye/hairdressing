import React from 'react';
import ReactDOM from 'react-dom';
import GridLayout from './GridLayout';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GridLayout />, div);
  ReactDOM.unmountComponentAtNode(div);
});