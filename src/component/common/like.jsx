import React from "react";

const Like = ({ status, onIconClicked }) => {
  const iconName = "fa fa-heart";
  const liked = status ? iconName : `${iconName}-o`;
  return (
    <i
      onClick={onIconClicked}
      className={liked}
      aria-hidden="true"
    />
  );
};

export default Like;
