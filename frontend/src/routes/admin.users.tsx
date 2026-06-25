import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/layout/Shell";

import {
  getUsers,
  updateUser,
  deleteUser,
} from "@/services/adminUserService";

export const Route =
  createFileRoute(
    "/admin/users"
  )({
    component: AdminUsers,
  });

function AdminUsers() {
  const [users, setUsers] =
    useState<any[]>([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers =
    async () => {
      const data =
        await getUsers();

      setUsers(data);
    };

  const toggleAdmin =
    async (
      id: string,
      currentRole: boolean
    ) => {
      await updateUser(
        id,
        !currentRole
      );

      loadUsers();
    };

  const removeUser =
    async (id: string) => {
      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete)
        return;

      await deleteUser(id);

      loadUsers();
    };

  return (
    <Shell>
      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          User Management
        </h1>

        <div className="overflow-x-auto border rounded-lg">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>
                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Role
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>

            </thead>

            <tbody>

              {users.map(
                (user) => (
                  <tr
                    key={user._id}
                    className="border-t"
                  >
                    <td className="p-4">
                      {user.name}
                    </td>

                    <td className="p-4">
                      {user.email}
                    </td>

                    <td className="p-4">
                      {user.isAdmin
                        ? "Admin"
                        : "User"}
                    </td>

                    <td className="p-4 flex gap-3">

                      <button
                        onClick={() =>
                          toggleAdmin(
                            user._id,
                            user.isAdmin
                          )
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        {user.isAdmin
                          ? "Remove Admin"
                          : "Make Admin"}
                      </button>

                      <button
                        onClick={() =>
                          removeUser(
                            user._id
                          )
                        }
                        className="bg-red-600 text-white px-4 py-2 rounded"
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