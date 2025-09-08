// import React from 'react';
// import SmartEmbed from './Embed';

// export default function MediaDisplay({ item, className = "" }) {
//     if (!item) return null;

//     // Handle embedded video content
//     if (item.video_url) {
//         return (
//             <div className={className}>
//                 <SmartEmbed url={item.video_url} className="w-full aspect-video rounded-lg" />
//                 {item.title && <p className="mt-2 text-sm font-medium">{item.title}</p>}
//                 {item.description && <p className="mt-1 text-xs opacity-75">{item.description}</p>}
//             </div>
//         );
//     }

//     // Handle image content
//     if (item.image_url || item.file_url) {
//         const imageUrl = item.image_url || item.file_url;
//         return (
//             <div className={className}>
//                 <img
//                     src={imageUrl}
//                     alt={item.title || "Media content"}
//                     className="w-full h-auto object-cover rounded-lg"
//                     onError={(e) => {
//                         e.target.style.display = 'none';
//                     }}
//                 />
//                 {item.title && <p className="mt-2 text-sm font-medium">{item.title}</p>}
//                 {item.description && <p className="mt-1 text-xs opacity-75">{item.description}</p>}
//             </div>
//         );
//     }

//     // Handle file resources
//     if (item.file_url && item.kind === 'doc') {
//         return (
//             <div className={`border rounded-lg p-4 ${className}`}>
//                 <div className="flex items-center">
//                     <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                     <div>
//                         <p className="font-medium">{item.title}</p>
//                         {item.description && <p className="text-sm opacity-75">{item.description}</p>}
//                     </div>
//                 </div>
//                 <a
//                     href={item.file_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-3 inline-block btn btn-sm"
//                 >
//                     Download
//                 </a>
//             </div>
//         );
//     }

//     return null;
// }




import React from "react";
import SmartEmbed from "./Embed";

function isHttp(u) { return typeof u === "string" && /^https?:\/\//i.test(u); }

export default function MediaDisplay({ item, className = "" }) {
    if (!item) return null;

    if (item.video_url) {
        return (
            <div className={className}>
                <SmartEmbed url={item.video_url} className="w-full aspect-video rounded-lg" />
                {item.title && <p className="mt-2 text-sm font-medium">{item.title}</p>}
                {item.description && <p className="mt-1 text-xs opacity-75">{item.description}</p>}
            </div>
        );
    }

    if (item.image_url || item.file_url) {
        const imageUrl = item.image_url || item.file_url;
        if (!isHttp(imageUrl)) return null; // ignore invalid build-time paths
        return (
            <div className={className}>
                <img
                    src={imageUrl}
                    alt={item.title || "Media content"}
                    className="w-full h-auto object-cover rounded-lg"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                {item.title && <p className="mt-2 text-sm font-medium">{item.title}</p>}
                {item.description && <p className="mt-1 text-xs opacity-75">{item.description}</p>}
            </div>
        );
    }

    if (item.file_url && item.kind === "doc") {
        return (
            <div className={`border rounded-lg p-4 ${className}`}>
                <div className="flex items-center">
                    <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div>
                        <p className="font-medium">{item.title}</p>
                        {item.description && <p className="text-sm opacity-75">{item.description}</p>}
                    </div>
                </div>
                <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block btn btn-sm">
                    Download
                </a>
            </div>
        );
    }

    return null;
}
