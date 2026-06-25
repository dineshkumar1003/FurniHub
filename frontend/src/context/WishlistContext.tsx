import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

interface WishCtx {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  remove: (id: string) => void;
}
const Ctx = createContext<WishCtx>({} as WishCtx);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const raw = typeof window !== "undefined" && localStorage.getItem("fh-wish");
    if (raw) setIds(JSON.parse(raw));
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("fh-wish", JSON.stringify(ids));
  }, [ids]);
  return (
    <Ctx.Provider
      value={{
        ids,
        has: (id) => ids.includes(id),
        toggle: (id) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])),
        remove: (id) => setIds((p) => p.filter((x) => x !== id)),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useWishlist = () => useContext(Ctx);