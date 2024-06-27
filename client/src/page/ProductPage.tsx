import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getProduct, getAllProductsInCart, updateCart, removeFromCart } from "../store/reducers/productReducer";

export default function ProductPage() {
  const dispatch = useDispatch();

  const productData = useSelector((state: any) => state.product.product);
  const cartData = useSelector((state: any) => state.product.cart);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getAllProductsInCart());
  }, [dispatch]);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartData]);

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleUpdateCart = (item: any) => {
    const updatedProduct = { ...item, quantity: parseInt(item.newQuantity) };
    dispatch(updateCart(updatedProduct));
  };

  const handleRemoveFromCart = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    cartData.forEach((item: any) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
      <div style={{ backgroundColor: "#f8f9fa", width: "45%", padding: "20px", borderRadius: "8px" }}>
        <h1>ListProduct</h1>
        {productData.map((item: any) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              margin: "10px 0",
              padding: "10px",
              gap: "10px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
            }}
          >
            <img
              style={{ width: "140px", height: "140px", borderRadius: "8px" }}
              src={item.image}
              alt={item.name}
            />
            <div>
              <h3 style={{ margin: "0 0 10px 0" }}>{item.name}</h3>
              <p style={{ margin: "0 0 10px 0" }}>{item.title}</p>
              <p style={{ margin: "0 0 10px 0" }}>Total: {item.stock}</p>
              <p style={{ margin: "0 0 10px 0" }}>Price: ${item.price}</p>
              <button
                onClick={() => handleAddToCart(item)}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  padding: "10px 15px",
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: "#f1f3f5", width: "45%", padding: "20px", borderRadius: "8px" }}>
        <h1>Shopping Cart</h1>
        {cartData.map((item: any) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              margin: "10px 0",
              padding: "10px",
              gap: "10px",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
              alignItems: "center",
            }}
          >
            <img
              style={{ width: "135px", height: "135px", borderRadius: "8px" }}
              src={item.image}
              alt={item.title}
            />
            <div>
              <h3 style={{ margin: "0 0 10px 0" }}>{item.title}</h3>
              <input
                defaultValue={item.quantity}
                type="number"
                onChange={(e) => item.newQuantity = e.target.value}
                style={{ width: "70px", margin: "10px 0" }}
              />
              <p style={{ margin: "0 0 10px 0" }}>Quantity: {item.quantity}</p>
            </div>
            <div>
              <p style={{ margin: "0 0 10px 0" }}>${item.price}</p>
              <button
                onClick={() => handleUpdateCart(item)}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  padding: "10px 15px",
                  margin: "5px 0",
                }}
              >
                Update
              </button>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  borderRadius: "4px",
                  border: "none",
                  padding: "10px 15px",
                  margin: "5px 0",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <h3>Total Price: ${totalPrice}</h3>
        </div>
      </div>
    </div>
  );
}
