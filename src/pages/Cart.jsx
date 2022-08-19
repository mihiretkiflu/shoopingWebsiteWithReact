import { Add, Remove } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { removeCartItem } from "../redux/apiCalls";

const Container = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })};
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Cart = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await userRequest.get("/carts/find/" + user._id);
        setProduct(res.data);
      } catch {}
    };
    getUser();

    // if (cart._id === item._id)
  }, [user]);
  const handleCheckOut = () => {
    if (!user) history.push("/login");
    else history.push("/payment");
  };
  const handleRemove = (product) => {
    dispatch(removeCartItem(product, dispatch));
  };
  return (
    <div>
      <Container>
        <Navbar />
        <Announcement />

        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton>CONTINUE SHOPPING</TopButton>
            <TopTexts>
              <TopText>Shopping Bag</TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT</TopButton>
          </Top>
          <Bottom>
            <Info>
              {cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image
                      src={`http://localhost:5000/${product.img}`}
                      key={product._id}
                    />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>

                      <Button onClick={() => handleRemove(product)}>
                        {" "}
                        REMOVE{" "}
                      </Button>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductPrice>{product.price} Birr</ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>{cart.total} Birr</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>0</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>0</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>{cart.total} Birr</SummaryItemPrice>
              </SummaryItem>
              <Button onClick={handleCheckOut}>PAY NOW</Button>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
      <Footer />
    </div>
  );
};

export default Cart;
