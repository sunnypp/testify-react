import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import loadRows from '../utils/GoogleSheet.js';


export default ({match}) => {
  const [ sheet, setSheet ] = useState( match ? match.sheet : '12vrGNS-M8cwCXOPhhC64fORW-xRfVfmGsxW7Q3EZvpk');
  const [ page, setPage ] = useState( match ? match.page : 4 );
  const [ questions, setQuestions ] = useState([]);
  const [ answering, setAnswering ] = useState([]);

  const fetchQuestion = qs => {
    if ( !qs.length ) {
      alert("All questions seen!");
      return;
    }

    let new_qs = [ ...qs ];
    let [ temp ] = new_qs.splice(
      Math.floor( Math.random() * new_qs.length ),
      1
    );

    setQuestions( new_qs );
    setAnswering( [ temp, ...answering ] );
  };

  const loadQuestions = async ( sheet, page ) => {
    const fetchedQuestions = await loadRows( sheet, page );
    fetchQuestion(fetchedQuestions);
  };

  useEffect( _ => {
    loadQuestions( sheet, page );
  }, [ sheet, page ] );

  return (
    <>
      <input onChange={ e => setSheet(e.target.value) } value={sheet}/>
      <input onChange={ e => setPage(e.target.value) } value={page}/>
      <button onClick={ _ => fetchQuestion(questions) }>Next</button>
      <div>{ !!answering.length && answering[0].question }</div>
      <div>{ !!answering.length && answering[0].answer }</div>
    </>
  );
}

