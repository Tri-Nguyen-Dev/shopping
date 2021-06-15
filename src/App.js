import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductModal from './components/modal';
import Sidebar from './components/sidebar'
import ToastMessage from './components/toast-message';
import Home from './pages/home';
import ProductDetail from './pages/productDetail';
import { useSelector } from 'react-redux'
import Cart from './pages/cart';
import Header from './components/header'
import Footer from './components/footer'
import Products from './pages/products';
import Search from './pages/search';
function App() {
  const { isShowToastMessage, isShowModal } = useSelector(state => state.theme)
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/product-detail/:productId" component={ProductDetail} />
          <Route path="/carts" component={Cart} />
          <Route path="/products" component={Products} />
          <Route path="/search" component={Search} />
        </Switch>
        <Footer />
      </BrowserRouter>

      {
        isShowModal.isShow ? <ProductModal /> : ''
      }

      {
        isShowToastMessage.isShow ? <ToastMessage /> : ''
      }
    </div>
  );
}

export default App;
