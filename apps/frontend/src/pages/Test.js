import React, {
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import {
  color,
  fontSize,
  space,
  width,
} from 'styled-system';
import loadRows from '../utils/GoogleSheet.js';
import { isEmpty } from '@testify-react/validator';
import Markdown from 'react-markdown';

const Header = styled.header`
  ${space}

  ${color}
  ${fontSize}

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  width: 100%;

`

const Input = styled.input`
  appearance: none;
  border: none;

  ${width}

  ${fontSize}

  background: transparent;
  color: rgb(200,200,190);
`

const Label = styled.div`
  ${fontSize}

  flex: 1;
  padding-right: 30px;

  color: white;
  text-align: right;
`

const Text = styled.div`
  ${space}
`

const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;

  background: linear-gradient(90deg, rgba(243, 72, 104,1) 20.5625%,rgba(242, 71, 104,1) 20.5625%,rgba(158, 0, 236,1) 80.5625%);
  font-family: Arial, sans-serif;
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  flex: 1;
`

const Button = styled.button`
  border: none;

  ${fontSize}
  ${space}
  width: 100%;

  background: rgba(255,255,255,.4);
  border-radius: 20px;
  color: white;
  text-transform: uppercase;
  
  :disabled {
    color: #999;
  }
`

const QuestionArea = styled.section`
  ${fontSize}
  ${space}

  display: flex;
  flex-direction: column;
  
  position: relative;

  width: 100%;
  max-width: 90vw;

  color: white;
  flex: 1;
  text-align: center;
  overflow: scroll;
`

const Center = styled.div`
  margin: auto;
`
const Edit = styled.a`
  ${fontSize}

  position: absolute;
  top: 30px;
  right: 30px;

  color: #AAA;
  font-style: italic;
`

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
    <Container>
      <Header p={[3,4]}>
        <Flex>
          <Label>Sheet</Label>
          <Input color={'rgb(100,100,80)'} fontSize={[3,4,5]} onChange={ e => setSheet(e.target.value) } value={sheet}/>
        </Flex>
        <Flex>
          <Label>Page</Label>
          <Input color={'rgb(100,100,80)'} fontSize={[3,4,5]} onChange={ e => setPage(e.target.value) } value={page}/>
        </Flex>
      </Header>
      <QuestionArea p={[3,4]} fontSize={[4,5,6]}>
        <Edit fontSize={[2,3]} href={`https://docs.google.com/spreadsheets/d/${sheet}/edit#gid=0`} target='_blank'>Edit Sheet</Edit>
        <Center>
          <Text my={3}>{ !!answering.length && <Markdown source={ answering[0].question }/> }</Text>
          <Text>{ showAnswer && !!answering.length && <Markdown source={ answering[0].answer }/> }</Text> 
        </Center>
      </QuestionArea>
      <Button fontSize={[3,4,5]} my={[1,2]} p={[3,4]} onClick={ _ => setShowAnswer(true) } disabled={showAnswer}>Show Answer</Button>
      <Button fontSize={[3,4,5]} my={[1,2]} p={[3,4]} onClick={ _ => { fetchQuestion(questions); setShowAnswer(false); } }>Next</Button>
    </Container>
  );
}

