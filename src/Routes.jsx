import { Routes as RouterRoutes, Route } from 'react-router-dom';

import About from './pages/About';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import ProductDetailInfo from './pages/ProductDetailInfo';
import ProductDetailNutrition from "./pages/ProductDetailNutrition";
import ProductDetailStorage from "./pages/ProductDetailStorage";

export default function Routes() {

  return (
    <RouterRoutes>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id/" element={<ProductDetails />}>
        <Route
          path="details"
          element={<ProductDetailInfo />}
        />
        <Route
          path="nutrition"
          element={<ProductDetailNutrition />}
        />
        <Route
          path="storage"
          element={<ProductDetailStorage />}
        />
        </Route>
      <Route path="/cart" element={<Cart />} />
    </RouterRoutes>
  );
}
