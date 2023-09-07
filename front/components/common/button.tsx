import styled, { css } from "styled-components";

interface ButtonStyleProps {
  children: React.ReactNode;
  outlined?: "true" | "false";
  size?: "s" | "m" | "l";
  align?: "left" | "center" | "right";
  color?: "default" | "unimportant";
  disabled?: boolean;
}

const ButtonStyle = styled.button<ButtonStyleProps>`
  width: 100%;
  border: none;
  border-radius: 15px;
  padding: 0.5rem;
  margin-top: 1rem;
  cursor: pointer;
  color: white;

  margin-left: ${(props) => (props.align === "left" ? "0" : "auto")};
  margin-right: ${(props) => (props.align === "right" ? "0" : "auto")};

  background-color: ${(props) =>
    props.color === "default" ? "#f4356c" : "#ccc"};

  font-family: inherit;
  font-size: 1rem;

  ${(props) =>
    props.outlined === "true" &&
    css`
      background-color: white;
      border: 1px solid #f4356c;
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

  ${(props) =>
    props.disabled &&
    css`
      background-color: #ccc;
      cursor: not-allowed;
    `}
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  outlined?: boolean;
  size?: "s" | "m" | "l";
  color?: "default" | "unimportant";
  align?: "left" | "center" | "right";
}

const Button = ({
  outlined,
  size,
  color = "default",
  align = "center",
  ...props
}: ButtonProps) => {
  return (
    <ButtonStyle
      size={size}
      outlined={outlined === true ? "true" : "false"}
      color={color}
      align={align}
      {...props}
    ></ButtonStyle>
  );
};

export default Button;
