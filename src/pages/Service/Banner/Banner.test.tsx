import React from 'react';
import ReactDOM from 'react-dom';
import Banner from './Banner';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Banner />, div);
  ReactDOM.unmountComponentAtNode(div);
});