import React from 'react';
import ReactDOM from 'react-dom';
import FeaturedProducts from './FeaturedProducts';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FeaturedProducts />, div);
  ReactDOM.unmountComponentAtNode(div);
});