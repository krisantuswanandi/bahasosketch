interface Props {
  url: string;
  link: string;
}

const GalleryLink = ({ url, link }: Props) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <img src={url} alt={link} />
  </a>
);

export default GalleryLink;
