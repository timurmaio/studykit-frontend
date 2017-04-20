import React, { Component } from 'react'
import axios from 'axios'
import { Link, browserHistory } from 'react-router'

import { API_URL } from '../../config'

const url = `${API_URL}/api/users/login`

class Authentication extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      error: ''
    }
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let userData = {
      user: {
        email: this.refs.email.value,
        password: this.refs.password.value
      }
    }
    console.log(url)
    console.log(userData)
    let that = this
    axios.post(url, userData).then(function (response) {
      console.log(response)
      if (response.status === 200) {
        console.log('Everything is OK')
        console.log(response.data.jwt_token)
        // localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('jwt_token', response.data.jwt_token)
        localStorage.setItem('user_id', response.data.id)
        browserHistory.push('/')
      }
    }).catch(function (error) {
      that.setState({ error: 'Пользователя не существует' })
      // that.refs.alert.value = error;
      console.log(error)
    })
  }

  render () {
    const divStyle = {
      marginTop: '50%',
      color: 'white'
    }
    return (
      <div className='block'>
        <div className='container'>
          <div className='row'>
            <div className='offset-xl-4 col-xl-4'>
              <div style={divStyle}>
                <h1>Authentication</h1>
              </div>
              <form onSubmit={this.handleSubmit} className='form shadow'>
                <div>
                  <label>
                    Email:
                    <input className='input' type='text' ref='email' onChange={this.handleChange} placeholder='Электронная почта' />
                  </label>
                </div>
                <div>
                  <label>
                    Пароль:
                    <input className='input' type='password' ref='password' placeholder='Пароль' />
                  </label>
                </div>
                <input className='' type='submit' value='Войти' />
                <Link to='/'>Главная</Link>
                <div className='alert' ref='alert'>{this.state.error}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Authentication
