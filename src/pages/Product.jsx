import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/apiCalls";
import { removeCartItem } from "../redux/apiCalls";

const Container = styled.div`
  top: 1rem;
  margin-top: 5rem;
`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 80;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;
const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [sendProduct, setSendProduct] = useState({ product });
  const [cart, setCart] = useState(false);
  const [c, setC] = useState([]);
  const [s, setS] = useState([]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setSendProduct(res.data);
        console.log(product);
      } catch {}
      setC(product.color);
      setS(product.size);
      console.log(c, "jdskjdksjdskjdsk", s);
    };
    getProduct();
  }, [id]);

  const handleAdd = async () => {
    sendProduct.buyerId = user._id;
    sendProduct.productId = product._id;
    sendProduct.color = color;
    sendProduct.size = size;
    console.log({ ...sendProduct }, "s2");
    if (!cart) {
      setCart(true);
      dispatch(addCart({ ...sendProduct }, dispatch));
    } else {
      setCart(false);
    }
  };
  const handleRemove = () => {
    dispatch(removeCartItem(product, dispatch));
  };
  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <ImgContainer>
            <Image src={`http://localhost:5000/${product.img}`} />
          </ImgContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>DESCRIPTION: {product.desc}</Desc>
            <Price>ETB {product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {c?.map((c) => (
                  <FilterColor color={c} key={c} />
                ))}
              </Filter>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {s?.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <Button onClick={handleAdd} disabled={cart}>
                ADD TO CART
              </Button>
              {/* {cart && <Button onClick={handleRemove}>REMOVE</Button>} */}
            </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
      </Container>
    </div>
  );
};

export default Product;
