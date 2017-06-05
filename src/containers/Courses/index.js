import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { API_URL, createAxios } from '../../config'
import CourseCard from '../../components/CourseCard'

class Courses extends Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: []
    }
  }

  componentDidMount () {
    const axios = createAxios()

    axios.get(`${API_URL}/api/courses`).then((response) => {
      this.setState({ courses: response.data })
    })
  }

  renderCourseCard (courseItem) {
    return (
      <div key={courseItem.id} className="col-3 mb-24">
        <CourseCard {...courseItem} />
      </div>
    )
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          {this.state.courses.map(this.renderCourseCard)}
        </div>
      </div>
    )
  }
}

export default Courses
