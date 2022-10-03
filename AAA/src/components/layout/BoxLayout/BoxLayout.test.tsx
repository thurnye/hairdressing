import React from 'react';
import ReactDOM from 'react-dom';
import BoxLayout from './BoxLayout';

it('It should mount', (props:any) => {
  const div = document.createElement('div');
  ReactDOM.render(<BoxLayout children={props.children} className={props.className}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});