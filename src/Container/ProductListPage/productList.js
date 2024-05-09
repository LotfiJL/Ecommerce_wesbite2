// import { useParams } from "react-router-dom";
import Layout from "../../Componenets/Layout/Layout";
import Getquery from "../../utils/getParams";
import "./productList.css";
import ProductPage from "./productPage/productPage";
import ProductListStore from "./savedProduct/productListStore";

const ProductListPage = (props) => {
  const renderProducts = () => {
    const params = Getquery(); //this return the id and page type
    let content = null;
    switch (params.type) {
      case "product":
        content = <ProductListStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = null;
    }
    return content;
  };
  return <Layout>{renderProducts()}</Layout>;
};

export default ProductListPage;
