import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { S as Shell } from "./Shell-BI-QiD32.js";
import axios from "axios";
import "@tanstack/react-router";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "./router-mRfm6bnQ.js";
import "@tanstack/react-query";
import "sonner";
const API = "https://furnihub-hlkx.onrender.com/api/admin/users";
const getUsers = async () => {
  const { data } = await axios.get(API);
  return data;
};
const updateUser = async (id, isAdmin) => {
  const { data } = await axios.put(
    `${API}/${id}`,
    { isAdmin }
  );
  return data;
};
const deleteUser = async (id) => {
  const { data } = await axios.delete(
    `${API}/${id}`
  );
  return data;
};
function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    loadUsers();
  }, []);
  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };
  const toggleAdmin = async (id, currentRole) => {
    await updateUser(id, !currentRole);
    loadUsers();
  };
  const removeUser = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");
    if (!confirmDelete) return;
    await deleteUser(id);
    loadUsers();
  };
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold mb-8", children: "User Management" }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto border rounded-lg", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-100", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Role" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: users.map((user) => /* @__PURE__ */ jsxs("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsx("td", { className: "p-4", children: user.name }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: user.email }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: user.isAdmin ? "Admin" : "User" }),
        /* @__PURE__ */ jsxs("td", { className: "p-4 flex gap-3", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => toggleAdmin(user._id, user.isAdmin), className: "bg-blue-600 text-white px-4 py-2 rounded", children: user.isAdmin ? "Remove Admin" : "Make Admin" }),
          /* @__PURE__ */ jsx("button", { onClick: () => removeUser(user._id), className: "bg-red-600 text-white px-4 py-2 rounded", children: "Delete" })
        ] })
      ] }, user._id)) })
    ] }) })
  ] }) });
}
export {
  AdminUsers as component
};
