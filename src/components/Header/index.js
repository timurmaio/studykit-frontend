import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import person from './person.svg'

class Header extends Component {
  handleSignOut = () => {
    localStorage.removeItem('jwt_token')
    localStorage.removeItem('user_id')
    browserHistory.push('/signin')
  }

  handleSignIn = () => {
    browserHistory.push('/signin')
  }

  render () {
    const signed = localStorage.getItem('jwt_token')

    const signButton = signed ?
      <button type="button" onClick={this.handleSignOut} className="button">Выйти</button>
      :
      <button type="button" onClick={this.handleSignIn} className="button">Войти</button>

    const linkToProfile = signed ?
      <Link to="/profile" className="link link--profile flex align-items-center">
        <img src={person} width="12px" className="mr-4" alt="" />
        <span className="mr-4">Профиль</span>
      </Link>
      :
      null

    const linkToLearning = signed ?
      <Link to="/learning" activeClassName="nav-link nav-link--active" className="nav-link mr-4">Обучение</Link>
      :
      null

    const userName = localStorage.getItem('jwt_token') ?
      <span style={{ lineHeight: '32px', marginRight: '16px' }}>{this.props.firstName} {this.props.lastName}</span>
      :
      null

    return (
      <header className="top-panel mb-20">
        <div className="container">
          <div className="top-panel_content">

            <nav className="top-panel_nav">
              {linkToLearning}
              <Link to="/courses" activeClassName="nav-link nav-link--active" className="nav-link">Все курсы</Link>
            </nav>

            <span className="top-panel_logo">StudyKit</span>

            <div className="top-panel_profile">
              {/*{linkToProfile}*/}
              {userName}
              {signButton}
            </div>
          </div>
        </div>
      </header>
    )
  }
}

export default Header
