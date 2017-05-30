import React, { Component } from 'react'
import { Link } from 'react-router'
import { API_URL, axios } from '../../config'

class Course extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      courseId: '',
      content: [],
      course: {},
      owner: {}
    }
  }

  componentDidMount () {
    axios.get(API_URL + '/api/courses/' + this.props.params.id).then((response) => {
      this.setState({ title: response.data.title, description: response.data.description, courseId: response.data.id, content: response.data.content, course: response.data, owner: response.data.owner })
      console.log(response.data)
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

  render () {
    const style = {
      marginTop: '-20px'
    }
    const button = this.props.route.path === "/profile/courses/:id" ?
      <Link to={{ pathname: `/courses/${this.state.courseId}/contents/new` }} className="btn btn-primary mt-3">Добавить лекцию</Link>
      :
      undefined

    return (
      <div style={style}>

        <div className="row">
          <div className="col-md-3">
            <h1>{this.state.title}</h1>
            <img src={this.state.course.avatar} alt="Изображние курса" width="150px" />
            <p>{this.state.description}</p>
            <b>Владелец:</b>
            <p>{this.state.owner.first_name} {this.state.owner.last_name}</p>
            {button}
          </div>
          <div className="col-md-9">
            <div className="row">
              {this.state.content.map(this.renderItem)}
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Course
