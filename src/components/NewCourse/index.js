import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { API_URL, createAxios } from '../../config'

const axios = createAxios()

class NewCourse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      type: 'MarkdownContent',
      serial: '',
      title: '',
      body: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const courseId = this.props.params.id

    const url = API_URL + '/api/courses/' + courseId + '/content'

    const data = {
      course_content: {
        title: this.state.title,
        body: this.state.body,
        serial_number: this.state.serial,
        type: this.state.type
      }
    }

    axios.post(url, data).then((response) => {
      if (response.status === 201) {
        console.log('Контент успешно создан')
        browserHistory.push(`/courses/${courseId}`)
      }
    })
  }

  handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value
    this.setState({ [name]: value })
  }

  render () {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Название</label>
          <input type="text" name="title" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Название лекции" onChange={this.handleInputChange} />
          <small id="emailHelp" className="form-text text-muted">Мелкий шрифт</small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Порядковый номер</label>
          <input type="text" name="serial" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Название лекции" onChange={this.handleInputChange} />
          <small id="emailHelp" className="form-text text-muted">Мелкий шрифт</small>
        </div>


        <div className="form-group">
          <label htmlFor="exampleTextarea">Тело</label>
          <textarea className="form-control" name="body" id="exampleTextarea" rows="3" onChange={this.handleInputChange}></textarea>
        </div>

        <button type="submit" className="btn btn-success" onClick={this.handleSubmit}>Создать</button>
      </form>
    )
  }
}

export default NewCourse