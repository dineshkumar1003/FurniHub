import {
  createFileRoute,
  useNavigate,
} from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import { Shell } from "@/components/layout/Shell";

import {
  getAllProducts,
  createProduct,
  deleteProduct,
} from "@/services/adminProductService";

export const Route =
  createFileRoute(
    "/admin/products"
  )({
    component: AdminProducts,
  });

function AdminProducts() {
  const [products, setProducts] =
    useState<any[]>([]);

  const navigate =
    useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts =
    async () => {
      try {
        const data =
          await getAllProducts();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleCreate =
    async () => {
      try {
        await createProduct();

        loadProducts();
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id: string) => {
      if (
        !window.confirm(
          "Delete Product?"
        )
      )
        return;

      try {
        await deleteProduct(id);

        loadProducts();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <Shell>
      <div className="mx-auto max-w-7xl p-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl">
            Admin Products
          </h1>

          <button
            onClick={handleCreate}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Create Product
          </button>
        </div>

        <div className="overflow-x-auto rounded border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted">
                <th className="p-4 text-left">
                  ID
                </th>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Stock
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map(
                (product) => (
                  <tr
                    key={product._id}
                    className="border-b"
                  >
                    <td className="p-4">
                      {product._id}
                    </td>

                    <td className="p-4">
                      {product.name}
                    </td>

                    <td className="p-4">
                      ₹{product.price}
                    </td>

                    <td className="p-4">
                      {
                        product.countInStock
                      }
                    </td>

                    <td className="space-x-2 p-4">
                      <button
                        onClick={() =>
                          navigate({
                            to: "/admin/product-edit/$id",
                            params: {
                              id: product._id,
                            },
                          })
                        }
                        className="rounded bg-blue-600 px-3 py-1 text-white"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }
                        className="rounded bg-red-600 px-3 py-1 text-white"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}