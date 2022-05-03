import React, { Component } from "react";
import { browserHistory } from "react-router";
import axios from "axios";
import SignUpForm from "../../components/SignUpForm";
import { API_URL } from "../../config";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: "",
    };
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const url = `${API_URL}/api/users`;

    const signUpData = {
      user: {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
      },
    };

    axios
      .post(url, signUpData)
      .then((response) => {
        if (response.status === 201) {
          console.log("Зарегинились!");
          localStorage.setItem("jwt_token", response.data.jwtToken);
          localStorage.setItem("user_id", response.data.id);
          browserHistory.push("/courses");
        }
      })
      .catch((error) => {
        this.setState({ error: error.response.data.errors });
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4 offset-4">
            <SignUpForm
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

export default SignUp;
