import _ from "lodash";

const paginate = (data, currentPage, itemsToShow) => {
  // calculate the start index of each page
  const startIndex = (currentPage - 1) * itemsToShow;

  // _(data) = convert the array into lodash wrapper (makes it easier to chain all the lodash method)

  // _.slice = slice the array from the { start index }

  // _.take = take the specified amount from the array

  // _value() = turn lodash wrapper into array
  return _(data)
    .slice(startIndex)
    .take(itemsToShow)
    .value();
};

export default paginate;
