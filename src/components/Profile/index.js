import React, { Component } from 'react'
import { Link } from 'react-router'
import { API_URL, axios } from '../../config'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userId: localStorage.getItem('user_id'),
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      avatar: '',
      courses: []
    }
  }

  componentDidMount () {
    const url = API_URL + '/api/users/' + this.state.userId + '/courses'
    const urlUser = API_URL + '/api/users/' + this.state.userId

    axios.get(urlUser).then((response) => {
      console.log(response)
      const user = response.data
      this.setState({
        userId: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      })
      axios.get(url).then((response) => {
        console.log(response.data)
        this.setState({ courses: response.data })
      })
    })
  }

  onButtonClick = () => {
    let val = this.refs.name.value
    this.setState({ name: val })
    console.log(val)
  }

  handleClick = () => {
  }

  renderItem = (item) => {
    return <Link to={{ pathname: `courses/${item.id}` }} key={item.id} className="list-group-item list-group-item-action flex-column align-items-start">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{item.title}</h5>
        <small>3 days ago</small>
      </div>
      <p className="mb-1">{item.description}</p>
      <small>{item.owner.first_name} {item.owner.last_name}</small>
    </Link>
  }

  render () {
    const style = {
      marginTop: '-20px'
    }
    return (
      <div style={style}>

        <div className="row">
          <div className="col-2">
            <img src={this.state.avatar} className="img-thumbnail img-fluid" alt="Аватар" />
            <h6 className="mt-2">{this.state.firstName} {this.state.lastName}</h6>
            <span>{this.state.email}</span><br />
            <span>{this.state.role}</span>
          </div>

          <div className="col-10">
            <h3>Мои курсы</h3>
            <div className="list-group">
              {this.state.courses.map(this.renderItem)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
