import * as Yup from "yup";
const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const userSchema = Yup.object({
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  password: Yup.string().min(6).required("Password is required"),
  email: Yup.string().email().required("email required"),
  isSeller: Yup.boolean(),
  phoneNo: Yup.string()
    .matches(phoneRegExp, "invalid Phone Number")
    .min(10)
    .required(),
  lastName: Yup.string().min(3).max(20).required("required"),
  firstName: Yup.string().min(3).max(20).required("required"),
  username: Yup.string().min(3).max(20).required("required"),
});
export const loginSchema = Yup.object({
  password: Yup.string().min(6).required("Password is required"),
  username: Yup.string().min(3).max(20).required("required"),
});
export const addProductSchema = Yup.object({
  file: Yup
    .mixed()
    .required("file required")
  ,
  title: Yup.string().required("title required"),
  price: Yup.number().required("price required"),
  desc: Yup.string().required("description required"),
  categories: Yup.string().required("categories required"),
  size: Yup.string().required("size required"),
  color: Yup.string().required("color required"),
});
