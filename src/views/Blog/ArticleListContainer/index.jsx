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
      style={
        props.isHidden
        ? {opacity: 0, ...boxStyle}
        : {opacity: 1, ...boxStyle}
      }>
      {children}
    </div>
  )
}

export default ArticleListContainer;
