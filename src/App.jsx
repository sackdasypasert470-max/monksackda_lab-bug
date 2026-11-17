import { useState } from "react";
import { categories, products } from "./data.js";
import Header from "./components/Header.jsx";
import FilterBar from "./components/FilterBar.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import CartPanel from "./components/CartPanel.jsx";


function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState("all");
  const filteredProducts =
  category === "all"
    ? products
    : products.filter((p) => p.category === category);

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find((i) => i.id === product.id);
      return existing
        ? currentCart.map((i) =>
            i.id === product.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...currentCart, { ...product, qty: 1 }];
    });
  }

  function increase(id) {
    setCart((currentCart) =>
      currentCart.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
  }

  function decrease(id) {
    setCart((currentCart) =>
      currentCart
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function removeFromCart(id) {
    setCart((currentCart) => currentCart.filter((i) => i.id !== id));
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="wrap">
      <Header shopName="ຮ້ານ Lao Handmade" itemCount={itemCount} />
      <div className="layout">
        <div>
          <FilterBar value={category} setValue={setCategory}/>
          <ProductGrid products={filteredProducts} onAdd={addToCart} />
        </div>
        <CartPanel
          cart={cart}
          total={total}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={removeFromCart}
        />
      </div>
    </div>
  );
}

export default App;
