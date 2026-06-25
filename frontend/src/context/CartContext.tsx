import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import axios from "axios";

interface CartCtx {
  items: any[];

  add: (
    product: any,
    qty?: number
  ) => Promise<void>;

  remove: (
    productId: string
  ) => Promise<void>;

  setQty: (
    productId: string,
    qty: number
  ) => Promise<void>;

  clear: () => Promise<void>;

  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
  count: number;
}

const Ctx = createContext<CartCtx>(
  {} as CartCtx
);

const API_URL =
  "http://localhost:5000/api/cart";

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] =
    useState<any[]>([]);

  const [subtotal, setSubtotal] =
    useState(0);

  const [gst, setGst] =
    useState(0);

  const [shipping, setShipping] =
    useState(0);

  const [total, setTotal] =
    useState(0);

  const getConfig = () => {
    if (typeof window === "undefined") {
      return {
        headers: {},
      };
    }

    const token =
      localStorage.getItem("token");

    return {
      headers: {
        Authorization: token
          ? `Bearer ${token}`
          : "",
      },
    };
  };

  const loadCart = async () => {
    try {
      const { data } =
        await axios.get(
          API_URL,
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

      const cartItems =
        data.cartItems ||
        data.items ||
        [];

      console.log(
        "CART ITEMS =",
        cartItems
      );

      setItems(cartItems);

      try {
        const totals =
          await axios.get(
            `${API_URL}/totals`,
            getConfig()
          );

        setSubtotal(
          totals.data.itemsPrice ||
            0
        );

        setGst(
          totals.data.taxPrice ||
            0
        );

        setShipping(
          totals.data
            .shippingPrice || 0
        );

        setTotal(
          totals.data.totalPrice ||
            0
        );
      } catch {
        const calcSubtotal =
          cartItems.reduce(
            (
              acc: number,
              item: any
            ) =>
              acc +
              (item.price ||
                item.product?.price ||
                0) *
                (item.qty || 1),
            0
          );

        const calcTax =
          calcSubtotal * 0.18;

        const calcShipping =
          calcSubtotal > 0
            ? 500
            : 0;

        setSubtotal(
          calcSubtotal
        );

        setGst(calcTax);

        setShipping(
          calcShipping
        );

        setTotal(
          calcSubtotal +
            calcTax +
            calcShipping
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
    if (
      typeof window !==
      "undefined"
    ) {
      const token =
        localStorage.getItem(
          "token"
        );

      if (token) {
        loadCart();
      }
    }
  }, []);

  const add = async (
    product: any,
    qty = 1
  ) => {
    await axios.post(
      API_URL,
      {
        productId:
          product._id ||
          product.id,
        qty,
      },
      getConfig()
    );

    loadCart();
  };

  const remove = async (
    productId: string
  ) => {
    await axios.delete(
      `${API_URL}/${productId}`,
      getConfig()
    );

    loadCart();
  };

  const setQty = async (
    productId: string,
    qty: number
  ) => {
    await axios.put(
      `${API_URL}/${productId}`,
      { qty },
      getConfig()
    );

    loadCart();
  };

  const clear = async () => {
    await axios.delete(
      API_URL,
      getConfig()
    );

    loadCart();
  };

  return (
    <Ctx.Provider
      value={{
        items,
        add,
        remove,
        setQty,
        clear,
        subtotal,
        gst,
        shipping,
        total,
        count:
          items.reduce(
            (
              acc,
              item
            ) =>
              acc +
              (item.qty || 0),
            0
          ),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () =>
  useContext(Ctx);