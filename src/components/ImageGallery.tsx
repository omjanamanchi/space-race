import { useState } from 'react';
import './ImageGallery.css';

export interface ImageMetadata {
    src?: string;
    videoUrl?: string;
    description: string;
    citation?: string;
}

interface ImageGalleryProps {
    images: ImageMetadata[] | string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    // Handle both old format (string[]) and new format (ImageMetadata[])
    const getImageSrc = (item: ImageMetadata | string): string => {
        return typeof item === 'string' ? item : item.src;
    };

    const getDescription = (item: ImageMetadata | string): string | null => {
        return typeof item === 'string' ? null : item.description;
    };

    const getCitation = (item: ImageMetadata | string): string | null => {
        return typeof item === 'string' ? null : item.citation || null;
    };

    const getVideoUrl = (item: ImageMetadata | string): string | null => {
        return typeof item === 'string' ? null : item.videoUrl || null;
    };

    // Convert YouTube watch URL to embed URL
    const convertToEmbedUrl = (url: string): string => {
        // Handle YouTube URLs
        if (url.includes('youtube.com/watch')) {
            const videoId = url.split('v=')[1]?.split('&')[0]?.split('#')[0];
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
        // Handle youtu.be short URLs
        if (url.includes('youtu.be/')) {
            const videoId = url.split('youtu.be/')[1]?.split('?')[0]?.split('#')[0];
            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }
        // If already an embed URL, return as is
        if (url.includes('youtube.com/embed')) {
            return url;
        }
        return url;
    };

    const currentImage = images[currentIndex];
    const currentSrc = getImageSrc(currentImage);
    const currentDescription = getDescription(currentImage);
    const currentCitation = getCitation(currentImage);
    const currentVideoUrl = getVideoUrl(currentImage);
    const isVideo = !!currentVideoUrl;

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="image-gallery">
            <div className="image-gallery__container">
                {images.length > 1 && (
                    <button 
                        className="image-gallery__nav image-gallery__nav--prev" 
                        onClick={goToPrevious}
                        aria-label="Previous image"
                    >
                        ←
                    </button>
                )}
                <div className="image-gallery__main">
                    {isVideo && currentVideoUrl ? (
                        <iframe
                            src={convertToEmbedUrl(currentVideoUrl)}
                            className="image-gallery__video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={currentDescription || `Gallery video ${currentIndex + 1}`}
                        />
                    ) : currentSrc ? (
                        <img 
                            src={currentSrc} 
                            alt={currentDescription || `Gallery image ${currentIndex + 1}`}
                            className="image-gallery__image"
                            onError={(e) => {
                                console.error('Failed to load image:', currentSrc);
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    ) : null}
                </div>
                {images.length > 1 && (
                    <button 
                        className="image-gallery__nav image-gallery__nav--next" 
                        onClick={goToNext}
                        aria-label="Next image"
                    >
                        →
                    </button>
                )}
            </div>
            {(currentDescription || currentCitation) && (
                <div className="image-gallery__metadata">
                    {currentDescription && (
                        <p className="image-gallery__description">{currentDescription}</p>
                    )}
                    {currentCitation && (
                        <p className="image-gallery__citation">{currentCitation}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;
