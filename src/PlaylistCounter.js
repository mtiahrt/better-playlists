import React, {Component} from 'react';

let counterStyle = {
    width: "40%",
    display: 'inline-block',
    color: 'white',
    marginBottom: '20px',
    fontSize: '20px',
    lineHeight: '30px'
  }

class PlaylistCounter extends Component {
    render(){
      let playlistCounterStyle = counterStyle
      return(
        <div style={playlistCounterStyle}>
          <h2>{this.props.playlists.length} playlists
          </h2>
        </div>
      );
    }
  }
  export default PlaylistCounter;