import React, { Component } from 'react'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'

import { API_URL } from '../../config'
const signInUrl = `${API_URL}/api/users/login`
const signUpUrl = `${API_URL}/api/users/register`

// const axios = createAxios()

class Authentication extends Component {
  constructor (props) {
    super(props)

    this.state = {
      password: '',
      email: '',
      signUp: false,
      error: ''
    }
  }

  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let userData = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    }
    // console.log(url)
    // console.log(userData)
    let that = this
    axios.post(signInUrl, userData).then(function (response) {
      console.log(response)
      if (response.status === 200) {
        console.log('Everything is OK')
        console.log(response.data.jwt_token)
        // localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('jwt_token', response.data.jwt_token)
        // localStorage.setItem('user_id', response.data.id)
        browserHistory.push('/')
      }
    }).catch(function (error) {
      if (error.response.status === 404) {
        that.setState({ error: '404 Ошибка подключения' })
      } else {
        that.setState({ error: 'Пользователь не найден' })
      }
      // that.state.error = error
      // that.refs.alert.value = error;
      // console.log(error)
    })
  }

  changeFormType = (event) => {
    event.preventDefault()
    this.setState({
      signUp: !this.state.signUp
    })
  }

  renderSignUpForm = () => {
    return (
      <div>
        <label htmlFor="firstName">Имя:</label>
        <input id="firstName" name="firstName" className="input" type="text" onChange={this.handleChange} placeholder="Имя" />
      </div>
    )
  }

  render () {
    const authButtonText = this.state.signUp ? 'Зарегистрироваться' : 'Войти'
    const changeAuthButtonText = this.state.signUp ? 'Вход' : 'Регистрация'

    return (
      <div className="authentication">
        <h1>Вход в систему</h1>
        <form onSubmit={this.handleSubmit} className="form shadow">

          <div>
            <label htmlFor="email">Электронная почта:</label>
            <input id="email" name="email" className="input" type="text" onChange={this.handleChange} placeholder="Электронная почта" />
          </div>

          {this.state.signUp ? this.renderSignUpForm() : null}

          <div>
            <label htmlFor="password">Пароль:</label>
            <input id="password" name="password" className="input" type="password" onChange={this.handleChange} placeholder="Пароль" />
          </div>

          <input type="submit" value={authButtonText} />

          <div>
            <button onClick={this.changeFormType}>{changeAuthButtonText}</button>
          </div>

          <div>
            <Link to="/">Перейти к курсам</Link>
          </div>

          <div className="alert">{this.state.error}</div>
        </form>
      </div>
    )
  }
}

export default Authentication
