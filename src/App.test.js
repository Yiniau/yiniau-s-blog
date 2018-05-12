import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

test("script: store.js without 'target not directory'", () => {
  const fileReg = /\.(.*)$/i;
  expect(
    [
      'test.md',
      'dir_1',
      'dir_2',
      'file.js'
    ].filter(fileName => !fileReg.test(fileName))
  ).toBe(['dir_1', 'dir_2']);
})