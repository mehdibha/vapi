import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config";
import { ThemeToggle } from "./theme-toggle";

const links = siteConfig.global.externalLinks;

export const Footer = () => {
  return (
    <div className="container mt-36 pb-8">
      <Separator className="mb-4" />
      <div className="flex flex-col gap-6 xs:flex-row xs:items-center xs:justify-between">
        <p className="text-sm">Copyright © 2023 vapi.tn</p>
        <div className="flex h-5 items-center space-x-4">
          <div className="flex h-5 items-center space-x-1">
            {links.map((Link, index) => (
              <React.Fragment key={index}>
                <a href={Link.url} target="_blank">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Link.icon size={18} />
                  </Button>
                </a>
                {index !== links.length - 1 && <Separator orientation="vertical" />}
              </React.Fragment>
            ))}
          </div>
          <Separator orientation="vertical" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
