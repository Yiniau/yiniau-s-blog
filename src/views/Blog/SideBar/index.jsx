import React from 'react';

import './sideBar.css';

// 侧边栏
const SideBar = (props) => {

  const {
    className,
    style,
    children,
  } = props;

  let cn = className || '';
  if (/Mobile/i.test(navigator.userAgent)) {
    cn === '' ? cn += ' hidden' : cn = 'hidden';
  }

  return (
    <div style={style} className={`blog_sidebar ${cn}`}>
      <button
        id="sideBarSwitch"
        className={`fa fa-list-ul fa-2 iconButton`}
        aria-hidden={true}
        onClick={toogleSideBar}></button>
      {children}
    </div>
  )
}

function toogleSideBar(e) {
  const sideBar = document.querySelector('.blog_sidebar');
  sideBar.className === 'blog_sidebar'
    ? sideBar.className = 'blog_sidebar show'
    : sideBar.className = 'blog_sidebar';
}

export default SideBar;
