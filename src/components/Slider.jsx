// import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 50vh;
  display: flex;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  margin: 20px;
  ${mobile({ display: "none" })}
`;
const Wrapper = styled.div`
  height: 70%;
  display: flex;
  transition: all 3s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  width: 100vw;
  height: 50vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  margin-left: 70px;
  height: 100%;
  flex: 1;
`;
const Image = styled.img`
  height: 85%;
  margin: 20px 60px;
  align-items: center;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
  align-items: center;
`;
const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  var ciclo;
  function startSlidercicle() {
    ciclo = setInterval(function () {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
      clearInterval(ciclo);
    }, 6000);
    return () => {
      // cancel the subscription
      setSlideIndex = {};
    };
  }
  startSlidercicle();

  return (
    <Container>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
    </Container>
  );
};

export default Slider;
