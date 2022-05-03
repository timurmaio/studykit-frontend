import React, { Component } from "react";
import { browserHistory } from "react-router";
import { API_URL, createAxios } from "../../config";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  handleSignOut = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user_id");
    browserHistory.push("/signin");
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="panel h-600">
              <img src="" alt="" />
              <button>Изменить фото</button>
              <button onClick={this.handleSignOut}>Выйти</button>
            </div>
          </div>
          <div className="col-9">
            <div className="panel h-600">
              <header>Личные данные</header>
              <button>Изменить</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
