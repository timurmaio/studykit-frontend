import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignInForm from "../../components/SignInForm";
import { API_URL } from "../../config";

function SignIn() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
  });

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      ...state,
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const url = `${API_URL}/api/users/login`;

    const signInData = {
      user: {
        email: state.email,
        password: state.password,
      },
    };

    // TODO: api
    if (state.email === "admin" && state.password === "password") {
      localStorage.setItem("jwt_token", "jwt_token");
      localStorage.setItem("user_id", "1");
      return navigate("/courses");
    }

    axios
      .post(url, signInData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Залогинились!");
          localStorage.setItem("jwt_token", response.data.jwtToken);
          localStorage.setItem("user_id", response.data.id);
          navigate("/courses");
        }
      })
      .catch((error) => {
        setState({ error: error.response.data.errors });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 offset-4">
          <SignInForm
            error={this.state.error}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
