import React, {Component} from 'react';

import API_URL from '../../helpers/config';
import h from '../../helpers/course_h';

import Sidebar from '../Sidebar';
import Course from '../Course';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }
  componentDidMount() {
    let that = this;
    h.getCourses().then(function(data) {
      that.setState({courses: data});
    });
  }
  renderCourse(course) {
    return (
      <div key={course.id} className="col-xl-4">
        <Course name={course.title} desc={course.description} img={API_URL + "/" + course.avatar.url}/>
      </div>
    )
  }
  render() {
    return (
      <div className="row">
        <div className="col-xl-3">
          <Sidebar/>
        </div>
        <div className="col-xl-9 ">
          <div className="row">
            {this.state.courses.map(this.renderCourse)}
          </div>
        </div>
      </div>
    )
  }
}

export default Courses;
