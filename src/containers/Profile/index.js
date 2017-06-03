import React, { Component } from 'react'

class Profile extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <img src="" alt=""/>
            <button>Изменить фото</button>
            <button>Выйти</button>
          </div>
          <div className="col-9">
            <header>Личные данные</header>
            <button>Изменить</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
