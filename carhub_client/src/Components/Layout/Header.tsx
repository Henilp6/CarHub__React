import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetCarsQuery } from "../../Apis/carApi";

function Header() {
  const navigate = useNavigate();
  const [search, setSearchText] = useState("");

  const handleSearch = () => {
    navigate(`/search/${search}`);
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-dark border-bottom box-shadow mb-3">
      <div className="container-fluid">
        <span
          className="navbar-brand text-light"
          asp-area="Customer"
          asp-controller="Home"
          asp-action="Index"
        >
          <img
            src="/images/home/carlogo1.png"
            style={{ width: "50px", height: "50px" }}
          />{" "}
          Car Hub
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target=".navbar-collapse"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <span
          className="text-light"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Home
        </span>
        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul className="navbar-nav me-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Car Content
              </a>

              <ul className="dropdown-menu">
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item "
                  onClick={() => navigate("car/carList")}
                >
                  Car
                </li>

                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item "
                  onClick={() => navigate("cartype/cartypeList")}
                >
                  CarType
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item "
                  onClick={() => navigate("brand/brandList")}
                >
                  Brand
                </li>

                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item "
                  onClick={() => navigate("color/colorList")}
                >
                  Color
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item "
                  onClick={() => navigate("feature/featureList")}
                >
                  Feature
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    asp-area="Admin"
                    asp-controller="FeatureType"
                    asp-action="FeatureTypeByPagination"
                  >
                    FeatureType
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    className="nav-link text-light"
                    asp-area="Admin"
                    asp-controller="Dealer"
                    asp-action="IndexDealer"
                  >
                    Dealer
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Location
              </a>
              <ul className="dropdown-menu">
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item text-dark"
                  onClick={() => navigate("country/countryList")}
                >
                  Country
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item text-dark"
                  onClick={() => navigate("state/stateList")}
                >
                  State
                </li>
                <li
                  style={{ cursor: "pointer" }}
                  className="dropdown-item text-dark"
                  onClick={() => navigate("city/cityList")}
                >
                  City
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Car"
                  value={search}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  className="btn btn-primary ms-1"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
