import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { Textfield } from "./Texfield";
import * as Yup from "yup";
import Axios from "axios";

const SignupForm = () => {
  const validate = Yup.object({
    firstName: Yup.string()
      .max(20, `Moins de 20 caractères !`)
      .required(`Requis`),
    email: Yup.string().email(`Email invalide !`).required(`Requis`),
    password: Yup.string()
      .min(8, `Au moins 8 caractères pour votre mot de passe`)
      .required(`Requis`),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        `Les mots de passe ne correspondent pas !`
      )
      .required(`Veuillez confirmer votre mot de passe`),
  });

  let navigate = useNavigate();

  const signupHandler = async (values, { resetForm }) => {
    await Axios.post("http://localhost:5000/auth/signup", values).then(
      (res) => {
        resetForm();
      }
    );
    Axios.post("http://localhost:5000/auth/login", values)
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
        console.log("Error :", err.response.data);
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
      id="loginComponent"
    >
      <Formik
        initialValues={{
          firstName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validateOnBlur
        validationSchema={validate}
        onSubmit={signupHandler}
        handleChange
        handleSubmit
      >
        {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Textfield
              label="Nom"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
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
            <Textfield
              label="Confirmer le mot de passe"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn btn-primary mt-3"
            >
              <Link to="/login" className="nav-link text-white">
                Créer votre compte
              </Link>
            </button>
          </Form>
        )}
      </Formik>
      <div className="row d-flex align-items-center">
        <div className="col-md-12 mt-3">
          <h5>Vous avez déjà un compte ?</h5>
          <button type="button" className="btn btn-success mt-1">
            <Link to="/login" className="nav-link text-white">
              Se connecter
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
