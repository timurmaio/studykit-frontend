import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import panel from './panel-donut.svg'

class Header extends Component {
  handleLogout = () => {
    localStorage.removeItem('jwt_token')
    browserHistory.push('/login')
  }
  render () {
    const signInOut = (localStorage.jwt_token) ? <button type="button" onClick={this.handleLogout} className="push-left-10 btn btn-default btn-danger">Выйти</button>
      :
      <Link to="/login" className="profile__link push-left-10 btn btn-default btn-danger">Войти</Link>
    return (
      <header className="shadow">
        <div className="container">
          <div className="flex flex--vcenter height-60">
            <h1 className="logo">Studykit</h1>

            <Link to="/me" activeClassName="link--active" className="link push-left-50">Обучение</Link>
            <Link to="/" activeClassName="link--active" className="link">Все курсы</Link>

            <div className="profile push-left">
              <Link to="/profile" activeClassName="profile__link--active" className="profile__link">
                <img src={panel} width="20px" className="mr-2" alt="" />
                Панель
              </Link>
              {signInOut}
            </div>

          </div>
        </div>
      </header>
    )
  }
}

export default Header
