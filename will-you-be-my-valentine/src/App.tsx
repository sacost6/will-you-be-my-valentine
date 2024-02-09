import { useEffect, useState } from 'react'
import './App.css'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { Button, Typography } from '@mui/material';

const decisionButton = {
  color: 'white',
  marginX: '50px',
  backgroundColor: '#f9476c',
  '&:hover': {
    backgroundColor: '#ff8195'
  }
};

const feedBackMessages = [
  '',
  'pleaseeeeeee',
  ':((((((((',
  'you\'re being silly',
  'please reconsider',
  'is that really your answer :(',
  'don\'t make me do this...',
  'oh no, where did the other button go :)))'
]


function App() {

  const [ yesButtonSize, setYesButtonSize ] = useState(1);
  const [ disableNoButton, setDisableNoButton ] = useState(false);
  const [ feedbackMessage, setFeedbackMessage ] = useState('');
  const [ noCount, setNoCount ] = useState(0);
  const [ disableYesButton, setDisableYesButton ] = useState(false);

  const increaseYesButtonSize = () => setYesButtonSize(prevSize => prevSize + 0.2);

  const transitionAnimation = () => {
    const element = document.querySelector('.main-animation');
      if (element) {
        setTimeout(() => {
          element.classList.add('transitioned');
      }, 1500);
    }
  };
  

  const noButtonOnClickHandler = () => {
    increaseYesButtonSize();
    setNoCount(prevCount => prevCount + 1);
  };

  const yesButtonOnClickHandler = () => {
    setDisableYesButton(true);
    setDisableNoButton(true);
  };

  useEffect(() => {
    transitionAnimation();
  });

  useEffect(() => {
    if (noCount >= 7) {
      setDisableNoButton(true);
    }
    setFeedbackMessage(feedBackMessages[noCount]);
  }, [noCount]);



  return (
    <>
      <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 

      <div className='page' >

        <DotLottiePlayer
          className='main-animation' 
          src="https://lottie.host/32c035b9-d001-4b5d-89ab-141600fbd398/dMk4sGiiK2.json" 
          background="transparent"
          loop autoplay
          key='1'
        />
        <Typography 
          sx={{
              position: 'fixed',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -40%)',
              fontFamily: 'caveat',
              fontSize: '3rem',
              width: '100%',
              fontWeight: '700',
              color: '#ff8195',
              textAlign: 'center',
              marginBottom: '100px'

          }}
          className='visible-element'
        >
          Will you be my valentine?
        </Typography>
        <div className='buttons-container'>
          <Button 
            onClick={yesButtonOnClickHandler}
            disabled={disableYesButton}
            className='yes-button visible-element' 
            sx={{
              ...decisionButton, 
              transform: `scale(${yesButtonSize})`,
              transition: 'transform 0.2s ease',
              '&:disabled': {
                color: 'white'
              }
            }}>
            { disableYesButton ? 'u the best :)<3' : 'Yes' }
          </Button>

          { disableNoButton ? 
          <>
          </> :
            <Button
            disabled={disableNoButton}
            className='visible-element'
            sx={{
                ...decisionButton
            }} 
            onClick={noButtonOnClickHandler}>
            No
          </Button>
        }

        </div>

        <Typography 
          sx={{
            marginTop: '50px',
            height: '45px',
            display: 'flex',
            justifyContent: 'end',
            flexDirection: 'column',
            color: '#ff8195',
            fontWeight: 'bold'

          }}
        >
          { disableYesButton ? '' : feedbackMessage}
        </Typography>

          { disableYesButton ? (
            <>
              <div className="firework" style={{ left: '20%' }}></div>
              <div className="firework" style={{ left: '40%' }}></div>
              <div className="firework" style={{ left: '60%' }}></div>
              <div className="firework" style={{ left: '80%' }}></div>
              <div className="firework" style={{ left: '100%' }}></div>
            </>
            ) :
            <></>
          }

      </div>
    </>
  )
}

export default App
