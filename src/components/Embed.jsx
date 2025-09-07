
import React from "react";

// simple detectors
const YT = /(?:youtu\.be\/|youtube\.com\/watch\?v=|youtube\.com\/shorts\/)([A-Za-z0-9_-]{6,})/i;
const VIMEO = /vimeo\.com\/(\d+)/i;
const IG = /instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/i;
const MP4 = /\.(mp4|webm|ogg)(\?.*)?$/i;

export default function SmartEmbed({ url, className = "" }) {
    if (!url) return null;

    // Direct file
    if (MP4.test(url)) {
        return (
            <video
                className={`w-full h-full object-cover ${className}`}
                src={url}
                controls
                autoPlay
                muted
                playsInline
                loop
            />
        );
    }

    // YouTube
    const mYt = url.match(YT);
    if (mYt) {
        const id = mYt[1];
        return (
            <iframe
                className={`w-full h-full ${className}`}
                src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&playsinline=1&rel=0`}
                title="YouTube"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
            />
        );
    }

    // Vimeo
    const mV = url.match(VIMEO);
    if (mV) {
        const id = mV[1];
        return (
            <iframe
                className={`w-full h-full ${className}`}
                src={`https://player.vimeo.com/video/${id}?autoplay=1&muted=1&playsinline=1`}
                title="Vimeo"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
            />
        );
    }

    // Instagram post/reel/tv  ->  use the embeddable endpoint
    const mIg = url.match(IG);
    if (mIg) {
        const id = mIg[1];
        return (
            <iframe
                className={`w-full h-full ${className}`}
                src={`https://www.instagram.com/reel/${id}/embed`}
                title="Instagram"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
            />
        );
    }

    // Fallback – try as <video>
    return (
        <video
            className={`w-full h-full object-cover ${className}`}
            src={url}
            controls
            muted
            playsInline
        />
    );
}
