import { Dropdown, NavDropdown } from "react-bootstrap";
import { Badge } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { ShoppingCartOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import bell from "./img/bell.svg";
import "./style.css";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import Announcement from "./Announcement";

const Container = styled.div`
  height: 60px;
  background-color: #94c3ec;
  position: relative;
  ${mobile({ height: "50px" })}
  position: fixed;
  z-index: 100;
  top: 0rem;
  width: 100%;
  text-decoration: none;

  margin-bottom: 5 rem; ;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  background-size: cover;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  /* font-weight: bold; */
  background-color: transparent;
  /* width :50px;
  height : 50px; */
  font-size: 24px !important;
  text-decoration: none;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  margin-left: 10px !important;
  font-size: 16px;
  cursor: pointer;
  margin-left: 3px;
  /* font-weight: bold; */
  ${mobile({ fontsize: "12px", marginLeft: "10ox" })}
  text-decoration: none !important;
`;
const PopUp = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: hidden;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  opacity: 1;
  transform: scale(1); /*scale it to a default size*/
`;
const BtnX = styled.button`
  cursor: pointer;
  border: 1px solid #999;
  border-radius: 50%;
  position: fixed;
  right: calc(5% - 35px);
  top: -7px;
`;
const Btn = styled.button`
  cursor: pointer;
  border: 1px solid #999;
  /* border-radius:50%; */
  position: relative;
  margin: 20px;
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;
const Image = styled.img`
  height: 60;
  width: 60;
  border-radius: 50%;
`;
const Content = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #f1f1f1;
  padding: 14px 28px;
  border-radius: 3px;
  max-width: 600px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;
const Input = styled.input`
  padding: 10px;
  padding-left: 5px;
  flex: 2;
  display: flexbox;
  align-self: left;
`;
const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [currUser, setCurrUser] = useState(user);
  const [product, setProduct] = useState({});
  const [inputs, setInputs] = useState("");
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/");
        setProduct(res.data);
      } catch { }
    };
    getProduct();
  }, [user]);
  useEffect(() => {
    const getSearch = async () => {
      try {
        const res = await publicRequest.get("/products?q=" + inputs);
      } catch { }
    };
    getSearch();
  }, [inputs]);
  useEffect(() => {
    return () => {
      setCurrUser(user);
    };
  }, [user]);
  const logOut = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };
  const Popup = () => {
    setModal(!modal);
  };

  const handleChange = (e) => {
    e.persist();
    setInputs(e.target.value);
  };
  return (
    <Container>
      <Announcement />
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>.HABESHA TILET SHOP</Logo>
            {/* <Logo><img src={LOGO} alt="LOGO" width={80} height={60}/></Logo> */}
          </Link>
        </Left>
        <Center>
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={handleChange}
            />
            <span className="input-group-text border-0" id="search-addon">
              <Link to={`/products/${inputs}`}>
                <i className="fas fa-search">Search</i>
              </Link>
            </span>
          </div>
        </Center>

        <Right>
          {!user && (
            <Link to="/login">
              <MenuItem>SIGN IN</MenuItem>
            </Link>
          )}

          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
          {user && (
            <NavDropdown title={currUser && currUser.username}>
              <Dropdown.Item onClick={Popup}>Logout</Dropdown.Item>
              <Dropdown.Item>
                <Link to={`/profile/${user._id}`}>View Profile</Link>
              </Dropdown.Item>
            </NavDropdown>
          )}

          {modal && (
            <PopUp>
              <Overlay onClick={Popup}></Overlay>
              <Content>
                <h2>Are You Sure You Want to LogOut?!</h2>
                <div>
                  <Btn onClick={logOut}> Yes </Btn>
                  <Btn> NO </Btn>
                </div>
                <BtnX onClick={Popup}>X</BtnX>
              </Content>
            </PopUp>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
