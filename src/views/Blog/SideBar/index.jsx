import React from 'react';

// 侧边栏
const SideBar = (props) => {
  const style = {
    width: '15vw',
    minHeight: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0)',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',

    ...props.style,
  }

  return (
    <div style={style} className={props.className}>
      {props.children}
    </div>
  )
}

export default SideBar;
