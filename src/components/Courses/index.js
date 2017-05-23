import React, {Component} from 'react'
import { API_URL, axios } from '../../config'
import { browserHistory } from 'react-router'

// import Sidebar from '../Sidebar'
import CourseItem from '../CourseItem'

class Courses extends Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: []
    }
  }

  componentDidMount () {
    axios.get(API_URL + '/api/courses').then((response) => {
      console.log(response)
      this.setState({courses: response.data})
    })
  }

  selectCourse (course) {
    browserHistory.push('/')
  }

  renderCourse (course) {
    return (
      <div key={course.id} className='col-xl-3'>
        <CourseItem id={course.id} name={course.title} desc={course.description} img={course.avatar} />
      </div>
    )
  }

  render () {
    if (localStorage.getItem('jwt_token')) {
      return (
        <div className='row'>
          {/* <div className='col-xl-3'> */}
          {/* <Sidebar /> */}
          {/* </div> */}
          {/* <div className='col-xl-12 '> */}
          {this.state.courses.map(this.renderCourse)}
          {/* </div> */}
        </div>
      )
    } else {
      return (
        <div>You are not Authenticated!</div>
      )
    }
  }
}

export default Courses
