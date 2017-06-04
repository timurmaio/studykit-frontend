import React, { Component } from 'react'
import { Link } from 'react-router'
import { API_URL, createAxios } from '../../config'
import lection from './lection.svg'
import test from './test.svg'
import video from './video.svg'

const axios = createAxios()

const sortContent = (arr) => {
  let sortedArr = arr.map((item) => {
    item.content.sort((a, b) => {
      if (a.serial_number > b.serial_number) return 1;
      if (a.serial_number < b.serial_number) return -1;
      return 0;
    })
    return item
  })

  return sortedArr
}

class Course extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      title: '',
      description: '',
      content: [],
      course: {},
      owner: {},
      alert: '',
      createdAt: ''
    }
  }

  componentDidMount () {
    axios.get(API_URL + '/api/courses/' + this.props.params.id).then((response) => {
      console.log(response.data)
      const content = sortContent(response.data.lectures)
      this.setState({ title: response.data.title, description: response.data.description, id: response.data.id, content: content, course: response.data, owner: response.data.owner, createdAt: response.data.createdAt })
    })
  }

  renderItem = (item) => {
    return (
      <div key={item.id} className="col-md-4 mt-3">
        <div className="card">
          <div className="card-block">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-text">{item.serial_number}</p>
            <Link to={{ pathname: `/courses/${this.state.courseId}/contents/${item.id}` }} className="btn btn-success">Просмотреть</Link>
          </div>
        </div>
      </div>
    )
  }

  joinCourse = () => {
    axios.post(`${API_URL}/api/courses/${this.state.id}/join`).then((response) => {
      this.setState({ alert: response.data.data })
      console.log(response.data)
    })
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="panel h-600">
              <img src={this.state.course.avatar} className="course-img" alt="Изображние курса" width="350px" height="200px"/>
              <button className="button ml-32 mt-24" onClick={this.joinCourse}>Подписаться</button>
              <p>{this.state.alert}</p>
              <p className="mt-16 mb-0 mx-32 fs-20">{this.state.description}</p>
              <p className="mt-16 mb-0 ml-32">Автор: {this.state.owner.firstName} {this.state.owner.lastName}</p>
              <p className="mt-8 mb-0 ml-32">Дата создания: {this.state.createdAt}</p>
              <p className="mt-8 mb-0 ml-32">Теги: #programming #database</p>
            </div>
          </div>
          <div className="col-8">
            <div className="panel h-600">
              <header className="ml-32 mt-24 fs-24 mb-20">{this.state.title}</header>
              {this.state.content.map((lecture) => {
                return (
                  <div>
                    <p className="fs-20 mx-32 mb-0">{lecture.title}</p>
                    <hr className="hr mx-32  my-4"/>
                    {lecture.content.map((content) => {
                      return (
                        <div className="mx-32">
                          <span className="circle mr-16"></span>
                          <img src={test} className="mr-16" alt="Иконка контента"/>
                          <Link to={`/courses/${this.props.params.id}/lectures/${lecture.id}/contents/${content.id}`} className="link">{content.title}</Link>
                          <hr className="hr my-4"/>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Course
