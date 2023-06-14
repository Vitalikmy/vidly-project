import React, { Component } from "react";
import MovieTable from "./moviesTable";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from './common/listGroup';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";


class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    searchQuery:'',
    selectedGenre:null,
    sortColumn: {
      topic: "title",
      direction: "asc"
    }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleIconClicked = movieObj => {
    const likedMovie = [...this.state.movies];
    const index = likedMovie.indexOf(movieObj);
    likedMovie[index] = { ...movieObj };
    likedMovie[index].liked = !likedMovie[index].liked;

    this.setState({ movies: likedMovie });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleListItemClick = genre => {
    // doesn't initialize selectedGenre in the state
    // because if it's not clicked yet,
    // it should be undefined
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortedObj => {
    this.setState({ sortColumn: sortedObj });
  };

  handleSearch = query => {
     this.setState({searchQuery:query,selectedGenre:null,currentPage:1});
  }
  handleGenreSelect = genre => {
    this.setState({selectedGenre:genre, searchQuery:'', currentPage:1});
  }
  

  getPagedData = () => {
   const {
    pageSize,
    currentPage,
    sortColumn,
    selectedGenre,
    searchQuery,
    movies:allMovies
   } = this.state;

   let filtered = allMovies;
   if(searchQuery)
   filtered = allMovies.filter(m=> m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
   else if (selectedGenre && selectedGenre._id)
   filtered = allMovies.filter((m=> m.genre._id === selectedGenre._id)); 
   const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
   const movies =  paginate(sorted,currentPage,pageSize);

   return {totalCount: filtered.length, data:movies};
  }

  render() {
    const {
      movies,
      pageSize,
      currentPage,
      searchQuery,
      selectedGenre,
      sortColumn
    } = this.state;

    const { length: count } = this.state.movies;

    if (count === 0) {
      return (
        <h1 className="main-title">There are no movies in the database.</h1>
      );
    }

    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter(({ genre: { _id } }) => _id === selectedGenre._id)
        : movies;

    const sorted = _.orderBy(
      filtered,
      [sortColumn.topic],
      [sortColumn.direction]
    );

    // when the currentPage is changed, on clicked, this render() method re-render again, and this function gets called again with an updated {currentPage}, hence new elements displayed
    const paginatedMovies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onListItemClick={this.handleListItemClick}
            selectedListItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <Link to='/movies/new'
           className="btn btn-primary"
           style={{marginBottom: 20}}>
           New Movie
           </Link>
          <h1 className="main-title">
            Showing {filtered.length} movies in the database.
          </h1>
           <SearchBox  value={searchQuery} onChange={this.handleSearch} />
          <MovieTable
            allMovies={paginatedMovies}
            onItemDelete={this.handleDelete}
            onIconClick={this.handleIconClicked}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
            //totalElements={filtered.length}
          />
        </div>
      </div>
    );
  }
}

export default Movie;