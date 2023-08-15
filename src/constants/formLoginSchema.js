import * as Yup from "yup";

export const loginFormSchema = Yup.object({
  username: Yup.string().required("Please enter username!"),
  password: Yup.string()
    .required("Please enter password!")
    .min(5, "Password must be greater than 5"),
});