import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Textfield } from "./Texfield";
import * as Yup from "yup";
import Axios from "axios";

const LoginForm = () => {
  const validate = Yup.object({
    email: Yup.string().email(`Email invalide !`).required(`Requis`),
    password: Yup.string()
      .min(8, `Au moins 8 caractères pour votre mot de passe`)
      .required(`Requis`),
  });

  let navigate = useNavigate();

  const loginHandler = async (values, { resetForm }) => {
    await Axios.post("http://localhost:5000/auth/login", values)
      .then((res) => {
        console.log(res);
        localStorage.setItem("jwtToken", "Bearer" + " " + res.data.jwtToken);
        localStorage.setItem("UserId", res.data.user.id);
        localStorage.setItem("UserName", res.data.user.firstName);
        localStorage.setItem("isAdmin", res.data.user.isAdmin);
        resetForm();
        navigate("/homepage");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div
      className="
                col-md-5
                d-flex
                flex-column
                align-items-left
                p-3
                bg-white
                rounded
                border-primary
              "
    >
      <h4 className="pb-2">Rentrez vos identifiants pour vous connecter</h4>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnBlur
        validationSchema={validate}
        onSubmit={loginHandler}
        handleChange
        handleSubmit
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Textfield
              label="Email"
              name="email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Textfield
              label="Mot de passe"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-success mt-3"
            >
              <Link to="#" className="nav-link text-white">
                Se connecter
              </Link>
            </button>
            <div className="row d-flex align-items-center">
              <div className="col-md-12 mt-3">
                <h5>Vous n'avez pas encore de compte ?</h5>
                <button type="button" className="btn btn-primary mt-1">
                  <Link to="/signup" className="nav-link text-white">
                    Créer un compte
                  </Link>
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
