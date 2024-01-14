interface Props {
  name: string;
  thumb: string;
  url: string;
  onClick: (name: string, url: string) => void;
}

const GalleryItem = ({ name, thumb, url, onClick }: Props) => (
  <img
    className="aspect-square"
    src={thumb}
    alt={name}
    onClick={() => {
      onClick(name, url);
    }}
  />
);

export default GalleryItem;
