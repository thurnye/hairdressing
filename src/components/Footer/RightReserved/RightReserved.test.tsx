import React from 'react';
import ReactDOM from 'react-dom';
import RightReserved from './RightReserved';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RightReserved />, div);
  ReactDOM.unmountComponentAtNode(div);
});