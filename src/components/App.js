import React from "react";
//import { moviesData } from '../moviesData';
import MovieItem from './MovieItem';
import MovieTabs from './MovieTabs';
import Pagination from './Pagination';
import {API_URL, API_KEY_3} from '../utils/api';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: 'popularity.desc',
      page: 1,
      total_pages: 1
    }
  }

  componentDidMount() {
    this.getMoies();
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevState.sort_by !== this.state.sort_by) || (prevState.page !== this.state.page)) {
      console.log('call');
      this.getMoies();
    }
  }

  getMoies = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.page}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        movies: [...data.results],
        page: data.page,
        total_pages: data.total_pages
      });
    });
  }

  goToPreviousPage = () => {
    console.log('goToPreviousPage');
    this.setState({
      page: this.state.page - 1
    }); 
  }

  goToNextPage = () => {
    console.log('goToNextPage');
    this.setState({
      page: this.state.page + 1
    });
  }

  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(function(item) {
      return item.id !== movie.id;
    });
  
    this.setState({
      movies: updateMovies
    });
  }

  addMovieToWillWatch = movie => { 
    const updateMovies = [...this.state.moviesWillWatch, movie];

    this.setState({
      moviesWillWatch: updateMovies
    });
  }

  removeMovieFromWillWatch = movie => {
    const updateMovies = this.state.moviesWillWatch.filter(function(item) {
      return item.id !== movie.id;
    });
  
    this.setState({
      moviesWillWatch: updateMovies
    });
  }

  updateSortBy = (value) => {
    this.setState({
      sort_by: value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row mb-4 mt-4">
              <div className="col-12">
                <MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy} />
              </div>
            </div>
            <div className="row">
            {this.state.movies.map(movie => {
              return (
                <div className="col-6 mb-4" key={movie.id}>
                  <MovieItem 
                      movie={movie} 
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                  />
                </div>
              );
            })}
            </div>
          </div>
          <div className="col-3">
            <p>Will watch: {this.state.moviesWillWatch.length}</p>
            {this.state.moviesWillWatch.map(movie => {
              return <p key={movie.id}>{movie.title}</p>;
            })}
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Pagination 
                total_pages={this.state.total_pages}
                page={this.state.page}
                goToPreviousPage={this.goToPreviousPage}
                goToNextPage={this.goToNextPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;