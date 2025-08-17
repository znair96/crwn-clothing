import { Fragment, useContext } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.components";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { categoriesMapSelector } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(categoriesMapSelector);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
