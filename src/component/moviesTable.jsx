import React from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import { Link } from "react-router-dom";

class MovieTable extends React.Component {
  columns = [
    { path: "title", label: "Title",content:movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];

  render() {
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={this.props.sortColumn}
          onSort={this.props.onSort}
        />
        <TableBody data={this.props.allMovies} columns={this.columns} />
        <tbody>
          {this.props.allMovies.map(movieObj => {
            const {
              _id,
              title,
              genre: { name },
              numberInStock,
              dailyRentalRate,
              liked
            } = movieObj;
            return (
              <tr key={_id}>
                <td>{title}</td>
                <td>{name}</td>
                <td>{numberInStock}</td>
                <td>{dailyRentalRate}</td>
                <td>
                  <Like
                    status={liked}
                    // pass the movie object as argument to the event handler
                    onIconClicked={() => this.props.onIconClick(movieObj)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.props.onItemDelete(movieObj)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default MovieTable;
