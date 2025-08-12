interface ButtonProps {
  label: string;
  onClick: (data: string) => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <>
      <button onClick={() => onClick("Натиснули кнопку")}>{label}</button>
    </>
  );
};

export default Button;
