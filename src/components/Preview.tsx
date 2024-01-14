import { useEffect } from "react";

interface Props {
  title: string;
  image: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Popup = ({ image, onConfirm, onCancel }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="preview-container">
      <div
        className="preview-image"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="preview-button">
        <button className="confirm-button" onClick={onConfirm}>
          Upload
        </button>
        <div className="cancel" onClick={onCancel}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default Popup;
