import axios from 'axios';

export default class NetworkAccess {
  static MAIN_URL = 'http://localhost:3000/';
  static IMAGE_PATH = 'http://image.tmdb.org/t/p/original';

  static getMovieDetails(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
    axios.get(`${this.MAIN_URL}title/${id}`)
      .then(res => {
        success(res.data.results);
      })
      .catch(err => {
        failure(err);
      });
  }

  static getMovieCast(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
    axios.get(`${this.MAIN_URL}title/${id}/credits`)
      .then(res => {
        success(res.data.results);
      })
      .catch(err => {
        failure(err);
      });
  }

  static getUserWatchlist(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
      axios.get(`${this.MAIN_URL}profile/${id}/watchlist`)
        .then(res => {
          console.log(res.data.results)
          success(res.data.results);
        })
        .catch((err) => {
          failure(err);
        })
  }

  static getUserWatched(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
      axios.get(`${this.MAIN_URL}profile/${id}/watched`)
        .then(res => {
          console.log(res.data.results)
          success(res.data.results);
        })
        .catch((err) => {
          failure(err);
        })
  }

  static addMovieToWatchlist(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
    axios.post(`${this.MAIN_URL}profile/watchlist`, {titleID: id})
      .then(res => {
        success(res.data.results);
      })
      .catch(err => {
        failure(err);
      });
  }

  static addMovieToWatched(id,
    success = (res) => {return res},
    failure = (err) => {console.log(err)}){
    axios.post(`${this.MAIN_URL}profile/watched`, {titleID: id})
      .then(res => {
        success(res.data.results);
      })
      .catch(err => {
        failure(err);
      });
  }
}
