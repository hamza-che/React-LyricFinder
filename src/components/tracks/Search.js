import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../Context'

export class Search extends Component {
  state = {
    trackTitle: ''
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(`http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        dispatch({
          type: 'SEARCH_TRACK',
          payload: res.data.message.body.track_list,
        })
      })
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body my-4 p-4">
              <h2 className="h1 display-4 text-center">
                <i className="fas fa-music"></i> Search For A Song
              </h2>
              <p className="lead text-center">
                Get the lyrics for any song
              </p>
              <form onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input 
                    type="text" 
                    placeholder='Song Title...'
                    className="form-control form-control-lg" 
                    name='trackTitle'
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <div className="d-grid">
                  <button type='submit' className="btn btn-primary btn-lg mt-3">
                    Get Track Lyrics
                  </button>
                </div>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Search
