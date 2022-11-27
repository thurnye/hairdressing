import React from 'react';
import ReactDOM from 'react-dom';
import PriceList from './PriceList';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PriceList />, div);
  ReactDOM.unmountComponentAtNode(div);
});