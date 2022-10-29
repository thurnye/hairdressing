import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './Filter';

it('It should mount', (props:any) => {
  const div = document.createElement('div');
  const {getSort} = props
  ReactDOM.render(<Filter getSort={getSort}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});