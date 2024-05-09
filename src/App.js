import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Container/HomePage/Home";
import ProductListPage from "./Container/ProductListPage/productList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, updateCart } from "./actions/actions";
import ProductDetailsPage from "./Container/ProductDetailsPage/index";
import AddToCart from "./Container/CartPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  });

  useEffect(() => {
    dispatch(updateCart());
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          {/* always put the static routes before the dynamic routes */}
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/:slug" element={<ProductListPage />} />
          <Route
            path="/:productSlug/:productId/p"
            element={<ProductDetailsPage />}
          />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
