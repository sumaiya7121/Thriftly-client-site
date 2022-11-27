import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import Spinner from "../../Components/Spinner/Spinner";
import { AuthContext } from "../../contexts/AuthProvider";

const MyProducts = () => {
  const { user,loading } = useContext(AuthContext);
  const {
    data: myProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["categories", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:4000/categories?email=${user?.email}`
      );
      const data = res.json();
      return data;
    },
  });

  const handleAdvertise = (id) => {
    fetch(`http://localhost:4000/categories/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount === 1) {
          refetch();
          toast.success("Product Advertised On Home Page");
        }
        console.log(data);
      });
  };

  if (loading || isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-10">My Products</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Resale Price</th>
              <th>Status</th>
              <th>Advertise Product</th>
              <th>Delete Product</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product, i) => (
              <tr key={product._id} className="hover">
                <th>{i + 1}</th>
                <td>{product.name}</td>
                <td>{product.resalePrice}</td>
                <td>{product.status}</td>
                <td>
                  {product.isAdvertised === true ? (
                    <button className="btn btn-sm btn-disabled  text-white">
                      Advertised
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdvertise(product._id)}
                      className="btn btn-sm btn-success text-white"
                    >
                      Advertise
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-sm btn-error text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;