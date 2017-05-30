import React, { Component } from 'react'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'

import { API_URL } from '../../config'
const signInUrl = `${API_URL}/api/users/login`
const signUpUrl = `${API_URL}/api/users`

// const axios = createAxios()

class Authentication extends Component {
  constructor (props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
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

    let userData

    if (!this.state.signUp) {
      userData = {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }
    } else {
      userData = {
        user: {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        }
      }
    }

    // console.log(url)
    // console.log(userData)

    let that = this

    if (!this.state.signUp) {
      axios.post(signInUrl, userData).then(function (response) {
        console.log(response)
        if (response.status === 200) {
          console.log('Everything is OK')
          // console.log(response.data.jwt_token)
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
    } else {
      axios.post(signUpUrl, userData).then(function (response) {
        console.log(response)
        if (response.status === 201) {
          console.log('Everything is OK')
          // console.log(response.data)
          // localStorage.setItem('isAuthenticated', true)
          // localStorage.setItem('jwt_token', response.data.jwt_token)
          // localStorage.setItem('user_id', response.data.id)
          // browserHistory.push('/')
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
        <label className="auth-form_label" htmlFor="firstName">Имя:</label>
        <input id="firstName" name="firstName" className="input mb-20" type="text" onChange={this.handleChange} placeholder="Иван" />

        <label className="auth-form_label" htmlFor="lastName">Фамилия:</label>
        <input id="lastName" name="lastName" className="input mb-20" type="text" onChange={this.handleChange} placeholder="Иванов" />
      </div>
    )
  }

  render () {
    const authButtonText = this.state.signUp ? 'Зарегистрироваться' : 'Войти'
    const changeAuthButtonText = this.state.signUp ? 'Вход' : 'Регистрация'

    const mb = this.state.signUp ? 'mt-20' : 'mt-40'

    return (
      <div className="container">
        <div className="row">
          <div className="col-4 offset-4">
            <form id="auth-form" onSubmit={this.handleSubmit} className={`auth-form shadow ${mb}`}>
              <header className="auth-form_head mb-24">Вход в систему</header>

              {this.state.signUp ? this.renderSignUpForm() : null}

              <label className="auth-form_label" htmlFor="email">Электронная почта:</label>
              <input id="email" name="email" className="input mb-20" type="text" onChange={this.handleChange} placeholder="example@mail.com" required />

              <label className="auth-form_label" htmlFor="password">Пароль:</label>
              <input id="password" name="password" className="input mb-20" type="password" onChange={this.handleChange} placeholder="******" required />

              <input className="button mr-20" id="auth-submit" type="submit" value={authButtonText} />

              <button className="button button--auth-change" id="auth-change" onClick={this.changeFormType}>{changeAuthButtonText}</button>

              <div className="alert">{this.state.error}</div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Authentication
