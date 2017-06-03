import React, { Component } from 'react'
import { API_URL, createAxios } from '../../config'
import CourseCard from '../../components/CourseCard'

const axios = createAxios()
const userId = localStorage.getItem('user_id')

class Learning extends Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: []
    }
  }

  componentDidMount () {
    axios.get(`${API_URL}/api/courses?participated_by=${userId}`).then((response) => {
      this.setState({ courses: response.data })
    })
  }

  renderCourseCard = (course) => {
    return (
      <div className="col-3" key={course.id}>
        <CourseCard {...course}/>
      </div>
    )
  }

  render () {
    return (
      <div className="container mt-20">
        <div className="row">
          {this.state.courses.map(this.renderCourseCard)}
        </div>
      </div>
    )
  }
}

export default Learning
