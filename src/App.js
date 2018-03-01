import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

let defaultStyle = {
  color: 'white',
  fontFamily: 'Lucida Calligraphy Italic',
  fontSize: '17px'
}
let counterStyle = {...defaultStyle,
  width: "40%",
  display: 'inline-block',
  marginBottom: '20px',
  fontSize: '20px',
  lineHeight: '30px'
}
function isEven(number){
  return number % 2
}

function getNewToken(){
  window.location = window.location.href.includes('localhost')
  ? 'http://localhost:8888/login' 
  : 'https://better-playlists-backend-mark.herokuapp.com/login'
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
    let hoursCounterStyle = {...counterStyle,
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

class Filter extends Component {
  render() {
    return(
    <div>
      <img/>
      <input type="text" onKeyUp= {event => 
        this.props.onTextChange(event.target.value)}
        style={{...defaultStyle,
        color: 'black',
        marginBottom: '20px',
        fontSize: '20px',
        padding: '5px'}}/>
    </div>
    )
  };
}

class Playlist extends Component {

  render() {
    return(
      <div style={{...defaultStyle, 
                  width: "25%", 
                  display: "inline-block",
                  padding: '10px',
                  backgroundColor: isEven(this.props.index) 
                    ? '#C0C0C0'
                    : '#808080'}}>
        <img src={this.props.playlist.imageUrl} style={{width: '120px'}} />
        <h3>{this.props.playlist.name}</h3>
        <ul style={{marginTop: '10px',
                    fontWeight: 'bold'}}>
          {this.props.playlist.songs.map(song =>
            <li style={{paddingTop: '2px'}}>{song.name}</li>)}
        </ul>
      </div>
    );
  }
}
class App extends Component {
  constructor(){
    super();
    this.state = {serverData: {},
                  filterString: ''};
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken) return;
    // get user name
    fetch('https://api.spotify.com/v1/me',{
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => {
      if (!response.ok){
        console.log("response failed.  getting new token")
        getNewToken();
      }else{
        return response
      }
    })
      .then(response => response.json())
      .then(data => this.setState({
        user: {
          name: data.display_name
      }
    }))

    // get playlist data!!
    fetch('https://api.spotify.com/v1/me/playlists',{
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
      .then(playlistData => {
        // map returns a array of promises
        let playlists = playlistData.items
        let trackDataPromises = playlists.map(playlist => {
          let responsePromise = fetch(playlist.tracks.href, {
            headers: {'Authorization': 'Bearer ' + accessToken}
            // get the json from each of the responses
          })
          let trackDataPromise = responsePromise
          .then(response => response.json())
        return trackDataPromise
      })
      let allTracksDatasPromises =
         Promise.all(trackDataPromises)
        let playlistsPromise = allTracksDatasPromises.then(trackDatas => {
          trackDatas.forEach((trackData, i) => {
              playlists[i].trackDatas = trackData.items
              .map(item => item.track)
              .map(trackData => ({
                name: trackData.name,
                duration: trackData.duration_ms / 1000
              }))
        })
            return playlists
          })
          return playlistsPromise
        })
      .then(playlists => this.setState({
          playlists: playlists.map(item => {
            return {
            name: item.name,
            imageUrl: item.images[0].url,
            songs: item.trackDatas.slice(0,3).map(trackData => ({
              name: trackData.name,
              duration: trackData.duration
            }))
          }
          })
        }
      ))
  }

  render() {
    let filteredPlaylistToRender = 
    this.state.user &&
    this.state.playlists
      ? this.state.playlists.filter(playlist => {
        let matchesPlaylist = playlist.name.toLowerCase()
        .includes(this.state.filterString.toLowerCase())
        let matchsSongs = playlist.songs.find(song => song.name.toLowerCase()
          .includes(this.state.filterString.toLowerCase()))
        return matchesPlaylist || matchsSongs
      }) : []
    return (
      <div className="App">
        {this.state.user ?
          <div>
            <h1>{this.state.user.name}'s playlists</h1>
            {this.state.playlists &&
              <div>
                <PlaylistCounter playlists={filteredPlaylistToRender}/>
                <HoursCounter playlists={filteredPlaylistToRender}/>
                <Filter onTextChange={text => this.setState({filterString: text})}/>
                {filteredPlaylistToRender.map((playlist, i) => 
                    <Playlist playlist={playlist} index={i}/> 
              )}
              </div>
            }

          </div> : <button onClick={() => {
            getNewToken();}
          }
            style={{... defaultStyle, padding: '10px', marginTop: '250px'}}>Sign in to Spotify</button>
        } 

      </div>
    );
  }
}
export default App;
