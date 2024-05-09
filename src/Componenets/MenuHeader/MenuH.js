import React, { useEffect } from "react";
import "./MenuH.css";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../actions/actions";

const MenuHeader = (props) => {
  const category = useSelector((state) => state.categoryReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category._id}>
          {category.parentId ? (
            <a
              href={`${category.slug}?cid="${category._id}&type="${category.type}`} //navigation link in cas of there chhild id  cad parentId
            >
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul> //in case of level 2 child handling
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  return (
    <div className="MenuHeader">
      <ul>
        {category.categories.length > 0
          ? renderCategories(category.categories) //this is all teh getCategory result .categories
          : null}
      </ul>
    </div>
  );
};

export default MenuHeader;
