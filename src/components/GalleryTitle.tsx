interface Props {
  text: string;
}

const GalleryTitle = ({ text }: Props) => (
  <div className="gallery-item">
    <div className="gallery-title">
      <span className="text">{text}</span>
      <span>OCTOBER</span>
    </div>
  </div>
);

export default GalleryTitle;
