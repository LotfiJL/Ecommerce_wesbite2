import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Getquery from "../../../utils/getParams";
import { getProductsPage } from "../../../actions/actions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "../../../Componenets/UI/Card/card";
const ProductPage = () => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.productReducer);
  const page = product.page;
  useEffect(() => {
    const params = Getquery();
    const payload = { params };

    dispatch(getProductsPage(payload));
  }, [dispatch]);

  return (
    <div style={{ margin: "10px 0" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{ display: "block" }}
              href={banner.navigateTo}
            >
              <img src={banner.img} alt="" />
              <p className="legend">Legend</p>
            </a>
          ))}
      </Carousel>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "5px",
        }}
      >
        {page.products &&
          page.products.map((product, index) => (
            <Card
              key={index}
              style={{ width: "400px", height: "300px", margin: "5px" }}
            >
              <img
                style={{ width: "100%", height: "100%" }}
                src={product.img}
                alt=""
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ProductPage;
