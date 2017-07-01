import axios from 'axios';

function getArticleSnippets(subject) {
  return axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${subject}&srnamespace=0&srqiprofile=classic&srprop=snippet`);
}

async function main() {
  let {data} = await getArticleSnippets('soccer')
  let {query} = data;
  query.search.map(v => {
    //console.log(`${v.snippet.replace(/\<\w+\>/ig, '')}\r\n`);
    console.log(v.title + ' ' + v.snippet.replace(/(<span class="searchmatch">|<\/span>)/ig, '') + '\r\n');
    //console.log(v.snippet + '\r\n');
  })
}

main();