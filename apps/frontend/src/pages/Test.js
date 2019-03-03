import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import loadRows from '../utils/GoogleSheet.js';
import { isEmpty } from '@testify-react/validator';

export default props => {
  const [ sheet, setSheet ] = useState('12vrGNS-M8cwCXOPhhC64fORW-xRfVfmGsxW7Q3EZvpk');
  const [ page, setPage ] = useState('1');
  const [ questions, setQuestions ] = useState([]);
  const [ answering, setAnswering ] = useState([]);
  const [ showAnswer, setShowAnswer ] = useState(false);

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
    setShowAnswer(false);
  };

  useEffect( _ => {
    if ( isEmpty(sheet) || isEmpty(page) ) {
      return;
    }
    loadQuestions( sheet, page );
  }, [ sheet, page ] );

  return (
    <>
      <input onChange={ e => setSheet(e.target.value) } value={sheet}/>
      <input onChange={ e => setPage(e.target.value) } value={page}/>
      <div>{ !!answering.length && answering[0].question }</div>
      { showAnswer && <div>{ !!answering.length && answering[0].answer }</div> }
      <button onClick={ _ => setShowAnswer(true) } disabled={showAnswer}>Show Answer</button>
      <button onClick={ _ => { fetchQuestion(questions); setShowAnswer(false); } }>Next</button>
    </>
  );
}

