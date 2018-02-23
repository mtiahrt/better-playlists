import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

let defaultStyle = {
  color: 'blue',
  width: "20%"
}

class PlaylistCounter extends Component {
  render(){
    return(
      <div style={{...defaultStyle, display: 'inline-block'}}>
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
    }, 0);
    return(
      <div style={{...defaultStyle, display: 'inline-block'}}>
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
        this.props.onTextChange(event.target.value)}/>
    </div>
    )
  };
}

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: "25%", display: "inline-block"}}>
        <img src={this.props.playlist.imageUrl} style={{width: '120px'}} />
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {this.props.playlist.songs.map(song =>
            <li>{song.name}</li>)}
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
    }).then(response => response.json())
      .then(data => this.setState({
        user: {
          name: data.display_name
      }
    }))

    // get playlist data!!
    fetch('https://api.spotify.com/v1/me/playlists',{
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then((response) => response.json())
      .then(data => this.setState({
          playlists: data.items.map(item => {
            console.log(data.items);
            return {
            name: item.name,
            imageUrl: item.images[0].url,
            songs: []
          }
          })
        }
      ))
  }

  render() {
    let filteredPlaylistToRender = 
    this.state.user &&
    this.state.playlists
      ? this.state.playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
        ) : []
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
                {filteredPlaylistToRender.map(playlist => 
                    <Playlist playlist={playlist}/> 
              )}
              </div>
            }

          </div> : <button onClick={() =>window.location = 'http://localhost:8888/login' }
                    style={{... defaultStyle, padding: '10px', marginTop: '250px'}}>Sign in to Spotify</button>
        } 
      </div>
    );
  }
}
export default App;
