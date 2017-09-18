import React, { Component } from 'react';
import PropTypes from 'prop-types';

// TODO: [javascript, ] highlight
import './article.css';
import './javascript.css';

class Article extends Component {

  static propTypes = {}
  static defaultProps = {}

  state = {}

  // Article从始至终都没有触发componentWillMount，猜测是由Route控制了生命周期，
  // fetch data需要在 componentsDidMount 中进行，这也是react官方推荐的做法
  componentDidMount() {
    const {
      title,
    } = this.props.match.params;

    fetch(`http://localhost:3090/api/getArticle?title=${title.toString()}`, {
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
        this.setState({
          article: data,
        });
      })
      .catch(e => console.error(e));
  }

  render () {
    let content = '';
    let editTime;
    if (this.state.article) {
      const article = this.state.article[0];
      content = article.content;
      editTime = article.editTime;
    }
    return (
      <article
        className="article deep-1"
        dangerouslySetInnerHTML={{
          __html: `${content} \r\n \`${editTime}\``
        }}/>
    )
  }
}

export default Article;
