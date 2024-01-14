import { useEffect } from "react";
import Button from "./Button";

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
    <div className="fixed inset-0 bg-white">
      <img src={image} className="h-full w-full object-contain" />
      <div className="absolute bottom-0 left-0 right-0 bg-white px-2 py-7">
        <Button
          className="m-auto w-full max-w-80 py-4 font-bold"
          onClick={onConfirm}
        >
          Upload
        </Button>
        <div
          className="mt-3 text-center font-bold underline"
          onClick={onCancel}
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

export default Popup;
