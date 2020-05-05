import React from 'react';
import ReactDOM from 'react-dom';
import MyEditor from './my-editor';
// import './index.less';
// import styles from './index.module.scss';

const App = () => (
  <div>
    <MyEditor />
  </div>
);


ReactDOM.render(<App />, document.getElementById('app'));
