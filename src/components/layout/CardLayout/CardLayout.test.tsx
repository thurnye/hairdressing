import React from 'react';
import ReactDOM from 'react-dom';
import CardLayout from './CardLayout';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CardLayout />, div);
  ReactDOM.unmountComponentAtNode(div);
});