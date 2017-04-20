import React, {Component} from 'react'
import { Link } from 'react-router'

class CourseItem extends Component {
  render () {
    return (
      <div className='course shadow push-bottom-30'>
        <img className='course_img' src={this.props.img} alt='Изображение курса' />
        <h5 className='course_name push-left-20 push-top-10'>{this.props.name}</h5>
        <p className='course_desc push-left-20'>{this.props.desc}</p>
        <Link to={{ pathname: `courses/${this.props.id}` }} className='push-left-20'>Подробнее</Link>
      </div>
    )
  }
}

export default CourseItem
