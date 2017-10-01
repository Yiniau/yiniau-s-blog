import React, { Component } from 'react';
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
    }
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


  folderListEventHandler = (e) => {
    const selectFolder = this.state.selectFolder;
    const ctargetId = e.currentTarget.id;

    this.setState({
      selectFolder: selectFolder === ctargetId ? selectFolder : ctargetId,
    });
  };
  titleListEventHandler = (e) => {
    const selectArticle = this.state.selectArticle;
    const ctargetId = e.currentTarget.id;

    this.setState({
      selectArticle: selectArticle === ctargetId ? selectArticle : ctargetId,
    });
  };

  render () {

    const {
      articleTitleList,
      navTabConfigList,
      selectArticle,
      selectFolder,
    } = this.state;

    const {
      navBaseConfig,
    } = this.props;

    // 卡片导航区配置(static)
    const tagNbConfigList = [
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
                onClick={this.folderListEventHandler}
                boxStyle={{height: 'auto'}}>
                <NavButton
                  key={`nb-${conf.content}`}
                  to={conf.to}
                  icon={conf.icon}
                  content={conf.content}
                  textStyle={conf.textStyle}
                  iconStyle={conf.iconStyle}
                  isActive={selectFolder === conf.content}/>
                <ALC
                  boxStyle={
                    selectFolder === conf.content
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
                    <ALC
                      id={title}
                      key={`alc-${conf.content}-${title}`}
                      onClick={this.titleListEventHandler}
                      boxStyle={{height: 'auto'}}>
                      <NavButton
                        key={`nb-${conf.content}-${title}`}
                        to={`${conf.to}/${title}`}
                        content={title}
                        textStyle={conf.textStyle}
                        iconStyle={conf.iconStyle}
                        activeStyle={{
                          backgroundColor: 'rgba(211, 62, 255, 0.5)',
                          boxShadow: '0 1px 6px #a600ff, 0 1px 4px #a600ff',
                        }}
                        isActive={selectArticle === title}/>
                    </ALC>
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
