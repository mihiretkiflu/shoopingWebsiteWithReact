import styled from "styled-components";
// import { Button } from "react-bootstrap";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 50vh;
  position: relative;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;
const Info = styled.div`
  opacity: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* transition: all 0.5s ease; */
  cursor: pointer;
`;
const Title = styled.h1`
  align-items: center;
  color: white;
  margin: 5px;
`;
const P = styled.p`
  opacity: 0.8;
  margin-right: 100px;
  margin-left: 100px;
  color: white;
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #462e46;
  color: white;
  cursor: pointer;
  font-weight: 600;
  border-radius: 50%;
  transition: all 0.5s ease;
  &:hover {
    background-color: #834d83;
    transform: scale(1.1);
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
