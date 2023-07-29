import "./style.css";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
const loginInfos = {
  email: '',
  password: '',
};
export default function Login() {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  console.log(login);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="logo" />
            <span>
              Facebook Helps you connects with peoples all around the globe.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
              enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
              >
                {(Formik) => (
                  <Form>
                    <LoginInput
                      type="text"
                      name="email"
                      placeholder="Email address or phone number"
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleLoginChange}
                    />
                    <button type="submit" className="blue_btn">
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forgot" className="forgot_password">
                Forgotten Password ?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
              <b>Create a Page</b>
              for a celebrity, band or business.
            </Link>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
}
