import React, { Component } from 'react';
// import PropTypes from 'prop-types';

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

import './Blog.css'

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

  componentWillMount() {
    fetch('http://localhost:3090/api/getNavList', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      cache: 'defult',
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
      .then(res => res.json())
      .then(data => {
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
      .then(data => {
        console.log(`fetch navList data: ${this.state.navTabConfigList}`);
      })
      .catch(e => console.error(e));
  }

  // componentDidMount() {}

  titleListEventHandler = (e) => {
    this.setState({
      selectArticle: e.currentTarget.id,
    });
    // console.log(e.currentTarget);
  }

  render () {

    const {
      articleTitleList,
      navTabConfigList,
      selectArticle,
    } = this.state;

    const tagNbConfigList = [
      {
        ...this.props.navBaseConfig,
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
        <SideBar>
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
                      padding: '0 20px',
                      height: `${articleTitleList[conf.content].length * 6}vh`,
                    } : {
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
        </MainContent>
      </div>
    )
  }
}

export default Blog;
