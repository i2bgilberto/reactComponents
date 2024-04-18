interface props {
  children: React.ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: props) => {
  return (
    <button type="button" className="btn btn-primary" id="bu" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
