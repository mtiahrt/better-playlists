import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: 'blue',
  width: "20%"
}
let fakeServerData= {
  user: {
    name: 'Mark',
    userid: 'mtiahrt',
    playlists: [
      {
        name: 'Sleepy time songs',
        songs: [
          {name:'Bobono', duration: 3},
          {name:'Jar of flys', duration: 1},
          {name:'Wishlist', duration: 2}
        ]
      },
      {
        name: 'Headbanging!!!',
        songs: [
          {name: 'Fade to Black', duration: 4},
          {name: 'Slave to the Grind', duration: 1},
          {name: 'Breaking Stuff', duration: 3}
        ]
      
      },
      {
        name: 'Hip pop',
        songs: [
          {name: 'Hit me one more time', duration: 2},
          {name: 'Flo ridder', duration: 3},
          {name: 'gennie in a bottle', duration: 1}
        ]
      },
      {
        name: 'High List',
        songs: [
          {name: 'Big Bang', duration: 2},
          {name: 'Showplay', duration: 4},
          {name: 'My Time', duration: 2}
        ]
      }
    ]
  }
};
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
        <img />
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
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }

  render() {
    let filteredPlaylistToRender = this.state.serverData.user ? this.state.serverData.user.playlists
    .filter(playlist =>
      playlist.name.toLowerCase().includes(
        this.state.filterString.toLowerCase())
        ) : []
    return (
      <div className="App">
        {this.state.serverData.user ?
          <div>
            <h1>{this.state.serverData.user.name}'s playlists</h1>
            <PlaylistCounter playlists={filteredPlaylistToRender}/>
            <HoursCounter playlists={filteredPlaylistToRender}/>
            <Filter onTextChange={text => this.setState({filterString: text})}/>
            {filteredPlaylistToRender.map(playlist => 
                <Playlist playlist={playlist}/> 
             )}
          </div> : <h1>'Loading Your Playlists'</h1>
        } 
      </div>
    );
  }
}
export default App;
