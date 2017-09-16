import React from 'react'

const TabContent = (props) => {
  const style = {
    width: '14.4vw',
    backgroundColor: 'rgb(210, 210, 210)',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    position: 'fixed',
    bottom: '0',

    ...props.boxStyle,
  }
  return (
    <div style={style} className="deep-2">
      {props.children}
      <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          borderTop: '1px solid rgb(91, 91, 91)',
          width: '80%',
          height: '6vh'}}>
        <button className="fa fa-weixin fa-lg iconButton" disabled></button>
        <button className="fa fa-qq fa-lg iconButton" disabled></button>
        <button className="fa fa-envelope fa-lg iconButton" disabled></button>
      </div>
    </div>
  )
}

export default TabContent;
