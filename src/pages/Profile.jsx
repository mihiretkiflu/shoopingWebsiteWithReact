import styled from "styled-components";
// import "./profile.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Product from "../components/Product";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../components/img/avatar.jpg";
import { publicRequest } from "../requestMethods";
import { follow, unfollow, updateUser } from "../redux/apiCalls";
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  margin: 2 rem !important;
`;
// import Product from "./Product";
const ItemContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
export default function Profile({ id }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  // const state = useSelector(state=>state.user.followstate)
  const location = useLocation();
  const uid = location.pathname.split("/")[2];
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const [following, setfollowing] = useState();
  const [followed, setfollowed] = useState();
  const [follower, setfollower] = useState();
  const [state, setState] = useState();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await publicRequest.get("/users/find/" + uid);
        setUser(res.data);
      } catch {
        console.log("1");
      }
    };
    getUser();
    setfollower(user.followers?.length);
    setfollowing(user.following?.length);
  }, [currentUser]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("products/findBySeller/" + uid);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
    console.log(product);
  }, [id]);
  const handleFollow = () => {
    const u = { ...user };
    u.followers.push(currentUser._id);
    setUser(u);
    setfollower(user.followers?.length);
    if (state) setState(false);
    else if (!state) setState(true);
    user.followId = user._id;
    dispatch(follow(user, currentUser._id, dispatch));
  };
  const handleUnfollow = () => {
    const u = { ...user };
    const i = u.followers.indexOf(currentUser._id);
    console.log(i);

    setfollower(user.likes?.length);
    if (i !== -1) {
      u.followers.splice(i, 1);
    }
    setUser(u);
    if (state) setState(false);
    else if (!state) setState(true);
    user.unfollowId = user._id;
    dispatch(unfollow(user, currentUser._id, dispatch));
  };
  console.log(product, "productssssssssss");
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", e.target.files[0]);

    try {
      const a = await updateUser(uid, formData, dispatch);
      console.log(formData, "upla");
    } catch {}
  };
  return (
    <div>
      <Navbar />
      <div
        style={{
          maxWidth: "550px",
          margin: "0px auto",
          marginTop: "6rem",
        }}
      >
        <div
          style={{
            margin: "18px 0px",
            borderTop: "1rem",
            borderBottom: "1px solid grey",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div>
              <img
                id="pImage"
                style={{ width: "auto", height: "160px", borderRadius: "10px" }}
                src={
                  `http://localhost:5000/${user.img}` ===
                  "http://localhost:5000/https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png"
                    ? avatar
                    : `http://localhost:5000/${user.img}`
                }
              />
            </div>
            <div>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{follower ? follower : "0"} followers</h6>
                <h6>{following ? following : "0"} following</h6>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{product?.length} Products</h6>
              </div>
            </div>
          </div>

          <div className="file-field input-field" style={{ margin: "10px" }}>
            <div className="btn #64b5f6 blue darken-1">
              <span>Update pic</span>
              <input type="file" onChange={handleUpload} />
            </div>
          </div>
        </div>
        {user.isSeller && (
          <Link to="/AddProduct">
            <Button>add Product</Button>
          </Link>
        )}
        {currentUser._id != user._id && (
          <Button
            style={{ marginLeft: "1rem" }}
            onClick={() => handleFollow(user)}
          >
            Follow
          </Button>
        )}
        {currentUser._id != user._id && (
          <Button
            style={{ marginLeft: "1rem" }}
            onClick={() => handleUnfollow(user)}
          >
            Unfollow
          </Button>
        )}
      </div>
      <ItemContainer>
        {product.slice(0, 16).map((item) => (
          <Product item={item} key={item._id} />
        ))}
      </ItemContainer>
      <Newsletter />
      <Footer />
    </div>
  );
}
