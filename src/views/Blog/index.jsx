import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';

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
// 文章标题导航容器
import ALC from './ArticleListContainer';
// the article self
import Article from './Article';

import './Blog.css';

//////=============static variable================
/****/const navListUrl = 'http://yiniau.com/api/getNavList';
//////============================================

class Blog extends Component {
  static defaultProps = {
    navBaseConfig : {
      to: "/blog/javascript",
      icon: "fa fa-chevron-right",
      content: "error",
      iconStyle: { marginLeft: '2vw' },
    }
  }

  state = {
    articleTitleList: {},
    navTabConfigList: [],
  }

  // TODO: replace componentWillMount to componentDidMount
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
          // console.log(data)
          const ntArray = Object.keys(data).map(navb => ({
            ...navBaseConfig,
            content: navb,
          }));
          // console.log(ntArray);
          return {
            articleTitleList: data,
            navTabConfigList: ntArray,
          }
        });
        return data;
      })
      .catch(e => console.error(e));
  }

  // componentDidMount() {}

  titleListEventHandler = (e) => {
    const selectArticle = this.state.selectArticle;
    const targetId = e.currentTarget.id;

    this.setState({
      selectArticle: selectArticle === targetId ? '' : targetId
    });
  }

  render () {

    const {
      articleTitleList,
      navTabConfigList,
      selectArticle,
    } = this.state;

    const {
      navBaseConfig,
    } = this.props;

    // 卡片导航区配置(static)
    const tagNbConfigList = [
      {
        ...navBaseConfig,
        content: 'tags',
        icon: 'fa fa-tags fa-lg',
        style: {
          width: '100%',
          height: '7vh',
          backgroundColor: 'inherit'
        }
      },
    ]

    return (
      <div className="Blog">
        <SideBar className="deep-1">
          <Logo imgSrc={require('./avatar@0,5x.jpg')}/>

          <ALC>
            {/**********************************/}
            {/* navbuttons list                */}
            {navTabConfigList.map((conf) => (
              <ALC
                id={conf.content}
                key={`alc-${conf.content}`}
                onClick={this.titleListEventHandler}
                boxStyle={{
                  height: 'auto'
                }}>
                <NavButton
                  key={`nb-${conf.content}`}
                  to={conf.to}
                  icon={conf.icon}
                  content={conf.content}
                  textStyle={conf.textStyle}
                  iconStyle={conf.iconStyle}
                  isActive={selectArticle === conf.content}/>
                <ALC
                  boxStyle={
                    selectArticle === conf.content
                    ? {
                      opacity: '1',
                      padding: '0 20px',
                      height: `${articleTitleList[conf.content].length * 5}vh`,
                    } : {
                      opacity: '0',
                      padding: '0 20px',
                      height: 0,
                    }
                  }>
                  {articleTitleList[conf.content].map(title => (
                    <NavButton
                      key={`nb-${conf.content}-${title}`}
                      to={`${conf.to}/${title}`}
                      content={title}
                      textStyle={conf.textStyle}
                      iconStyle={conf.iconStyle}/>
                  ))}
                </ALC>
              </ALC>
            ))}
            {/**********************************/}
          </ALC>

          <TabContent>
            {/**********************************/}
            {/* tags navbuttons list           */}
            {tagNbConfigList.map((conf) => (
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
          <Route path='/blog/:folder/:title' component={Article}/>
        </MainContent>
      </div>
    )
  }
}

export default Blog;

// <Article folder={folder} title={title}/>
// <Route path='/:folder/:title' component={Article}/>
