export default ( id, page = 1 ) => {
  let url = `https://spreadsheets.google.com/feeds/list/${id}/${page}/public/values?alt=json`;

  return new Promise(resolve => {
    fetch(url)
      .then(res => res.json() )
      .then( data => {
        const entries = data.feed.entry;

        if( entries && entries.length > 0 ) {
          resolve(
            entries.reduce( ( prev, entry ) => {
              let obj = {};
              for( let x in entry ) {
                if( x.includes('gsx$') && entry[x].$t ){
                  obj[x.split('$')[1]] = entry[x]['$t'];
                }
              }
              return [ ...prev, obj ];
            }, [] )
          );
        }
      });
  });
}


