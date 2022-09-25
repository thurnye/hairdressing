import React from 'react';
import ReactDOM from 'react-dom';
import FeaturedService from './FeaturedService';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FeaturedService />, div);
  ReactDOM.unmountComponentAtNode(div);
});