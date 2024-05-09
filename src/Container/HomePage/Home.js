import React from "react";
import Layout from "../../Componenets/Layout/Layout";
import "./Home.css";
// import IMG from "../../../public/banners/banners1.jpg";
// import "../../../public/banners/banners2.jpg";
// import "../../../public/banners/banners3.jpg"
const Home = (props) => {
  return (
    <Layout>
      <img
        className="d-block w-100 carousel-image"
        src={process.env.PUBLIC_URL + "/banners/banners1.jpg"}
        alt="Banner 1"
      />
    </Layout>
  );
};

export default Home;
