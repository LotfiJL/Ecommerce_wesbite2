import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions/actions";
import { Link, useParams } from "react-router-dom";
import "./prosuctListStore.css";
import Card from "../../../Componenets/UI/Card/card";

const ProductListStore = (props) => {
  const product = useSelector((state) => state.productReducer);
  const [priceRange] = useState({
    under5K: 5000,
    under10K: 10000,
    under15K: 15000,
    under20K: 20000,
    under25K: 25000,
    under30K: 30000,
  });

  const dispatch = useDispatch();

  const { slug } = useParams();
  const name = slug.split("-").join(" ");
  //transform name to array :
  const nameArray = name.split(" ");

  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, [dispatch, slug, props]);

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            key={index}
            headerLeft={`${nameArray[0]} under ${priceRange[key]}`}
            headerRight={<button className="viewAllBtn">View All</button>}
            style={{
              width: "calc(100% - 40px)",
              margin: "20px",
              padding: "10px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((productItem) => (
                <Link
                  to={`/${productItem.slug}/${productItem._id}/p`}
                  style={{ display: "block" }}
                  className="productContainer"
                >
                  <div className="productImgContainer">
                    <img
                      src={`https://ecommerce-wesbite.onrender.com/public/${productItem.productPictures[0].img}`}
                      alt="product img"
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{productItem.name}</div>
                    <div>
                      <span>4.3 </span>&nbsp;
                      <span>5654 </span>
                    </div>
                    <div className="productPrice">{productItem.price}</div>
                    <div className="addToCart">
                      <button className="viewAllBtn">Add to Cart</button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default ProductListStore;
