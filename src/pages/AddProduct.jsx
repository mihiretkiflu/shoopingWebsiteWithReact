import { useState } from "react";
// import "./AddProduct.css";
import styled from "styled-components";
import { addProduct } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addProductSchema } from "../Validations/UserValidation";
import { useFormik } from "formik";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(235, 97, 97, 0.5), rgba(255, 255, 255, 0.5)),
    url("https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/fd56d834311091.56cc3bc216d24.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  min-width: 25%;
  padding: 20px;
  background: aliceblue;
  opacity: 80%;
  flex-direction: column;
  background-size: cover;
  border-radius: 10px;
  box-shadow: 3px 3px 40px #545454e8;
`;
const H1 = styled.h1`
  margin-bottom: 20px;
`;
const AddProductItem = styled.div`
  width: 250px;
  margin-top: 20px;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
`;
const Label = styled.label`
  color: gray;
  font-weight: 1000;
  padding-bottom: 10px;
  padding-bottom: 5px;
  flex: 1;
  display: flex;
  align-items: center;
  color: #000000;
`;
const Input = styled.input`
  padding: 10px;
  padding-left: 5px;
  flex: 2;
  display: flexbox;
  align-self: left;
`;
const Select = styled.select`
  padding: 10px;
  flex: 1;
  display: flex;
  align-items: left;
`;
const AddProductButton = styled.div`
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
  padding: 7px 10px;
  border: none;
  border-radius: 10px;
  background-color: rgb(86, 86, 233);
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const PopUp = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: hidden;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  -webkit-transition: opacity 0.7s;
  transition: opacity 0.7s;
`;
const Button = styled.button`
  align-items: center;
  position: relative;
`;
const Content = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: #a2f18e;
  padding: 14px 28px;
  border-radius: 3px;
  max-width: 600px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  transition: opacity 0.7s;
`;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  -webkit-transition: opacity 0.7s;
  transition: opacity 0.7s;
`;
const Small = styled.small`
  color: red;
  display: flex;
  justify-content: end;
`;
export default function NewProduct() {
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({});
  const [newProduct, setNewProduct] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    e.persist();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    e.persist();
    setCat((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const Popup = () => {
    var t = setTimeout(setModal(!modal), 5000);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      newProduct.file = file;
      newProduct.title = inputs.title;
      newProduct.price = inputs.price;
      newProduct.desc = inputs.desc;
      newProduct.categories = cat.categories;
      newProduct.size = cat.size;
      newProduct.color = cat.color;
      const isValid = await addProductSchema.isValid(newProduct);
      console.log(isValid, "Valid");
      formik.setValues(newProduct);
      console.log(newProduct, "data");
      console.log(isValid, "error");
      if (isValid) {
        const formData = new FormData();
        formData.append("img", file);
        formData.append("title", inputs.title);
        formData.append("price", inputs.price);
        formData.append("desc", inputs.desc);
        formData.append("size", cat.size);
        formData.append("color", cat.color);
        formData.append("categories", cat.categories);
        formData.append("sellerId", user._id);
        var a = await dispatch(addProduct(formData, dispatch));
      }
    } catch (err) {
      console.log(err, "err");
    }
    // Popup()
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: addProductSchema,
    onSubmit: handleClick,
  });
  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <H1 className="addProductTitle">New Product</H1>
          <AddProductItem>
            <Label>Image</Label>
            <Input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </AddProductItem>
          <Small>{formik.errors.file}</Small>
          <AddProductItem>
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              placeholder="title"
              onChange={handleChange}
            />
          </AddProductItem>
          <Small>{formik.errors.title}</Small>
          <AddProductItem>
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              placeholder="price"
              onChange={handleChange}
            />
          </AddProductItem>
          <Small>{formik.errors.price}</Small>
          <AddProductItem>
            <Label>Description</Label>
            <Input
              name="desc"
              type="text"
              placeholder="description,,,"
              onChange={handleChange}
            />
          </AddProductItem>
          <Small>{formik.errors.desc}</Small>
          <AddProductItem>
            <Label>Categories</Label>
            <Input
              name="categories"
              type="text"
              placeholder="culture, "
              onChange={handleCat}
            />
          </AddProductItem>
          <Small>{formik.errors.categories}</Small>
          <AddProductItem>
            <Label>Size</Label>
            <Input
              name="size"
              type="text"
              placeholder="S, M , L, XL, XXL..."
              onChange={handleCat}
            />
          </AddProductItem>
          <Small>{formik.errors.size}</Small>
          <AddProductItem>
            <Label>Color</Label>
            <Input
              name="color"
              type="text"
              placeholder="red,blue,white..."
              onChange={handleCat}
            />
          </AddProductItem>
          <Small>{formik.errors.color}</Small>
          <AddProductItem>
            <Label>Stock</Label>
            <Select onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </AddProductItem>
          <AddProductItem>
            <Button>
              <AddProductButton onClick={handleClick}>Create</AddProductButton>
            </Button>
          </AddProductItem>

          {modal && (
            <PopUp>
              <Overlay onClick={Popup}></Overlay>
              <Content>
                <h2>Upload Successfull! </h2>
              </Content>
            </PopUp>
          )}
        </Wrapper>
      </Container>
    </div>
  );
}
