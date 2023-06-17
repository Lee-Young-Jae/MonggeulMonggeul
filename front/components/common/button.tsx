interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ ...props }: ButtonProps) => {
  return <button {...props}></button>;
};

export default Button;
