import styled from "styled-components";
import { useDispatch } from "react-redux";
import { mobile } from "../responsive";
import React, { useState, useCallback } from "react";
import { register } from "../redux/apiCalls";
import { Link, useHistory } from "react-router-dom";
import { userSchema } from "../Validations/UserValidation";
import { useFormik } from "formik";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(235, 97, 97, 0.5), rgba(255, 255, 255, 0.5)),
    url("https://d1v9pyzt136u2g.cloudfront.net/blog/wp-content/uploads/2021/07/23095000/habesha.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background: transparent;
  background: aliceblue;
  opacity: 70%;
  background-size: cover;
  border-style: groove;
  ${mobile({ width: "75%" })}
  left:25%;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;
const Small = styled.small`
  color: red;
`;
const Label = styled.label`
  font-weight: 800;
  padding-bottom: 10px;
  padding-bottom: 5px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Input = styled.input`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 15px;
  margin-top: 15px;
`;
const Agreement = styled.span`
  font-size: 15px;
  margin: 20px 0px;
`;
const AddProductItem = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  justify-content: space-between;
`;
const Select = styled.select`
  padding: 10px;
  flex: 1;
  display: flex;
  align-items: left;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Warn = styled.div`
  font-size: 20px;
`;

const Register = () => {
  const [inputs, setInputs] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.persist();
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    formik.setValues(inputs);
    console.log(formik.values, "formik");
    console.log(inputs, "se");
    const isValid = await userSchema.isValid(inputs);

    console.log(isValid, "insp");
    if (isValid) {
      const user = { ...inputs };
      if (user.password === user.confirmPassword) {
        register(user, dispatch);
        history.push("/login");
      } else setIsLoggedIn(true);
    } else {
    }
  };

  const formik = useFormik({
    initialValues: {
      confirmPassword: "",
      password: "",
      email: "",
      isSeller: "",
      phoneNo: "",
      lastName: "",
      firstName: "",
      username: "",
    },
    validationSchema: userSchema,
    onSubmit: handleClick,
  });

  return (
    <div>
      <Navbar />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form onSubmit={formik.handleSubmit}>
            <AddProductItem>
              <Label>First Name</Label>
              <div>
                <Input
                  name="firstName"
                  placeholder="firsname"
                  onChange={handleChange}
                />
                <Small>{formik.errors.firstName}</Small>
              </div>
            </AddProductItem>

            <AddProductItem>
              <Label>Last Name</Label>
              <div>
                <Input
                  name="lastName"
                  placeholder="lastname"
                  onChange={handleChange}
                />
                <Small>{formik.errors.lastName}</Small>
              </div>
            </AddProductItem>

            <AddProductItem>
              <Label>Username</Label>
              <div>
                <Input
                  name="username"
                  placeholder="username"
                  onChange={handleChange}
                />
                <Small>{formik.errors.username}</Small>
              </div>
            </AddProductItem>

            <AddProductItem>
              <Label>E-mail</Label>
              <div>
                <Input
                  name="email"
                  placeholder="email"
                  onChange={handleChange}
                />
                <Small>{formik.errors.email}</Small>
              </div>
            </AddProductItem>

            <AddProductItem>
              <Label>phoneNo</Label>
              <div>
                <Input
                  name="phoneNo"
                  placeholder="Phone number"
                  onChange={handleChange}
                />
                <Small>{formik.errors.phoneNo}</Small>
              </div>
            </AddProductItem>

            <AddProductItem>
              <Label>Password</Label>
              <div>
                <Input
                  name="password"
                  type="password"
                  placeholder="password"
                  onChange={handleChange}
                />
                <Small>{formik.errors.password}</Small>
              </div>
            </AddProductItem>

            <AddProductItem>
              <Label>Confirm Password</Label>
              <div>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  onChange={handleChange}
                />
                <Small>{formik.errors.confirmPassword}</Small>
              </div>
            </AddProductItem>

            <AddProductItem>
              <Label>Seller?</Label>
              <Select name="isSeller" onChange={handleChange}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </Select>
            </AddProductItem>

            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            {isLoggedIn && <Warn>Incorrect Username or Password</Warn>}
            <Button
              disabled={!userSchema?.isValid(inputs)}
              onClick={handleClick}
            >
              CREATE
            </Button>
          </Form>
        </Wrapper>
      </Container>
    </div>
  );
};

export default Register;
