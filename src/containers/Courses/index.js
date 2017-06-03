import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { API_URL, createAxios } from '../../config'
import CourseCard from '../../components/CourseCard'

const axios = createAxios()

class Courses extends Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: []
    }
  }

  componentDidMount () {
    axios.get(`${API_URL}/api/courses`).then((response) => {
      this.setState({ courses: response.data })
    })
  }

  renderCourseCard (courseItem) {
    return (
      <div key={courseItem.id} className="col-3">
        <CourseCard {...courseItem} />
      </div>
    )
  }

  render () {
    if (localStorage.getItem('jwt_token')) {
      return (
        <div className="container mt-20">
          <div className="row">
            {this.state.courses.map(this.renderCourseCard)}
          </div>
        </div>
      )
    } else {
      return (
        <div className="container">
          <h1 className="text-center mt-40">Вы не авторизованы!</h1>
        </div>
      )
    }
  }
}

export default Courses
