import React, { Component } from "react";
import { browserHistory } from "react-router";
import axios from "axios";
import SignInForm from "../../components/SignInForm";
import { API_URL } from "../../config";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const url = `${API_URL}/api/users/login`;

    const signInData = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    };

    axios
      .post(url, signInData)
      .then(response => {
        if (response.status === 200) {
          console.log("Залогинились!");
          localStorage.setItem("jwt_token", response.data.jwtToken);
          localStorage.setItem("user_id", response.data.id);
          browserHistory.push("/courses");
        }
      })
      .catch(error => {
        this.setState({ error: error.response.data.errors });
      });
  };

  render() {
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
}

export default SignIn;
