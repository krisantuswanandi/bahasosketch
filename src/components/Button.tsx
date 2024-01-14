interface Props {
  className: string;
  children: JSX.Element | string;
  onClick: () => void;
}

const Button = ({ className, children, onClick }: Props) => {
  return (
    <button
      className={`block bg-neutral-900 font-sans text-neutral-100 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
