import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/layout/Shell";
import {
  getProduct,
  updateProduct,
} from "@/services/adminProductService";
import { uploadImage } from "@/services/uploadService";

export const Route =
  createFileRoute(
    "/admin/product-edit/$id"
  )({
    component: AdminProductEdit,
  });

function AdminProductEdit() {
  const { id } =
    Route.useParams();

  const [product, setProduct] =
    useState<any>(null);

  const [uploading, setUploading] =
    useState(false);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct =
    async () => {
      const data =
        await getProduct(id);

      setProduct(data);
    };

  const uploadHandler =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (!e.target.files?.[0])
        return;

      try {
        setUploading(true);

        const image =
          await uploadImage(
            e.target.files[0]
          );

        setProduct({
          ...product,
          image,
        });
      } catch (error) {
        alert(
          "Image Upload Failed"
        );
      } finally {
        setUploading(false);
      }
    };

  const submitHandler =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      await updateProduct(
        id,
        product
      );

      alert(
        "Product Updated Successfully"
      );
    };

  if (!product)
    return (
      <Shell>
        <div className="p-10">
          Loading...
        </div>
      </Shell>
    );

  return (
    <Shell>
      <div className="max-w-2xl mx-auto p-10">
        <h1 className="text-3xl mb-8">
          Edit Product
        </h1>

        <form
          onSubmit={submitHandler}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name:
                  e.target.value,
              })
            }
            className="w-full border p-3"
          />

          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={(e) =>
              setProduct({
                ...product,
                price: Number(
                  e.target.value
                ),
              })
            }
            className="w-full border p-3"
          />

          <input
            type="text"
            placeholder="Brand"
            value={product.brand}
            onChange={(e) =>
              setProduct({
                ...product,
                brand:
                  e.target.value,
              })
            }
            className="w-full border p-3"
          />

          <input
            type="text"
            placeholder="Category"
            value={product.category}
            onChange={(e) =>
              setProduct({
                ...product,
                category:
                  e.target.value,
              })
            }
            className="w-full border p-3"
          />

          <input
            type="number"
            placeholder="Stock"
            value={
              product.countInStock
            }
            onChange={(e) =>
              setProduct({
                ...product,
                countInStock:
                  Number(
                    e.target.value
                  ),
              })
            }
            className="w-full border p-3"
          />

          <div>
            <label className="block mb-2 font-medium">
              Product Image
            </label>

            <input
              type="file"
              onChange={
                uploadHandler
              }
              className="w-full border p-3"
            />

            {uploading && (
              <p className="mt-2">
                Uploading...
              </p>
            )}

            {product.image && (
              <img
                src={`https://furnihub-hlkx.onrender.com${product.image}`}
                alt="Product"
                className="mt-4 h-40 rounded border"
              />
            )}
          </div>

          <input
            type="text"
            placeholder="Image URL"
            value={product.image}
            onChange={(e) =>
              setProduct({
                ...product,
                image:
                  e.target.value,
              })
            }
            className="w-full border p-3"
          />

          <textarea
            placeholder="Description"
            value={
              product.description
            }
            onChange={(e) =>
              setProduct({
                ...product,
                description:
                  e.target.value,
              })
            }
            rows={5}
            className="w-full border p-3"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3"
          >
            Save Changes
          </button>
        </form>
      </div>
    </Shell>
  );
}
