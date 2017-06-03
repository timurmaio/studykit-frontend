import React, { Component } from 'react'
import Header from '../../components/Header'
import { API_URL, createAxios } from '../../config'

const userId = localStorage.getItem('user_id')
const axios = createAxios()

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        id: '',
        email: '',
        avatar: '',
        firstName: '',
        lastName: '',
        role: ''
      }
    }
  }

  componentDidMount () {
    axios.get(`${API_URL}/api/users/${userId}`).then((response) => {
      if (response.status === 200) {
        this.setState({ user: response.data })
      } else {
        localStorage.removeItem('jwt_token')
        localStorage.removeItem('user_id')
      }
      // console.log(response)
    }).catch((error) => {
      console.log(error.response.data.errors)
    })
  }

  render () {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default App