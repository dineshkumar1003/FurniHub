import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/services/adminDashboardService";

export const Route =
  createFileRoute("/admin/")({
    component: AdminDashboard,
  });

function AdminDashboard() {

  const user = JSON.parse(
    localStorage.getItem("user") ||
    localStorage.getItem("fh-user") ||
    "null"
  );

  useEffect(() => {
    if (!user || !user.isAdmin) {
      window.location.href = "/login";
    }
  }, []);

  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {
    if (user?.isAdmin) {
      loadStats();
    }
  }, []);

  const loadStats =
    async () => {
      try {
        const data =
          await getDashboardStats();

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

  if (!user || !user.isAdmin) {
    return null;
  }

  if (!stats) {
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
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-5xl font-bold mb-10">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="border rounded-lg p-6 shadow-sm">
            <h3>Total Products</h3>
            <p className="text-4xl font-bold mt-3">
              {stats.totalProducts}
            </p>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <h3>Total Orders</h3>
            <p className="text-4xl font-bold mt-3">
              {stats.totalOrders}
            </p>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <h3>Total Users</h3>
            <p className="text-4xl font-bold mt-3">
              {stats.totalUsers}
            </p>
          </div>

          <div className="border rounded-lg p-6 shadow-sm">
            <h3>Revenue</h3>
            <p className="text-4xl font-bold mt-3">
              ₹{stats.revenue.toLocaleString()}
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            to="/admin/products"
            className="border rounded-lg p-8 text-center hover:bg-gray-50"
          >
            <h2 className="text-2xl font-semibold">
              Products
            </h2>

            <p className="mt-2 text-gray-500">
              Manage Products
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="border rounded-lg p-8 text-center hover:bg-gray-50"
          >
            <h2 className="text-2xl font-semibold">
              Orders
            </h2>

            <p className="mt-2 text-gray-500">
              Manage Orders
            </p>
          </Link>

          <Link
            to="/admin/users"
            className="border rounded-lg p-8 text-center hover:bg-gray-50"
          >
            <h2 className="text-2xl font-semibold">
              Users
            </h2>

            <p className="mt-2 text-gray-500">
              Manage Users
            </p>
          </Link>

        </div>

      </div>
    </Shell>
  );
}