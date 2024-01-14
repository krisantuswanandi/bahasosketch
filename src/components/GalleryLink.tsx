interface Props {
  url: string;
  link: string;
}

const GalleryLink = ({ url, link }: Props) => (
  <div className="gallery-item">
    <a
      href={link}
      className="gallery-image"
      style={{ backgroundImage: `url(${url})` }}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span>&nbsp;</span>
    </a>
  </div>
);

export default GalleryLink;
