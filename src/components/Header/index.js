import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

import person from './person.svg'

class Header extends Component {
  handleSignOut = () => {
    localStorage.removeItem('jwt_token')
    browserHistory.push('/login')
  }
  render () {
    const signInOut = (localStorage.jwt_token) ? <button type="button" onClick={this.handleSignOut} className="push-left-10 btn btn-default btn-danger">Выйти</button>
      :
      <Link to="/signin" className="profile__link push-left-10 btn btn-default btn-danger">Войти</Link>

    const signed = localStorage.getItem('jwt_token')
    
    return (
      <header className="shadow bg-white">
        <div className="container">
          <div className="flex flex--vcenter height-60">

            <nav style={{ width: '260px' }} className="push-right">
              <Link to="/learning" activeClassName="link link--active" className="link">Обучение</Link>
              <Link to="/courses" activeClassName="link link--active" className="link ml-4">Все курсы</Link>
            </nav>

            <h1 className="logo mx-auto">StudyKit</h1>

            <div style={{ width: '260px' }} className="push-left">
              <Link to="/profile" className="link link--profile">
                <img src={person} width="12px" className="mr-2" alt="" />
                <span className="ml-4">Профиль</span>
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
