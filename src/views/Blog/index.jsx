import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Logo,
  NavButton,
} from '../../components'

import './Blog.css'

class Blog extends Component {
  static propTypes = {}
  static defaultProps = {}

  state = {}

  render () {
    // 侧边栏
    const SideBar = (props) => {
      const style = {
        width: '15vw',
        minHeight: '100vh',
        backgroundColor: 'rgb(255, 255, 255)',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',

        ...props.style,
      }

      return (
        <div style={style}>
          {props.children}
        </div>
      )
    }
    // 主内容区
    const MainContent = (props) => {
      const style = {
        width: '100%',
        minHeight: '100vh',
        padding: '5px',

        backgroundColor: 'rgb(208, 208, 208)',

        ...props.style,
      }
      return (
        <div style={style}>
          {props.children}
        </div>
      )
    }
    // 文章分区类别
    const TabContent = (props) => {
      const tabStyle = {
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
        <div style={tabStyle}>
          {props.children}
          <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderTop: '1px solid rgb(91, 91, 91)',
              width: '80%',
              height: '6vh'}}>
            <button className="fa fa-weixin fa-lg iconButton"></button>
            <button className="fa fa-qq fa-lg iconButton"></button>
            <button className="fa fa-envelope fa-lg iconButton"></button>
          </div>
        </div>
      )
    }

    const navBaseConfig = {
      to: "/blog/javascript",
      icon: "fa fa-hand-o-right fa-lg",
      content: "javascript",
      style: {width: '100%', height: '7vh'},
      textStyle: {marginRight: '3vw', fontSize: '16px'},
      iconStyle: {marginLeft: '3vw'},
    }
    const nbConfigList = [
      {
        ...navBaseConfig,
      },{
        ...navBaseConfig,
        content: 'css',
        icon: 'fa fa-css3 fa-lg',
      },{
        ...navBaseConfig,
        content: 'webpack',
        icon: 'fa fa-suitcase fa-lg',
      },{
        ...navBaseConfig,
        content: 'design mode',
        icon: 'fa fa-modx fa-lg'
      }
    ]
    const tagNbConfigList = [
      {
        ...navBaseConfig,
        content: 'tags',
        icon: 'fa fa-tags fa-lg',
        style: {width: '100%', height: '7vh', backgroundColor: 'inherit'}
      },
    ]

    return (
      <div className="Blog">
        <SideBar>
          <Logo
            imgSrc={require('./avatar@0,5x.jpg')}
            boxStyle={{marginBottom: '10vh'}}/>

          {/**********************************/}
          {/* navbuttons list                 */}
          {nbConfigList.map((conf) => (
            <NavButton
              key={`nb-${conf.content}`}
              to={conf.to}
              icon={conf.icon}
              content={conf.content}
              style={conf.style}
              textStyle={conf.textStyle}
              iconStyle={conf.iconStyle}/>
          ))}
          {/**********************************/}
          <TabContent>
            {/**********************************/}
            {/* tags navbuttons list                 */}
            {tagNbConfigList.map((conf) => (
              <NavButton
                key={`nb-${conf.content}`}
                to={conf.to}
                icon={conf.icon}
                content={conf.content}
                style={conf.style}
                textStyle={conf.textStyle}
                iconStyle={conf.iconStyle}/>
            ))}
            {/**********************************/}
          </TabContent>
        </SideBar>
        <MainContent>
        </MainContent>
      </div>
    )
  }
}

export default Blog;
