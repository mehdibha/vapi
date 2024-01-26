import React from "react";
import Link from "next/link";
import { ClockIcon, MapPinIcon } from "lucide-react";
import { cities } from "@/config/constants";

interface StoreCardProps {
  name: string;
  description: string;
  image: string;
  city: string;
  rating: number;
  isOpen: boolean;
  todayCloseTime?: string
}

export const StoreCard = (props: StoreCardProps) => {
  const { name, description, image, city, rating, isOpen, todayCloseTime } = props;

  const formattedCity = city ? cities.find((c) => c.value === city)?.label ?? null : null;

  return (
    <Link
      href="#"
      className="rounded duration-300 hover:bg-card ring-2 hover:shadow-sm ring-transparent hover:ring-[15px] pb-2 hover:ring-card"
    >
      <img
        src={image}
        alt={name}
        className="h-48 w-full rounded-lg object-cover shadow"
      />
      <div>
        <h3 className="mt-3 text-2xl font-semibold capitalize leading-none tracking-tight">
          {name}
        </h3>
        <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
          {formattedCity && (
            <div className="flex items-center space-x-1.5 text-muted-foreground">
              <MapPinIcon size={14} /> <span>{formattedCity}</span>
            </div>
          )}
          <p className="flex items-center space-x-1.5 text-muted-foreground">
            <ClockIcon size={14} />
            <span>{isOpen ? "Ouvert - ferme à 18h" : "Fermé - ouvre à 08h"}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
