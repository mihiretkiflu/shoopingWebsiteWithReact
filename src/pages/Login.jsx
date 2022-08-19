import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { loginSchema } from "../Validations/UserValidation";
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
  width: 40%;
  padding: 20px;
  background: aliceblue;
  opacity: 70%;
  background-size: cover;
  border-style: groove;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 15;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const LinkU = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;
const Small = styled.small`
  color: red;
`;
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
    };
    const isValid = await loginSchema.isValid(formData);
    formik.setValues(formData);
    console.log(formik.errors);
    if (isValid) {
      login(dispatch, { username, password });
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleClick,
  });

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Incorrect Username or Password</Error>}

          <Link to="/register">
            <LinkU>CREATE A NEW ACCOUNT</LinkU>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
