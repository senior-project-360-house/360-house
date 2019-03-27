import React from "react";
import FunitureItem from "./FunitureItem";
import { renderComponent } from "recompose";
const FunitureList = props => {
  //   const list: {
  //     "5f8a3638-a359-46d8-bacb-56682c2aced3",
  //     "ad1a2d3a-b545-4909-b75a-d54747a353c3",
  //     "0eb23580-39ad-4fcc-ad1e-0a87d78e7407"
  // };

  return (
    <div>
      <FunitureItem />
      <FunitureItem />
      <FunitureItem />
      <FunitureItem />
    </div>
  );
};

export default FunitureList;
