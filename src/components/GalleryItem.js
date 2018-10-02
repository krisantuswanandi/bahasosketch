import React from 'react'

const GalleryItem = ({name, thumb, url, onClick}) => (
    <div className="gallery-item">
        <div className="gallery-image" style={{backgroundImage: `url(${thumb})`}} onClick={() => { onClick(name, url) }}/>
    </div>
)

export default GalleryItem
