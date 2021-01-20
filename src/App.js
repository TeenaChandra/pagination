import React from 'react';
import axios from 'axios';

const USERS_URL = 'https://hn.algolia.com/api/v1/search?query=react&';

export default function App() {

  const [results, setresults] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [firstbool, setFirstBool] = React.useState(false);
  
React.useEffect(() => {
axios.get(`${USERS_URL}page=${page}`)
  .then(response => setresults(response.data.hits));
},[page]);

const setFirst = () => {
  if(!firstbool){
    setFirstBool(true);
  } else{
    setPage(0);
  }
}

 const setPrevious = () => {
    if(page !== 0){
      let count = page-1;
      setPage(count);
    }
  }

  const setNext = () => {
    console.log('yes i am here')
    if(page !== 4){
      let count = page+1;
      setPage(count);
    }
  }

  const setLast = () => {
    setPage(4);
}


    return (
        <div>
            <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
                <tbody data-testid="results">
                  {
                    firstbool &&
                    results.map((result, index) => {
                    return(
                      <tr key={index} data-testid="row">
                        <td>{result.title}</td>
                        <td>{result.url}</td>
                        <td>{result.author}</td>
                      </tr>)
                  })
                }
                </tbody>
            </table>
        <section className="pagination">
            <button className="first-page-btn" onClick={setFirst} >first</button>
            <button className="previous-page-btn" disabled={page === 0 ? true: false} onClick={setPrevious}>previous</button>
            <button className="next-page-btn" disabled={page === 4 ? true: false} onClick={setNext}>next</button>
            <button className="last-page-btn" onClick={setLast}>last</button>
        </section>
    </div>
    );
};
