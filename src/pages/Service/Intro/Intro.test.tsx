import React from 'react';
import ReactDOM from 'react-dom';
import Intro from './Intro';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Intro />, div);
  ReactDOM.unmountComponentAtNode(div);
});