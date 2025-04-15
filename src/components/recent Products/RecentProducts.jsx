import useProducts from "../../Hooks/useProducts";

const RecentProducts = () => {
  const { data, isLoading, isError, error } = useProducts();
  if (isError) {
    return (
      <>
        <div></div>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <div></div>
      </>
    );
  }
  return (
    <>
      <div></div>
    </>
  );
};

export default RecentProducts;
