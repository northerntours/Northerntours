import React, { useState, useEffect } from 'react';
import heic2any from 'heic2any';

const HeicImage = ({ src, alt, className, ...props }) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let objectUrl = null;

    const processImage = async () => {
      if (!src) return;

      // Check if it's a HEIC/HEIF image by extension or URL parameters
      const isHeic = src.toLowerCase().includes('.heic') || src.toLowerCase().includes('.heif');

      if (!isHeic) {
        setImageSrc(src);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        // Fetch the image as a blob
        const response = await fetch(src);
        if (!response.ok) throw new Error('Failed to fetch image');
        const blob = await response.blob();

        // Convert HEIC to JPEG
        const conversionResult = await heic2any({
          blob,
          toType: 'image/jpeg',
          quality: 0.8
        });

        // heic2any can return an array of blobs or a single blob
        const jpegBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
        
        objectUrl = URL.createObjectURL(jpegBlob);
        setImageSrc(objectUrl);
      } catch (err) {
        console.error('Error converting HEIC image:', err);
        setError(true);
        // Fallback to original src if conversion fails
        setImageSrc(src);
      } finally {
        setLoading(false);
      }
    };

    processImage();

    // Cleanup object URL to prevent memory leaks
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [src]);

  if (loading) {
     return (
      <div className={`relative overflow-hidden bg-gray-100 animate-pulse flex items-center justify-center ${className}`} {...props}>
         <svg className="w-8 h-8 text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
      </div>
     );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!error) {
          setError(true);
        }
      }}
      {...props}
    />
  );
};

export default HeicImage;
