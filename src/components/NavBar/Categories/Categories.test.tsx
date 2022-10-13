import React from 'react';
import ReactDOM from 'react-dom';
import Categories from './Categories';

it('It should mount', (props:any) => {
  const div = document.createElement('div');
  const {closeToggleDrawer, component, active} = props
  ReactDOM.render(<Categories closeToggleDrawer={closeToggleDrawer} component={component} active={active}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});