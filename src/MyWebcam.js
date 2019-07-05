import React from "react";
import Webcam from "react-webcam";
import './stylesheet.css'
import Button from 'react-bootstrap/Button'



class MyWebcam extends React.Component {

    constructor(props) {
        super(props);
        this.timerId = null;
        this.isCapturing = false;
        this.image = '';
        this.checkUrGameStatus = true;//to check wheather game has finished or not
        this.screenShotNow = false;//to check when to publish a photo taken at the time when the user reached max fearness
        this.sos = false;
        this.counter = 1;
    }

    setRef = webcam => {
        this.webcam = webcam
    }

    captureAge = () => {
        this.counter ++;
        this.sos=true;
        const imageSrc = this.webcam.getScreenshot();
        const byteArrayImage1 = this.convertToByteArray(imageSrc);
        this.fetchDataForAge(byteArrayImage1);
    };

    startCapturing = () => {
        this.screenShotNow = false;
        this.checkUrGameStatus = true;
        this.isCapturing = true;
        this.timerId = setInterval(() => {
            const image = this.webcam.getScreenshot();
            if (this.checkUrGameStatus) { this.image = image; }
            const byteArrayImage = this.convertToByteArray(image);
            this.fetchDataForFear(byteArrayImage);
        }, 200);
    }

    convertToByteArray = (image) => {
        const base64 = require('base64-js');
        const base64string = image.split(',')[1];
        return base64.toByteArray(base64string)
    };

    fetchDataForAge = (byteArray) => {
        const apiKey = 'bf43463afb1d4b12b2f3960aef0eb34b';
        const apiEndpoint = 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=age'
        fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    var age = (data[0] != null ? data[0].faceAttributes.age : 0);
                    console.log(age)
                    this.whatisyourage = age;
                    if (age < 23) {
                        this.tryThis = "Advanced Level"
                    } else if (age < 30 && age >= 23) {
                        this.tryThis = "Intermediate Level"
                    } else {
                        this.tryThis = "Beginner Levelr"
                    }
                });
            }
        });
    }

    fetchDataForFear = (byteArray) => {
        const apiKey = 'bf43463afb1d4b12b2f3960aef0eb34b';
        const apiEndpoint = 'https://eastasia.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceAttributes=emotion'
        fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                'cache-control': 'no-cache', 'Ocp-Apim-Subscription-Key': apiKey, 'Content-Type': 'application/octet-stream'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    var surprise = (data[0] != null ? data[0].faceAttributes.emotion.surprise : 0);

                    surprise = (Math.round(surprise * 100) * 1.5)
                    if (this.isCapturing && surprise < 100) {
                        this.props.onReceivedResult(surprise);
                    } else {
                        this.screenShotNow = true;
                        this.checkUrGameStatus = false;
                        clearInterval(this.timerId);
                        this.isCapturing = false;
                        this.props.onReceivedResult(100);
                    }
                });
            }
        });
    }

    whatisyourage ="(Loading...)";//set a default age

    tryThis = "(Loading...)";//set a default level of game

    render() {

        return (
            <div>
                 <div class="webcam">
                    <Webcam
                        audio={false}
                        height={400}
                        width={500}
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={this.videoConstraints}
                    />
                </div>
                <div class="buttonGroup">
                <div class="Beginnera">
                <Button variant="dark" onClick={this.captureAge}>Check your level</Button></div>
                <div class="Beginnera">
                <Button variant="dark" onClick={this.startCapturing}>Start Game!</Button></div>
                </div>
                <div class="font">
                <h2>{this.sos === true && this.counter%2 === 0  ? "Your Age is "+(this.whatisyourage) : ''}</h2>
                <h4>{this.sos === true && this.counter%2 === 0 ? "I recommend you playing at "+(this.tryThis) : ''}</h4>
               
                <h4>{this.screenShotNow === true ? "Check Out Your Frighten Moment lol" :''}</h4>
                <h1>{this.screenShotNow === true ? <img src={this.image} alt='' /> : ''}</h1>
</div>
            </div>
        );
    }
}

export default MyWebcam

/*<h1>Your age is around ({this.whatisyourage})</h1>
<h2>Start with {this.tryThis}</h2>*/