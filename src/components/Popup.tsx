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
      className="fixed inset-0 z-50 flex overflow-auto bg-neutral-500/50 p-4 backdrop-blur"
      onClick={() => {
        close();
      }}
    >
      <div
        className="m-auto w-full max-w-screen-sm overflow-hidden border border-neutral-400/20 bg-white shadow-lg"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex items-center justify-between">
          <span className="truncate pl-3">{title}&nbsp;</span>
          <button
            className="px-5 py-3"
            onClick={() => {
              close();
            }}
          >
            &#x2715;
          </button>
        </div>
        <div className="min-h-40 p-2 pt-0">
          {image === "" ? (
            <div className="p-14 text-center">Loading...</div>
          ) : (
            <img src={image} alt={title} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
