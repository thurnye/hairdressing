import React from 'react';
import ReactDOM from 'react-dom';
import Categories from './Categories';

it('It should mount', (props:any) => {
  const div = document.createElement('div');
  const {closeToggleDrawer} = props
  ReactDOM.render(<Categories closeToggleDrawer={closeToggleDrawer}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});