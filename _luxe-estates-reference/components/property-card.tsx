"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MapPin, Bed, Bath, Square, Lock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    image: string;
    beds: number;
    baths: number;
    sqft: number;
    isSignature?: boolean;
    viewers?: number;
  };
  onUnlock?: () => void;
}

export function PropertyCard({ property, onUnlock }: PropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          } ${property.isSignature ? "blur-sm" : ""}`}
        />

        {/* Overlay for Signature Properties */}
        {property.isSignature && (
          <div className="absolute inset-0 bg-primary/60 flex flex-col items-center justify-center gap-4 z-10">
            <Lock className="h-8 w-8 text-background" />
            <p className="font-sans text-sm text-background/90 text-center px-4">
              Propiedad exclusiva
            </p>
            <Button
              onClick={onUnlock}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Desbloquear Tour 3D
            </Button>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2 z-20">
          {property.isSignature && (
            <Badge className="bg-secondary text-secondary-foreground font-sans text-xs">
              Signature
            </Badge>
          )}
        </div>

        {/* Like Button */}
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors z-20"
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isLiked ? "fill-secondary text-secondary" : "text-muted-foreground"
            }`}
          />
        </button>

        {/* Live Viewers */}
        {property.viewers && property.viewers > 0 && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full z-20">
            <Eye className="h-4 w-4 text-secondary" />
            <span className="font-sans text-xs text-primary">
              {property.viewers} viendo ahora
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Price */}
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-serif text-2xl font-bold text-primary">
            {property.price}
          </span>
          <span className="font-sans text-xs text-muted-foreground uppercase tracking-wide">
            USD
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-medium text-primary mb-2 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-4">
          <MapPin className="h-4 w-4 text-secondary" />
          <span className="font-sans text-sm text-muted-foreground">
            {property.location}
          </span>
        </div>

        {/* Features */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-muted-foreground" />
            <span className="font-sans text-sm text-muted-foreground">
              {property.beds}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span className="font-sans text-sm text-muted-foreground">
              {property.baths}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square className="h-4 w-4 text-muted-foreground" />
            <span className="font-sans text-sm text-muted-foreground">
              {property.sqft} m²
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
