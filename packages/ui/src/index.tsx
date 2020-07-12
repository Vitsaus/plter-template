import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './components/App';
import {RecoilRoot} from 'recoil';
import {
  BrowserRouter
} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </BrowserRouter>
  ,
  document.getElementById('app')
);
