import sampleData from "@/db/sample-data";
import ProductList from "@/components/shared/products/product-list";

const HomePage = () => {
  return (
    <>
      <ProductList
        data={sampleData.products}
        title="Newest Arrivals"
        limit={4}
      />
    </>
  );
};

export default HomePage;
