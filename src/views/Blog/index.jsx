import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Logo,
  NavButton,
} from '../../components'

// 侧边栏
import SideBar from './SideBar';
// 主内容区
import MainContent from './MainContent';
// 文章分区类别
import TabContent from './TabContent';

import './Blog.css'

class Blog extends Component {
  static propTypes = {}
  static defaultProps = {}

  state = {}

  // componentDidMount() {
  //   fetch()
  // }
  render () {

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
