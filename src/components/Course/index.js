import React, {Component} from 'react';

class Course extends Component {
  render() {
    return (
      <div className="course shadow push-bottom-30">
        <img className="course_img" src={this.props.img} alt="Изображение курса"/>
        <h5 className="course_name push-left-20 push-top-10">{this.props.name}</h5>
        <p className="course_desc push-left-20">{this.props.desc}</p>
      </div>
    )
  }
}

export default Course;
