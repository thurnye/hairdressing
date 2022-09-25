import React from 'react';
import ReactDOM from 'react-dom';
import TextStyle from './TextStyle';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextStyle />, div);
  ReactDOM.unmountComponentAtNode(div);
});