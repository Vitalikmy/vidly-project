import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onListItemClick,
  selectedListItem
}) => {
  return (
    <ul className="list-group">
      {items.map(item => {
        let classname = "list-group-item ";
        if (selectedListItem === item) classname += "active";

        return (
          <li
            style={{cursor:'pointer'}}
            onClick={() => onListItemClick(item)}
            key={item[valueProperty]}
            className={classname}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onListItemClick: PropTypes.func,
  selectedListItem: PropTypes.object
};

// one way to make it to too attached with the data structure
// is to have a dynamic object property as props
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
