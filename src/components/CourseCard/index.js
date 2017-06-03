import React from 'react'
import { Link } from 'react-router'

const CourseCard = (props) => {
  return (
    <Link to={{ pathname: `courses/${props.id}` }}>
      <div className="course shadow push-bottom-30">
        <img className="course_img" src={props.avatar} alt="Изображение курса" />
        <h5 className="course_name push-left-20 push-top-10">{props.title}</h5>
        <p className="course_desc push-left-20">{props.description}</p>
      </div>
    </Link>
  )
}

export default CourseCard
