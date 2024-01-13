import React from 'react'

const GalleryLink = ({url, link}) => (
    <div className="gallery-item">
        <a href={link} className="gallery-image" style={{backgroundImage: `url(${url})`}} target="_blank" rel="noopener noreferrer">
            <span>&nbsp;</span>
        </a>
    </div>
)

export default GalleryLink
