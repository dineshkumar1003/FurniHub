import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/layout/Shell";
import {
  getAllOrders,
  updateOrderStatus,
} from "@/services/adminOrderService";
import { inr } from "@/lib/data/products";

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getAllOrders();

      console.log("ORDERS LOADED:", data);

      setOrders(data);
    } catch (error) {
      console.log("LOAD ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (
    id: string,
    orderStatus: string
  ) => {
    try {
      console.log(
        "STATUS CHANGED:",
        id,
        orderStatus
      );

      const result =
        await updateOrderStatus(
          id,
          orderStatus
        );

      console.log(
        "UPDATE SUCCESS:",
        result
      );

      await loadOrders();
    } catch (error: any) {
      console.log(
        "UPDATE ERROR:",
        error?.response?.data || error
      );
    }
  };

  if (loading) {
    return (
      <Shell>
        <div className="p-10">
          Loading...
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h1 className="mb-8 font-display text-4xl">
          Admin Orders
        </h1>

        <div className="overflow-x-auto rounded-md border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted">
                <th className="p-4 text-left">
                  Order ID
                </th>

                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Update
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {order._id}
                  </td>

                  <td className="p-4">
                    {order.user?.name}
                  </td>

                  <td className="p-4">
                    {inr(order.totalPrice)}
                  </td>

                  <td className="p-4">
                    {order.orderStatus}
                  </td>

                  <td className="p-4">
                    <select
                      value={
                        order.orderStatus
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                      className="rounded border px-3 py-2"
                    >
                      <option value="Placed">
                        Placed
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Packed">
                        Packed
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Out For Delivery">
                        Out For Delivery
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Shell>
  );
}