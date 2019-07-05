import React from 'react';
import { useState } from 'react';
import MyWebcam from './MyWebcam'
import ProgressBar from 'react-bootstrap/ProgressBar';
import Alert from 'react-bootstrap/Alert'
import {Container, Row, Col} from 'react-bootstrap';
import './Emotion.css'


function EmotionAnalysis() {
    const [result, updateResult] = useState(0);
    return (
        <div class = "jj">
             <div class = "aa">
            <Result result={result} />
            </div>
            <div class = "bb">
            <MyWebcam onReceivedResult={updateResult}/>
            </div>
        </div>
    );
}

function getProgressBarColour(percent) {
    var variant = "";
        if (percent <= 50) {
            variant = "success";
        } else if (percent <= 90) {
            variant = "warning";
        } else {
            variant = "danger";
        }
        return variant;
    }

function Result(props) {
    return (
        <div class="score">
            <Container>
                <Row>
                    <Col />
                    <Col xs={10}>
                    <div class="scor">
                        <h1>{props.result < 100 ? props.result + '%' : <GameOver />}</h1>
                        </div>
                        <ProgressBar animated now={props.result} variant={getProgressBarColour(props.result)} />
                    </Col>
                    <Col />
                </Row>
            </Container>

        </div>
    );
}



function GameOver() {
    return (
        <div>
            <Alert variant="danger">
                <Alert.Heading>You Are NOT Brave!!</Alert.Heading>
            </Alert>
        </div>
    );
}


export default EmotionAnalysis;