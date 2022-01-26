import React from "react";
import Title from "../Title";
import Topbar from "../Topbar/Topbar";
import SignupForm from "../IdentificationForm/SignupForm";
import CompanyTitle from "../CompanyTitle/CompanyTitle";

export default function Signup() {
  return (
    <div>
      <div className="row vh-100 m-0 p-0">
        <Topbar />
        <div className="row background m-0 p-0">
          <div
            className="
          col-md-12
          d-flex
          align-items-center
          justify-content-center
          p-0
          mainContainer
        "
          >
            <div className="row m-3 justify-content-between">
              <Title />
              <CompanyTitle />
              <SignupForm />
            </div>
          </div>
          <footer
            className="bg-success text-center text-white
      border-top border-primary border-3"
          >
            <div className="text-center p-3">Propriété de Groupomania</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
