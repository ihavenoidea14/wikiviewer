import React from 'react';
import style from '../styles/index.styl';
import Result from './result.jsx';
import axios from 'axios';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      articles: []
    };
    this.getArticleSnippets = this.getArticleSnippets.bind(this);
    this.getSearchTerm = this.getSearchTerm.bind(this);
  }

  stripTags(articles) {
    return articles.map(article => {
      return { 'title': article.title, 'snippet': article.snippet.replace(/(<span class="searchmatch">|<\/span>)/ig, '') };
    });
  }

  async getArticleSnippets(subject) {
    if (subject) {
      let {data} = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${subject}&srnamespace=0&srqiprofile=classic&srprop=snippet&origin=*`);
      let {query} = data;
      this.setState({
        articles: [...this.stripTags(query.search)]
      });
    } else {
      let {data} = await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&utf8=1&rnnamespace=0&rnlimit=1origin=*`);
      let {query} = data;
      let article = query.random[0].title;
      let {realData} = await await axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${article}&srnamespace=0&srqiprofile=classic&srprop=snippet&origin=*`);
      let {realQuery} = realData;

      this.setState({
        articles: [...this.stripTags(realQuery.search)]
      });     
    }
  }

  getSearchTerm(e) {
    this.setState({
      subject: e.target.value
    });
  }

  render() {
    return (
      <div className='container'>
        <div className = 'title'>
          <h1>Wikipedia Viewer</h1>
        </div>
        <div className='form'>
          <div className='input pad'>
            <input onChange={this.getSearchTerm} type='text' placeholder='Search' />
          </div>
          <div className='button'>
            <button className='wikiButton' onClick={() => this.getArticleSnippets(this.state.subject)}>Go!</button>
            <button className='wikiButtonRandom padLeft' onClick={() => this.getArticleSnippets(this.state.subject)}>Random</button>
          </div>
        </div>
        {this.state.articles.length !== 0 ? <Result articles={this.state.articles} /> : null}
      </div>
    );
  }
}
