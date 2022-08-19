import { SearchOutlined, ShoppingCartOutlined } from "@material-ui/icons";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import redheart from "./img/redheart.svg";
import { useHistory } from "react-router-dom";
import heart from "./img/heart.svg";
import avatar from "./img/avatar.jpg";
import { useEffect, useState, useRef } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import {
  addCart,
  removeCartItem,
  follow,
  likeItem,
  unlikeItem,
} from "../redux/apiCalls";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;
const Container1 = styled.div`
  margin: 1rem;
  background-color: #eff1ea;
`;
const Container = styled.div`
  flex: 1;
  flex-basis: 21%;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;
const Image = styled.img`
  height: 75%;
  z-index: 2;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.7s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const PostTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PostTopLeft = styled.div`
  display: flex;
  align-items: center;
`;
const PostTopRight = styled.div`
  display: flex;
  align-items: right;
`;
const PostImg = styled.img`
  margin-top: 20px;
  margin-top: 3px;
  width: 80%;
  max-height: 55px;
`;
const PostUserName = styled.span`
  padding-left: 15px;
  margin: 24px 0;
  font-weight: 600;
  flex-direction: row;
`;
const PostBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const PostBottomLeft = styled.div`
  margin: 2px 7px;
  display: flex;
  justify-content: flex-end;
`;
const PostLikeCounter = styled.div`
  font-size: 20px;
`;
const Product = ({ item }) => {
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart.products);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(product.liked);
  const [seller, setSeller] = useState({});
  const [likes, setLikes] = useState(product.likes?.length);
  const [state, setState] = useState();
  const history = useHistory();
  const [inCart, setInCart] = useState();
  useEffect(() => {
    // if (isInitialMount.current) {
    isInitialMount.current = false;
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + item._id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
    // }
  }, [item]);

  useEffect(() => {
    setLikes(product.likes?.length);
    setLiked(product.likes);
  }, [product]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await publicRequest.get("/users/find/" + product.sellerId);

        setSeller(res.data);
      } catch {}
    };
    getUser();
  }, [product]);
  // const a= product.likes;

  const handleAdd = () => {
    if (user) {
      product.buyerId = user._id;
      product.productId = product._id;
      product.color = "";
      product.size = "";
      setInCart(true);
      try {
        const a = dispatch(addCart({ ...product }, dispatch));
      } catch {
        console.log("andkdkd");
      }
    } else history.push("/login");
  };
  const handleRemove = () => {
    setInCart(false);
    dispatch(removeCartItem(product, dispatch));
  };

  const handleFollow = () => {
    seller.followId = seller._id;
    dispatch(follow(seller, user._id, dispatch));
  };
  const handleLiked = () => {
    const p = { ...product };
    p.likes.push(user._id);
    setProduct(p);
    setLikes(product.likes?.length);

    if (state) setState(false);
    else setState(true);
    // setState(product.likes.push(user._id))
    product.productId = product._id;
    try {
      dispatch(likeItem(product, user._id, dispatch));
    } catch {}
  };
  const handleUnliked = () => {
    const p = { ...product };
    const i = p.likes.indexOf(user._id);
    setLikes(product.likes?.length);
    if (i !== -1) {
      p.likes.splice(i, 1);
    }
    setProduct(p);
    if (state) setState(false);
    else setState(true);
    console.log(state);
    product.isLiked = true;
    product.productId = product._id;
    try {
      dispatch(unlikeItem(product, user._id, dispatch));
    } catch {}
  };

  return (
    <Container1>
      <PostTop>
        <Link to={`/profile/${seller._id}`}>
          <PostTopLeft>
            <PostImg
              src={seller.img ? `http://localhost:5000/${seller.img}` : avatar}
              alt=""
            />
            <PostUserName>{seller.username}</PostUserName>
          </PostTopLeft>
        </Link>
        <PostTopRight>
          {seller.sellerId === user?._id && (
            <button onClick={() => handleFollow(seller)}>follow</button>
          )}
        </PostTopRight>
      </PostTop>
      <PostUserName>{product.title}</PostUserName>
      <Container>
        <Circle />
        <Image src={`http://localhost:5000/${product.img}`} />
        <Info>
          {!inCart && (
            <Icon>
              <ShoppingCartOutlined onClick={() => handleAdd(product)} />
            </Icon>
          )}
          {inCart && (
            <Icon>
              <RemoveShoppingCartIcon onClick={() => handleRemove(product)} />
            </Icon>
          )}
          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlined />
            </Link>
          </Icon>
          <Icon>
            {liked?.includes(user?._id) ? (
              <img
                src={redheart}
                width="25px"
                onClick={() => handleUnliked(product)}
              />
            ) : (
              <img
                src={heart}
                width="25px"
                onClick={() => handleLiked(product)}
              />
            )}
          </Icon>
        </Info>
      </Container>
      <PostUserName>{product.desc}</PostUserName>
      <PostBottom>
        <PostBottomLeft>
          <PostLikeCounter>
            {likes} <img src={redheart} width="20px" />
          </PostLikeCounter>
          {/* <button>Show error alert</button> */}
        </PostBottomLeft>
      </PostBottom>
    </Container1>
  );
};
export default Product;
