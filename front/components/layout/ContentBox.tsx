import styled from "styled-components";

const StyledContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 10px;
  background-color: white;
`;

interface ContentBoxProps {
  children: React.ReactNode;
}

const ContentBox = ({ children }: ContentBoxProps) => {
  return <StyledContentBox>{children}</StyledContentBox>;
};

export default ContentBox;
