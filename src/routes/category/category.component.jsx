import { Fragment, useContext, useEffect, useState } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.components";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import { useSelector } from "react-redux";
import { categoriesMapSelector } from "../../store/categories/categories.selector.js";
const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(categoriesMapSelector);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);
  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products?.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category;
