import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

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
// the article self
import Article from './Article';
// svg anime
import BirdAnime from './BirdAnime';

import './Blog.css';

import fireworks from './fireworks';

//////=============static variable================
// /****/const navListUrl = 'http://localhost:9999/api/getNavList';
// /****/const navListUrl = 'http://localhost:8090/api/getNavList';
/****/const navListUrl = 'https://yiniau.com/api/getNavList';
//////============================================

class Blog extends Component {
  static defaultProps = {
    navBaseConfig : {
      to: "/blog",
      icon: "fa fa-chevron-right",
      content: "error",
      iconStyle: { marginLeft: '2vw' },
    },

    // 文章列表项激活样式
    childActiveStyle : {
      backgroundColor: 'rgba(211, 62, 255, 0.5)',
      boxShadow: '0 1px 6px #a600ff, 0 1px 4px #a600ff',
    },

    // 文章列表容器基础样式
    listShowStyle : {
      opacity: '1',
      padding: '0 20px',
    },
    listHideStyle : {
      opacity: '0',
      padding: '0 20px',
    },
  };

  state = {
    articleTitleList: {},
    navTabConfigList: [],
  };

  // 这里没有使用更通用的componentDidMount来获取数据
  // 因为只需要获取一次，并不是会在后期互动时被更改的资源
  componentWillMount() {
    fetch(navListUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      // cache: 'defult',
    })
      .then(res => {  // 失败处理
        if (res.ok) {
          return res;
        } else {
          const error = new Error(res.statusText);
          error.res = res;
          throw error;
        }
      })
      .then(res => res.json()) // 将获取的json数据转化成js对象
      .then(data => { // 将data放入state中
        this.setState((prevState, props) => {
          const { navBaseConfig } = props;
          const ntArray = Object.keys(data).map(navb => ({
            ...navBaseConfig,
            to: `/blog/${navb}`,
            content: navb,
          }));
          return {
            articleTitleList: data,
            navTabConfigList: ntArray,
          }
        });
        return data;
      })
      .catch(e => console.error(e));
  }

  componentDidMount() {
    this.setState(prevState => {
      const fw = fireworks();

      // 启动点击效果
      return {
        fireworks: fw,
      }
    });
  }

  /**
   * 侧边栏1级导航项点击事件处理函数
   * @method folderListEventHandler
   * @param  {SyntheticEvent}     e   React 合成事件
   * @return {null}                   [null]
   */
  folderListEventHandler = (e) => {
    const selectFolder = this.state.selectFolder;
    const ctargetId = e.currentTarget.id;
    this.setState({
      selectFolder: selectFolder === ctargetId ? '' : ctargetId,
      selectArticle: '',
    });
  };

  /**
   * 侧边栏2级导航项点击事件处理函数
   * @method titleListEventHandler
   * @param  {SyntheticEvent}     e   React 合成事件
   * @return {null}                   [null]
   */
  titleListEventHandler = (e) => {
    const selectArticle = this.state.selectArticle;
    const ctargetId = e.currentTarget.id;

    this.setState({
      selectArticle: selectArticle === ctargetId ? selectArticle : ctargetId,
    });
    e.stopPropagation(); // 停止传播以防止影响上层组件
  };

  render () {
    // state
    const {
      articleTitleList,
      navTabConfigList,
      selectArticle,
      selectFolder,
    } = this.state;
    // props
    const {
      navBaseConfig,
      childActiveStyle,
      listShowStyle,
      listHideStyle,
    } = this.props;

    // 卡片导航区配置(static)
    let tagNbConfigList = void 0;
    if (! /Mobile/i.test(navigator.userAgent)) {
      tagNbConfigList = [
        {
          ...navBaseConfig,
          content: 'tags',
          to: '/blog/tags',
          icon: 'fa fa-tags fa-lg',
          style: {
            width: '100%',
            height: '7vh',
            backgroundColor: 'inherit'
          }
        },
      ];
    }

    return (
      <div className="Blog">
        <canvas className="fireworks">canvas 不可用，请使用最新的现代浏览器</canvas>
        <SideBar className="deep-1">
          <Logo imgSrc={require('./avatar@90x90.jpg')} className='blog_sidebar_logo'/>

          <ALC>
            {/**********************************/}
            {/* navbuttons list                */}
            {navTabConfigList.map((conf) => {
              const {
                to,
                content,
                textStyle,
                iconStyle,
              } = conf;
              return (
                <ALC
                  id={content}
                  key={`alc-${content}`}
                  onClick={this.folderListEventHandler}>
                  <NavButton
                    key={`nb-${content}`}
                    to={'/blog'}
                    icon={conf.icon}
                    content={content}
                    textStyle={textStyle}
                    iconStyle={iconStyle}
                    isActive={selectFolder === content}/>
                  <ALC
                    boxStyle={
                      selectFolder === content
                      ? Object.assign(
                        {height: `${articleTitleList[content].length * 5}vh`,},
                        listShowStyle
                      ) : Object.assign({height: 0,}, listHideStyle)
                    }>
                    {articleTitleList[content].map(title => (
                      <ALC
                        id={title}
                        key={`alc-${content}-${title}`}
                        onClick={this.titleListEventHandler}>
                        <NavButton
                          key={`nb-${content}-${title}`}
                          to={`${to}/${title}`}
                          content={title}
                          textStyle={textStyle}
                          iconStyle={iconStyle}
                          activeStyle={childActiveStyle}
                          isActive={selectArticle === title}/>
                      </ALC>
                    ))}
                  </ALC>
                </ALC>
              )
            })}
            {/**********************************/}
          </ALC>

          <TabContent>
            {/**********************************/}
            {/* tags navbuttons list           */}
            {tagNbConfigList && tagNbConfigList.map((conf) => (
              <NavButton
                key={`nb-${conf.content}`}
                to={conf.to}
                icon={conf.icon}
                content={conf.content}
                textStyle={conf.textStyle}
                iconStyle={conf.iconStyle}/>
            ))}
            {/**********************************/}
          </TabContent>

        </SideBar>
        <MainContent>
          <Logo imgSrc={require('./avatar@90x90.jpg')} className='blog_mainContent_logo'/>
          <Switch>
            <Route exact strict path='/blog' component={BirdAnime}/>
            <Route path='/blog/:folder/:title' component={Article}/>
          </Switch>
        </MainContent>
      </div>
    )
  }
}

// 文章标题导航容器
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
const ALC = ArticleListContainer;
// 未选中准确文章时的文章浏览
// const ArticleList = props => {
//   const {  } = props;
//   return (
//     <div>
//       <canvas>
//
//       </canvas>
//     </div>
//   )
// }

export default Blog;

// <Article folder={folder} title={title}/>
// <Route path='/:folder/:title' component={Article}/>
