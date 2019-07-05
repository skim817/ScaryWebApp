import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './video.css'

class Video extends Component {

  render() {
    return (
      <div className='player-wrapper'>
        <ReactPlayer url={this.props.Link}  />
        <div class="name">
        <h2> {this.props.Name} </h2>
        </div>
        </div>
    )
  }
}

export default Video