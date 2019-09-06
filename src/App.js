import React from 'react'
import './App.css'
import Video from './video'
import Title from './Title'
import EmotionAnalysis from './EmotionAnalysis'
import './stylesheet.css'
import Button from 'react-bootstrap/Button'


const videoName = [
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED"
]

const videoLink = [
  "https://www.youtube.com/watch?v=8u8A9dp7x3g",
  "https://www.youtube.com/watch?v=LTn90dTakOE",
  "https://www.youtube.com/watch?v=20HA9GLkOvM"
]

class App extends React.Component {

  whichVideoNo = 0;

  componentDidMount() {
    componentDidMount() {
    setInterval(() => {
      this.setState(() => {
        return this.whichVideoNo;
      });
    }, 1);
  }
  }


  render() {
    return (
    <div className="BG">
      <div className="title">
        <Title title={'How brave are you?'} />
        </div>
      <div class="flex-container">
      <div clsss="left">
      <div className="title-1">
        <h1>Please Select Your Level</h1>
        </div>
        <div class="buttonGroup">

        <div class="Beginner">
        <Button variant="primary" onClick={() =>
          this.whichVideoNo = 0
        }>BEGINNER</Button>
        </div>

        <div class="Beginner">
        <Button variant="secondary" onClick={() =>
          this.whichVideoNo = 1
        }>INTERMEDIATE</Button>
        </div>

        <div class="Beginner">
        <Button class="Advanced" variant="danger" onClick={() =>
          this.whichVideoNo = 2
        }>ADVANCED</Button>
        </div>
       
        </div>
        <div class="videoplay">
        <Video Name={videoName[this.whichVideoNo]} Link={videoLink[this.whichVideoNo]} />
        </div>
        </div>
        <div class="right">
        <EmotionAnalysis />
        </div>
        </div>
        </div>
        
        


    )
  }
}

export default App;