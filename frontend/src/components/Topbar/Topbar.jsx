import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Topbar() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    checkUser();
    return () => {};
  }, [isLogged]);

  function checkUser() {
    if (localStorage.getItem("UserName")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }

  const logout = () => {
    localStorage.clear();
  };

  const userName = localStorage.getItem("UserName");

  return (
    <div className=" topbar border-bottom border-primary border-3 p-2 justify-content-between">
      <nav
        className="
            navbar navbar-expand-lg navbar-light w-100 d-flex justify-content-between justify-content-end
          "
      >
        <div className="row">
          <img
            src={require("../../images/Groupomania_Logos+(3)/icon.png")}
            alt="Logo Groupomania"
            className="col-5 m-0 p-0"
          />
          {isLogged ? (
            <div className="d-flex flex-column col-4 p-1 mt-2">
              <h5 className="">Bienvenue</h5>
              <span>
                <strong>{userName}</strong>
              </span>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {isLogged ? (
          <div className="d-flex justify-content-between">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/homepage" className="nav-link d-flex">
                  Homepage
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link d-flex">
                  Mon profil
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={logout} className="nav-link d-flex">
                  Se déconnecter
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="navbar-nav">
            <Link to="/login" className="nav-link d-flex">
              Se connecter
            </Link>
          </ul>
        )}
      </nav>
    </div>
  );
}
