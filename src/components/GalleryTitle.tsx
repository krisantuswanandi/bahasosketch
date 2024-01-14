interface Props {
  text: string;
}

const GalleryTitle = ({ text }: Props) => (
  <div className="flex aspect-square h-full flex-col items-center justify-center bg-neutral-900 text-neutral-100">
    <span className="text-6xl sm:text-7xl lg:text-8xl">{text}</span>
    <span className="text-sm sm:text-xl lg:text-2xl">OCTOBER</span>
  </div>
);

export default GalleryTitle;
