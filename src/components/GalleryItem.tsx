interface Props {
  name: string;
  thumb: string;
  url: string;
  onClick: (name: string, url: string) => void;
}

const GalleryItem = ({ name, thumb, url, onClick }: Props) => (
  <div className="gallery-item">
    <div
      className="gallery-image"
      style={{ backgroundImage: `url(${thumb})` }}
      onClick={() => {
        onClick(name, url);
      }}
    />
  </div>
);

export default GalleryItem;
