import React from 'react';

const ArticleListContainer = (props) => {
  const {
    id,
    onClick,
    boxStyle,
    children,
  } = props

  return (
    <div
      id={id}
      onClick={onClick}
      className='alc'
      style={boxStyle}>
      {children}
    </div>
  )
}

export default ArticleListContainer;
