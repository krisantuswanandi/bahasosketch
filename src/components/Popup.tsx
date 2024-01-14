import { useEffect } from "react";

interface Props {
  title: string;
  image: string;
  close: () => void;
}

const Popup = ({ title, image, close }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="popup"
      onClick={() => {
        close();
      }}
    >
      <div
        className="popup-dialog"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="popup-header">
          <span className="popup-title">{title}&nbsp;</span>
          <span
            className="popup-close"
            onClick={() => {
              close();
            }}
          >
            X
          </span>
        </div>
        <div className="popup-body">
          {image === "" ? (
            <div className="popup-loading">Loading...</div>
          ) : (
            <img src={image} alt={title} className="popup-image" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
