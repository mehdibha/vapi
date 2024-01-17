"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config";
import { UserMenu } from "./user-menu";

// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { Menu as MenuIcon } from "lucide-react";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { cn } from "@/utils/classes";

// const config = siteConfig.header;

export const Header = () => {
  const { data, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b bg-primary text-primary-foreground shadow-sm dark:bg-background dark:text-foreground">
      <div className="container flex h-14 items-center justify-between py-2">
        <Link
          href="/"
          className="flex w-[200px] items-center space-x-2 duration-150 hover:opacity-80"
        >
          {/* <Image
            src={siteConfig.global.logo}
            alt={siteConfig.global.name}
            loading="lazy"
            width={20}
            height={20}
          /> */}
          <span className="inline-block font-bold">{siteConfig.global.name}</span>
        </Link>
        <Input placeholder="Rechercher sur vapi.tn" className="max-w-[400px] bg-white" />
        <div className="flex w-[200px] justify-end">
          {status === "unauthenticated" && (
            <Button color="secondary" size="sm">
              Se connecter
            </Button>
          )}
          {status === "authenticated" && <UserMenu user={data.user} />}
        </div>
      </div>
    </header>
  );
};

// interface NavItem {
//   label: string;
//   href?: string;
//   disabled?: boolean;
//   external?: boolean;
// }

// interface NavProps {
//   items: NavItem[];
//   direction?: "column" | "row";
//   onNavItemClick?: () => void;
// }

// const Nav = (props: NavProps) => {
//   const { items, direction = "row", onNavItemClick } = props;
//   const pathname = usePathname();

//   return (
//     <nav
//       className={cn("flex items-center gap-0 sm:gap-2", {
//         "flex-col gap-2": direction === "column",
//       })}
//     >
//       {items?.map(
//         (item, index) =>
//           item.href && (
//             <Link
//               key={index}
//               href={item.href}
//               className={cn(
//                 "w-full rounded-full px-4 py-1 text-center text-sm font-medium transition-all hover:text-foreground",
//                 item.disabled && "cursor-not-allowed opacity-80",
//                 item.href === pathname
//                   ? "bg-foreground/10 text-foreground"
//                   : "text-foreground/60"
//               )}
//               onClick={onNavItemClick}
//             >
//               {item.label}
//             </Link>
//           )
//       )}
//     </nav>
//   );
// };

// const MobileNav = () => {
//   const [open, setOpen] = React.useState<boolean>(false);
//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div className="pointer-events-auto lg:hidden">
//       <Sheet open={open} onOpenChange={setOpen}>
//         <SheetTrigger asChild>
//           <Button variant="text" color="neutral" size="icon">
//             <MenuIcon />
//             <span className="sr-only">Toggle Menu</span>
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="right" className=" w-56 bg-card pt-12 ">
//           <div className="flex flex-col space-y-8">
//             <Link
//               href="/"
//               className="flex justify-center transition-all hover:opacity-80"
//               onClick={handleClose}
//             >
//               <Image
//                 src={siteConfig.global.logo}
//                 alt={siteConfig.global.name}
//                 loading="lazy"
//                 width={30}
//                 height={30}
//                 className="aspect-[auto 30 / 30] object-cover"
//               />
//             </Link>
//             <Nav
//               items={config.nav.links}
//               direction="column"
//               onNavItemClick={handleClose}
//             />
//             <Button href={config.cta.primary.href} color="primary" size="sm">
//               {config.cta.primary.label}
//             </Button>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };
