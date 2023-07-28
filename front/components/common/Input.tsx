import styled, { css } from "styled-components";

interface InputStyleProps {
  outlined?: "true" | "false";
  width?: "s" | "m" | "l";
}

const InputStyle = styled.input<InputStyleProps>`
  border: none;
  outline: none;
  font-size: 1rem;
  text-align: center;
  margin-top: 1rem;
  border-radius: 14px;
  padding: 0.5rem;
  border: 1px solid #f8c6d2;
  font-family: inherit;
  width: 100%;
  box-sizing: border-box;

  width: ${(props) =>
    props.width === "s"
      ? "50%"
      : props.width === "m"
      ? "80%"
      : props.width === "l"
      ? "100%"
      : "100%"};

  ${(props) =>
    props.outlined === "true" &&
    css`
      border: 1px solid #f4356c;
    `}

  ${(props) =>
    props.outlined === "false" &&
    css`
      border: 1px solid #f8c6d2;
    `}
`;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  outlined?: boolean;
  width?: "s" | "m" | "l";
}

const Input = ({ outlined, width = "l", ...props }: InputProps) => {
  return (
    <InputStyle
      outlined={outlined === true ? "true" : "false"}
      width={width}
      {...props}
    ></InputStyle>
  );
};

export default Input;
