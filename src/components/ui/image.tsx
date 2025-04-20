
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  className, 
  width, 
  height, 
  ...props 
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("object-contain", className)}
      {...props}
    />
  );
};

export default Image;
