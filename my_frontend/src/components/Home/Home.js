import React, { useState } from 'react';
import { Container, TextField, Button  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [text, setText] = useState(''); 

  const sendDataToBackend = () => {
    if (text.trim() !== '') {
      fetch('http://127.0.0.1:5000/process_text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json()) 
      .then((data) => {

        navigate('/processed', { state: { data_bandit: data.bandit_report , data_feedback : data.chatgpt_feedback } });
      })
      .catch((error) => {
        console.error('Error:', error);
      });}
    

  };


  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Container className='font_text'>
        <div>
        <h3 className='font_upper'>enter / paste your python code here below</h3>
      </div>
      <TextField
        multiline
        rows={20} 
        variant="outlined"
        fullWidth
        value={text}
        onChange={handleTextChange}
        className = 'custom-textfield'
      />
      <div >
      <div variant="contained" className="custom-button" onClick={sendDataToBackend}>
                look for issues in your code
        </div>
      </div>
      
      
    </Container>
  );
};

export default Home;
