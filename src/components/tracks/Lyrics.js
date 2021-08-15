import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../layout/spinner'
import Moment from 'react-moment'

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }

  componentDidMount() {
    axios
      .get(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        console.log(res.data);
        this.setState({lyrics: res.data.message.body.lyrics});
        return axios.get(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      })
      .then(res => {
        console.log(res.data)
        this.setState({track: res.data.message.body.track})
      })
      .catch(err => console.log(err))
  }

  render() {
    const { lyrics, track } = this.state;
    if (lyrics === undefined || 
        track === undefined || 
        Object.keys(lyrics).length === 0 || 
        Object.keys(track).length === 0
      ) {
        return <Spinner/>
      } else {
        return (
          <>
          <Link to='/' className='btn btn-dark btn-sm mb-4 mt-4' >Back Home</Link>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {track.track_name} by <span className="text-secondary">{track.artist_name}</span>
              </h5>
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album ID :</strong> {track.album_id}
            </li>
            <li className="list-group-item">
              <strong>Explicit Words :</strong> {track.explicit === 0 ? 'No' : 'Yes'}
            </li>
            <li className="list-group-item">
              <strong>Release Date :</strong>{' '}
              <Moment format='MM/DD/YYYY'>{track.first_release_date}</Moment>
            </li>
          </ul>
        </>
        )
      }
  }
}

export default Lyrics
