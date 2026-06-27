import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import { Toaster as Toaster$1 } from "sonner";
const appCss = "/assets/styles-DwOHFB3I.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Ctx$2 = createContext(
  {}
);
const API_URL$1 = "hhttps://furnihub-hlkx.onrender.com/api/cart";
function CartProvider({
  children
}) {
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const getConfig = () => {
    if (typeof window === "undefined") {
      return {
        headers: {}
      };
    }
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    };
  };
  const loadCart = async () => {
    try {
      const { data } = await axios.get(
        API_URL$1,
        getConfig()
      );
      console.log(
        "CART DATA =",
        JSON.stringify(
          data,
          null,
          2
        )
      );
      const cartItems = data.cartItems || data.items || [];
      console.log(
        "CART ITEMS =",
        cartItems
      );
      setItems(cartItems);
      try {
        const totals = await axios.get(
          `${API_URL$1}/totals`,
          getConfig()
        );
        setSubtotal(
          totals.data.itemsPrice || 0
        );
        setGst(
          totals.data.taxPrice || 0
        );
        setShipping(
          totals.data.shippingPrice || 0
        );
        setTotal(
          totals.data.totalPrice || 0
        );
      } catch {
        const calcSubtotal = cartItems.reduce(
          (acc, item) => acc + (item.price || item.product?.price || 0) * (item.qty || 1),
          0
        );
        const calcTax = calcSubtotal * 0.18;
        const calcShipping = calcSubtotal > 0 ? 500 : 0;
        setSubtotal(
          calcSubtotal
        );
        setGst(calcTax);
        setShipping(
          calcShipping
        );
        setTotal(
          calcSubtotal + calcTax + calcShipping
        );
      }
    } catch (error) {
      console.log(
        "LOAD CART ERROR",
        error
      );
    }
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(
        "token"
      );
      if (token) {
        loadCart();
      }
    }
  }, []);
  const add = async (product, qty = 1) => {
    await axios.post(
      API_URL$1,
      {
        productId: product._id || product.id,
        qty
      },
      getConfig()
    );
    loadCart();
  };
  const remove = async (productId) => {
    await axios.delete(
      `${API_URL$1}/${productId}`,
      getConfig()
    );
    loadCart();
  };
  const setQty = async (productId, qty) => {
    await axios.put(
      `${API_URL$1}/${productId}`,
      { qty },
      getConfig()
    );
    loadCart();
  };
  const clear = async () => {
    await axios.delete(
      API_URL$1,
      getConfig()
    );
    loadCart();
  };
  return /* @__PURE__ */ jsx(
    Ctx$2.Provider,
    {
      value: {
        items,
        add,
        remove,
        setQty,
        clear,
        subtotal,
        gst,
        shipping,
        total,
        count: items.reduce(
          (acc, item) => acc + (item.qty || 0),
          0
        )
      },
      children
    }
  );
}
const useCart = () => useContext(Ctx$2);
const Ctx$1 = createContext({});
function WishlistProvider({ children }) {
  const [ids, setIds] = useState([]);
  useEffect(() => {
    const raw = typeof window !== "undefined" && localStorage.getItem("fh-wish");
    if (raw) setIds(JSON.parse(raw));
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("fh-wish", JSON.stringify(ids));
  }, [ids]);
  return /* @__PURE__ */ jsx(
    Ctx$1.Provider,
    {
      value: {
        ids,
        has: (id) => ids.includes(id),
        toggle: (id) => setIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]),
        remove: (id) => setIds((p) => p.filter((x) => x !== id))
      },
      children
    }
  );
}
const useWishlist = () => useContext(Ctx$1);
const Ctx = createContext(
  {}
);
function AuthProvider({
  children
}) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (typeof window === "undefined")
      return;
    const raw = localStorage.getItem(
      "fh-user"
    );
    if (raw) {
      setUser(JSON.parse(raw));
    }
  }, []);
  const persist = (u) => {
    setUser(u);
    if (typeof window === "undefined")
      return;
    if (u) {
      localStorage.setItem(
        "fh-user",
        JSON.stringify(u)
      );
      localStorage.setItem(
        "token",
        u.token
      );
    } else {
      localStorage.removeItem(
        "fh-user"
      );
      localStorage.removeItem(
        "token"
      );
    }
  };
  const login = async (email, password) => {
    const { data } = await axios.post(
      "https://furnihub-hlkx.onrender.com/api/users/login",
      {
        email,
        password
      }
    );
    persist(data);
    return data;
  };
  const register = async (name, email, phone, password) => {
    const { data } = await axios.post(
      "https://furnihub-hlkx.onrender.com/api/users/register",
      {
        name,
        email,
        phone,
        password
      }
    );
    persist(data);
  };
  const logout = () => {
    persist(null);
  };
  return /* @__PURE__ */ jsx(
    Ctx.Provider,
    {
      value: {
        user,
        login,
        register,
        logout
      },
      children
    }
  );
}
const useAuth = () => useContext(Ctx);
const ThemeCtx = createContext({
  theme: "light",
  toggle: () => {
  }
});
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("fh-theme");
    if (stored) setTheme(stored);
  }, []);
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("fh-theme", theme);
  }, [theme]);
  return /* @__PURE__ */ jsx(ThemeCtx.Provider, { value: { theme, toggle: () => setTheme((t) => t === "light" ? "dark" : "light") }, children });
}
const useTheme = () => useContext(ThemeCtx);
function AppProviders({ children }) {
  return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(WishlistProvider, { children: /* @__PURE__ */ jsx(CartProvider, { children }) }) }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$k = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FurniHub 2026 — Timeless Luxury Furniture" },
      { name: "description", content: "Premium designer furniture for the modern Indian home. Sofas, beds, dining and more — handcrafted with quiet luxury." },
      { name: "author", content: "FurniHub" },
      { property: "og:title", content: "FurniHub 2026 — Timeless Luxury Furniture" },
      { property: "og:description", content: "Premium designer furniture for the modern Indian home." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@FurniHub" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=Manrope:wght@300;400;500;600;700;800&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$k.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(AppProviders, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, {})
  ] }) });
}
const $$splitComponentImporter$j = () => import("./wishlist-BmiUZifM.js");
const Route$j = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{
      title: "Wishlist — FurniHub"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./shop-DqsO8i1V.js");
const Route$i = createFileRoute("/shop")({
  head: () => ({
    meta: [{
      title: "Shop — FurniHub"
    }, {
      name: "description",
      content: "Browse the full FurniHub collection of premium furniture."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./register-DcccwXQP.js");
const Route$h = createFileRoute("/register")({
  head: () => ({
    meta: [{
      title: "Create account — FurniHub"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./orders-IAbvnG7F.js");
const Route$g = createFileRoute("/orders")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./login-B1bQodF5.js");
const Route$f = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — FurniHub"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./inspiration-DA0uTLvc.js");
const Route$e = createFileRoute("/inspiration")({
  head: () => ({
    meta: [{
      title: "Inspiration — FurniHub"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./forgot-password-Dx4g1ozY.js");
const Route$d = createFileRoute("/forgot-password")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./dashboard-DY1e7JdH.js");
const Route$c = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — FurniHub"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./collections-N1TcOmtL.js");
const Route$b = createFileRoute("/collections")({
  head: () => ({
    meta: [{
      title: "Collections — FurniHub"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./checkout-DQrvfB1m.js");
const Route$a = createFileRoute("/checkout")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./cart-aVt6eJRF.js");
const Route$9 = createFileRoute("/cart")({
  head: () => ({
    meta: [{
      title: "Cart — FurniHub"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./about-BREc3aww.js");
const Route$8 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "Journal — FurniHub"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./index-D84j027y.js");
const Route$7 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "FurniHub 2026 — Timeless Luxury Furniture"
    }, {
      name: "description",
      content: "Transform your home into timeless luxury. Premium handcrafted furniture for the modern Indian home."
    }, {
      property: "og:title",
      content: "FurniHub 2026 — Timeless Luxury Furniture"
    }, {
      property: "og:description",
      content: "Transform your home into timeless luxury."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.index-B6Pjzd58.js");
const Route$6 = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const API_URL = "https://furnihub-hlkx.onrender.com/api/products";
const getProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data.products;
};
const getProductById = async (id) => {
  const { data } = await axios.get(
    `${API_URL}/${id}`
  );
  return data;
};
const getProductsByIds = async (ids) => {
  const products = await Promise.all(
    ids.map(
      (id) => getProductById(id)
    )
  );
  return products;
};
const $$splitComponentImporter$5 = () => import("./product._slug-bpkkNIg7.js");
const $$splitErrorComponentImporter = () => import("./product._slug-CVOt4dX1.js");
const $$splitNotFoundComponentImporter = () => import("./product._slug-D8gRaLYR.js");
const Route$5 = createFileRoute("/product/$slug")({
  loader: async ({
    params
  }) => {
    try {
      const p = await getProductById(params.slug);
      const product = {
        _id: p._id,
        id: p._id,
        slug: p._id,
        title: p.name,
        subtitle: p.brand,
        category: p.category,
        price: p.price,
        mrp: p.price,
        rating: p.rating || 0,
        reviews: p.numReviews || 0,
        reviewList: p.reviews || [],
        image: p.image.startsWith("http") ? p.image : `https://furnihub-hlkx.onrender.com${p.image}`,
        description: p.description,
        colors: ["#000000"],
        material: "",
        craftsmanship: "",
        dimensions: "",
        care: "",
        inStock: p.countInStock > 0
      };
      return {
        product
      };
    } catch {
      throw notFound();
    }
  },
  head: ({
    loaderData
  }) => ({
    meta: loaderData ? [{
      title: `${loaderData.product.title} — FurniHub`
    }, {
      name: "description",
      content: loaderData.product.subtitle
    }, {
      property: "og:title",
      content: loaderData.product.title
    }, {
      property: "og:description",
      content: loaderData.product.subtitle
    }, {
      property: "og:image",
      content: loaderData.product.image
    }] : []
  }),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./orders._id-CueKShIk.js");
const Route$4 = createFileRoute("/orders/$id")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.users-Biq-jm1c.js");
const Route$3 = createFileRoute("/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.products-BDjJ4E5N.js");
const Route$2 = createFileRoute("/admin/products")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.orders-00L1d8CQ.js");
const Route$1 = createFileRoute("/admin/orders")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.product-edit._id-BBomqMis.js");
const Route = createFileRoute("/admin/product-edit/$id")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WishlistRoute = Route$j.update({
  id: "/wishlist",
  path: "/wishlist",
  getParentRoute: () => Route$k
});
const ShopRoute = Route$i.update({
  id: "/shop",
  path: "/shop",
  getParentRoute: () => Route$k
});
const RegisterRoute = Route$h.update({
  id: "/register",
  path: "/register",
  getParentRoute: () => Route$k
});
const OrdersRoute = Route$g.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => Route$k
});
const LoginRoute = Route$f.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$k
});
const InspirationRoute = Route$e.update({
  id: "/inspiration",
  path: "/inspiration",
  getParentRoute: () => Route$k
});
const ForgotPasswordRoute = Route$d.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$k
});
const DashboardRoute = Route$c.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$k
});
const CollectionsRoute = Route$b.update({
  id: "/collections",
  path: "/collections",
  getParentRoute: () => Route$k
});
const CheckoutRoute = Route$a.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$k
});
const CartRoute = Route$9.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$k
});
const AboutRoute = Route$8.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$k
});
const IndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$k
});
const AdminIndexRoute = Route$6.update({
  id: "/admin/",
  path: "/admin/",
  getParentRoute: () => Route$k
});
const ProductSlugRoute = Route$5.update({
  id: "/product/$slug",
  path: "/product/$slug",
  getParentRoute: () => Route$k
});
const OrdersIdRoute = Route$4.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => OrdersRoute
});
const AdminUsersRoute = Route$3.update({
  id: "/admin/users",
  path: "/admin/users",
  getParentRoute: () => Route$k
});
const AdminProductsRoute = Route$2.update({
  id: "/admin/products",
  path: "/admin/products",
  getParentRoute: () => Route$k
});
const AdminOrdersRoute = Route$1.update({
  id: "/admin/orders",
  path: "/admin/orders",
  getParentRoute: () => Route$k
});
const AdminProductEditIdRoute = Route.update({
  id: "/admin/product-edit/$id",
  path: "/admin/product-edit/$id",
  getParentRoute: () => Route$k
});
const OrdersRouteChildren = {
  OrdersIdRoute
};
const OrdersRouteWithChildren = OrdersRoute._addFileChildren(OrdersRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  CartRoute,
  CheckoutRoute,
  CollectionsRoute,
  DashboardRoute,
  ForgotPasswordRoute,
  InspirationRoute,
  LoginRoute,
  OrdersRoute: OrdersRouteWithChildren,
  RegisterRoute,
  ShopRoute,
  WishlistRoute,
  AdminOrdersRoute,
  AdminProductsRoute,
  AdminUsersRoute,
  ProductSlugRoute,
  AdminIndexRoute,
  AdminProductEditIdRoute
};
const routeTree = Route$k._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$5 as R,
  getProducts as a,
  useAuth as b,
  useCart as c,
  Route$4 as d,
  Route as e,
  useTheme as f,
  getProductsByIds as g,
  router as r,
  useWishlist as u
};
