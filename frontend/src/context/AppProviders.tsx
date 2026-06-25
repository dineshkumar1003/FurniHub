import type { ReactNode } from "react";
import { CartProvider } from "./CartContext";
import { WishlistProvider } from "./WishlistContext";
import { AuthProvider } from "./AuthContext";
import { ThemeProvider } from "./ThemeContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>{children}</CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}