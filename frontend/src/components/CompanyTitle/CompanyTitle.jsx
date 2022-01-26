import React from "react";

export default function CompanyTitle() {
  return (
    <div className="col-md-5 d-flex bg-primary rounded">
      <div
        className="
                  page-header
                  d-flex
                  flex-column
                  align-items-center
                  justify-content-center
                  pt-2
                "
      >
        <div className="d-flex justify-content-center row">
          <img
            src={require("../../images/Groupomania_Logos+(3)/icon-left-font-monochrome-white.png")}
            alt="Logo Groupomania"
            className="w-75"
          />
          <h2 className="d-flex justify-content-center text-white">Network</h2>
        </div>
      </div>
    </div>
  );
}
