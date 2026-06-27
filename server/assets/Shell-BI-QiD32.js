import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { X, ChevronRight, Check, Circle, Moon, Sun, Menu, Search, Heart, ShoppingBag, User, Instagram, Facebook, Youtube } from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { f as useTheme, c as useCart, u as useWishlist, b as useAuth } from "./router-mRfm6bnQ.js";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetPortal = SheetPrimitive.Portal;
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxs(SheetPrimitive.Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = SheetPrimitive.Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SheetPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: toggle,
      "aria-label": `Switch to ${theme === "light" ? "dark" : "light"} mode`,
      children: theme === "light" ? /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" })
    }
  );
}
const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/inspiration", label: "Inspiration" },
  { to: "/about", label: "Journal" }
];
function Navbar() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: cn(
        "sticky top-0 z-40 w-full transition-all duration-500",
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]" : "bg-background/40 backdrop-blur-sm"
      ),
      children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-8", children: [
        /* @__PURE__ */ jsxs(Sheet, { children: [
          /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden", "aria-label": "Open menu", children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) }) }),
          /* @__PURE__ */ jsxs(SheetContent, { side: "left", className: "w-[300px]", children: [
            /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { className: "font-display text-2xl", children: "FurniHub" }) }),
            /* @__PURE__ */ jsx("nav", { className: "mt-8 flex flex-col gap-1", children: nav.map((n) => /* @__PURE__ */ jsx(Link, { to: n.to, className: "rounded-md px-3 py-3 text-base hover:bg-muted", children: n.label }, n.to)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "font-display text-xl tracking-tight md:text-2xl", children: [
          "Furni",
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: "Hub" })
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "ml-8 hidden items-center gap-7 md:flex", children: nav.map((n) => /* @__PURE__ */ jsx(
          Link,
          {
            to: n.to,
            className: "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground",
            activeProps: { className: "text-foreground" },
            children: n.label
          },
          n.to
        )) }),
        /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-1", children: [
          /* @__PURE__ */ jsxs(Sheet, { open: searchOpen, onOpenChange: setSearchOpen, children: [
            /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Search", children: /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxs(SheetContent, { side: "top", className: "h-auto", children: [
              /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { className: "font-display", children: "Search the collection" }) }),
              /* @__PURE__ */ jsxs(
                "form",
                {
                  className: "mt-4 flex gap-2",
                  onSubmit: (e) => {
                    e.preventDefault();
                    const q = e.currentTarget.elements.namedItem("q").value;
                    window.location.href = `/shop?q=${encodeURIComponent(q)}`;
                  },
                  children: [
                    /* @__PURE__ */ jsx(Input, { name: "q", autoFocus: true, placeholder: "Search sofas, beds, dining…" }),
                    /* @__PURE__ */ jsx(Button, { type: "submit", children: "Search" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(ThemeToggle, {}),
          /* @__PURE__ */ jsx(Link, { to: "/wishlist", "aria-label": "Wishlist", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [
            /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4" }),
            ids.length > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground", children: ids.length })
          ] }) }),
          /* @__PURE__ */ jsx(Link, { to: "/cart", "aria-label": "Cart", children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", size: "icon", className: "relative", children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" }),
            count > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground", children: count })
          ] }) }),
          /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", "aria-label": "Account", children: /* @__PURE__ */ jsx(User, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", className: "w-56", children: user ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(DropdownMenuLabel, { children: [
                "Hi, ",
                user.name
              ] }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: "Dashboard" }) }),
              /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/dashboard", children: "Orders" }) }),
              /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/wishlist", children: "Wishlist" }) }),
              user?.isAdmin && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/admin", children: "Admin Dashboard" }) }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/admin/products", children: "Manage Products" }) }),
                /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/admin/orders", children: "Manage Orders" }) })
              ] }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx(
                DropdownMenuItem,
                {
                  onClick: logout,
                  children: "Log out"
                }
              )
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Account" }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/login", children: "Sign in" }) }),
              /* @__PURE__ */ jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsx(Link, { to: "/register", children: "Create account" }) })
            ] }) })
          ] })
        ] })
      ] })
    }
  );
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "mt-32 border-t border-border/60 bg-[color:var(--surface)]", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-4 md:px-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "font-display text-2xl", children: [
          "Furni",
          /* @__PURE__ */ jsx("span", { className: "text-accent", children: "Hub" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-xs text-sm text-muted-foreground", children: "Premium designer furniture, handcrafted across India for the modern home." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Instagram", children: /* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Facebook", children: /* @__PURE__ */ jsx(Facebook, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Youtube", children: /* @__PURE__ */ jsx(Youtube, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70", children: "Shop" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/shop", children: "All Furniture" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/shop", children: "New Arrivals" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/collections", children: "Collections" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/inspiration", children: "Inspiration" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70", children: "Support" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: "Delivery & Assembly" }),
          /* @__PURE__ */ jsx("li", { children: "10-Year Warranty" }),
          /* @__PURE__ */ jsx("li", { children: "Care Guides" }),
          /* @__PURE__ */ jsx("li", { children: "Contact" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70", children: "Visit" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "Design Atelier, Indiranagar",
          /* @__PURE__ */ jsx("br", {}),
          "Attur 636107, India",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "Mon–Sun · 11:00–20:00"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-border/60 py-6 text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FurniHub. Crafted with care."
    ] })
  ] });
}
function Shell({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-dvh flex-col", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Button as B,
  Input as I,
  Shell as S,
  Sheet as a,
  SheetTrigger as b,
  cn as c,
  SheetContent as d,
  SheetHeader as e,
  SheetTitle as f
};
