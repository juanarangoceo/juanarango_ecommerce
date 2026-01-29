"use client"

import { TikTokEmbed as TikTok } from 'react-social-media-embed';
import { cn } from '@/lib/utils';

interface TikTokEmbedProps {
  url: string;
  caption?: string;
  className?: string;
}

export const TikTokEmbed = ({ url, caption, className }: TikTokEmbedProps) => {
  if (!url) return null;

  return (
    <div className={cn("my-8 flex flex-col items-center justify-center", className)}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '325px' }}>
        <TikTok url={url} width={325} />
      </div>
      {caption && (
        <p className="mt-2 text-sm text-center text-muted-foreground italic">
          {caption}
        </p>
      )}
    </div>
  );
};
