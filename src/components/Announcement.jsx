import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #5e9191;
  color: #050505;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>By Ethiopians form Ethiopia </Container>;
};

export default Announcement;
