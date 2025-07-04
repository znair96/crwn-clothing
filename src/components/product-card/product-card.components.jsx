import Button from "../button/button.component";
import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/cart.context";
import { Footer, ProductCardContainer } from "./product-card.styles";
const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;
  const { addItemsToCart, cartItems } = useContext(CartContext);
  const addToCartHandler = () => {
    addItemsToCart(product);
  };
  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </Footer>
      <Button buttonType="inverted" onClick={addToCartHandler}>
        Add to Cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
