import React, {Component} from 'react';

class HoursCounter extends Component {
    render(){
      let allSongs = this.props.playlists.reduce((songs, eachPlaylist)=> {
        return songs.concat(eachPlaylist.songs)
      } , [])
      let totalDuration = allSongs.reduce((sum, eashSong) => {
        return sum + eashSong.duration
      }, 0) / 3600;
      totalDuration = totalDuration.toFixed(2)
      let isTooLow = totalDuration < 1
      let hoursCounterStyle = {
          width: "40%",
          display: 'inline-block',
          color: 'white',
          marginBottom: '20px',
          fontSize: '20px',
          lineHeight: '30px',
          color: isTooLow ? 'red': 'white',
          fontWeight: isTooLow ? 'bold': 'normal'
        }
  
      return(
        <div style={hoursCounterStyle}>
          <h2>{totalDuration} Hours
          </h2>
        </div>
      );
    }
  }

  export default HoursCounter;