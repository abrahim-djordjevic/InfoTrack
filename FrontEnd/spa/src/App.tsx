import './styles/App.css';
import Header from './components/Header';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import APIHelper from './utils/APIHelper';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [phrase, setPhrase] = useState<string>("");
  const [results, SetResults] = useState<number[] | null>(null);
  const apiHelper = new APIHelper();

  const findQueryIndex = async () => 
  {
    SetResults(null);
    setLoading(true);
    const results = await apiHelper.getQueryResults(query, phrase);
    setLoading(false);
    SetResults(results);
  }

  return (
    <div className="info-track-app">
      <Header />
      { !loading && 
        <div className='info-track-app-body'>
          <div className='info-track-container'>
            <p>Enter the search query in the query input</p>
            <p>Enter the phrase you want to find in the search results in the phrase input</p>
          </div>
          <div className='info-track-container'>
            <Form>
              <Form.Group className='query'>
                <Form.Label>Query</Form.Label>
                <Form.Control type='text' onChange={(e:any) => setQuery(e.target.value)} />
              </Form.Group>
              <Form.Group className='phrase'>
                <Form.Label>Phrase</Form.Label>
                <Form.Control type='text' onChange={(e:any) => setPhrase(e.target.value)}  />
              </Form.Group>
            </Form>
            <div style={{
              width:"100%",
              textAlign:"center"
            }}>
              <Button 
                className='btn btn-primary find-btn'
                onClick={async () => { await findQueryIndex() }}
              >
                Find Phrase in Search Results
              </Button>
            </div>
          </div>
          { results !== null && 
            <div className='info-track-container'>
              <p>Phrase was found in these results</p>
              <p style={{wordWrap:"break-word"}}>{results.toString()}</p>
            </div>
          }
        </div>
      }
      {loading &&
        <div className='info-track-app-body'>
          <Modal
            show={loading}
            centered={true}
          >
            <div 
              className='' 
              style={{
                textAlign:"center",
                marginTop:"20px",
                marginBottom:"20px"
              }}
            >
              <Spinner animation='border' variant='primary' style={{width: "4rem", height: "4rem"}}/>
          </div>
          </Modal>
        </div>
      }
    </div>
  );
}

export default App;
