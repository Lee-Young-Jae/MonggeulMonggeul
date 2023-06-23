import styled, { css } from "styled-components";

interface ButtonStyleProps {
  children: React.ReactNode;
  isOutlined?: boolean;
  size?: "s" | "m" | "l";
}

const ButtonStyle = styled.button<ButtonStyleProps>`
  width: 100%;
  border: none;
  border-radius: 15px;
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  color: white;

  background-color: #f8c6d2;
  font-family: inherit;
  font-size: 1rem;

  ${(props) =>
    props.isOutlined &&
    css`
      background-color: white;
      border: 1px solid #f8c6d2;
      color: rgb(151, 151, 151);
    `}

  ${(props) =>
    props.size === "s" &&
    css`
      width: 30%;
    `}
  ${(props) =>
    props.size === "m" &&
    css`
      width: 50%;
    `}  
  ${(props) =>
    props.size === "l" &&
    css`
      width: 100%;
    `}
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isOutlined?: boolean;
  size?: "s" | "m" | "l";
}

const Button = ({ isOutlined, size, ...props }: ButtonProps) => {
  return (
    <ButtonStyle {...props} isOutlined={isOutlined} size={size}></ButtonStyle>
  );
};

export default Button;
