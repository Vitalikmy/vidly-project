import React, { Component } from "react";

class TableHeader extends Component {
  internalSorting = path => {
    const { direction } = this.props.sortColumn;
    const dir = direction === "asc" ? "desc" : "asc";
    this.props.onSort({ topic: path, direction: dir });
  };



  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.internalSorting(column.path)}
            >
              {column.label} 
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;

