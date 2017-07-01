import React from 'react';

export default (props) => {
  let results = props.articles.map((article, i) => (
    <div key={i} className='result'>
      <h3><a href={`https://wikipedia.org/wiki/${article.title}`} target='_blank'>{article.title}</a></h3>
      <p>{article.snippet}</p>
    </div>
  ));

  return (
    <div>
      {results}
    </div>
  );
}
