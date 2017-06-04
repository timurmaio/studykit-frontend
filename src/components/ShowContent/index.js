import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'
import { API_URL, createAxios } from '../../config'
import arrow from './arrow-back.svg'

class ShowContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: '',
      contentId: '',
      title: '',
      description: '',
      solution: '',
      succeed: '',
      checkingInformation: '',
      error: ''
    }
  }

  componentDidMount () {
    const axios = createAxios()
    const userId = localStorage.getItem('user_id')

    axios.get(`${API_URL}/api/lectures/${this.props.params.lectureId}/content/${this.props.params.contentId}`).then((response) => {
      console.log(response.data)
      this.setState({ contentId: response.data.sqlProblemId, title: response.data.title, description: response.data.body })
    })

    axios.get(API_URL + '/api/courses/' + this.props.params.id).then((response) => {
      console.log(response.data)
      this.setState({ courseTitle: response.data.title, id: response.data.id, content: response.data.lectures, course: response.data, owner: response.data.owner, createdAt: response.data.createdAt })
    })
  }

  handleTextareaChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    this.setState({
      [name]: value
    })
  }

  checkTheSolution = (event) => {
    event.preventDefault()

    const axios = createAxios()

    this.setState({ alert: '' })

    const url = `${API_URL}/api/sql_solutions`
    
    let data = {
      sql_solution: {
        sql_problem_id: this.state.contentId,
        code: this.state.solution
      }
    }

    axios.post(url, data).then((response) => {
      if (response.status === 201) {
        const solutionId = response.data.id
        this.setState( {checkingInformation: "Идёт проверка..." })

        const waitingForSoluition = setInterval(() => {
          axios.get(`${API_URL}/api/sql_solutions/${solutionId}`).then((response) => {
            if (response.data.succeed === true) {
              this.setState({ checkingInformation: "Красава!", succeed: true })
              clearInterval(waitingForSoluition)
            } else if (response.data.succeed === false) {
                this.setState({ checkingInformation: "Ну брат, ну ты чё?", succeed: false })
                clearInterval(waitingForSoluition)
              }
            })
          }, 1000
        )
      }
    }).catch((error) => {
      const errorText = error.response.data.errors[0]
      this.setState({ alert: errorText })
      console.log(errorText)
    })
  }

  render () {
    const alert = this.state.alert ? 
    <div className="alert alert-danger">{this.state.alert}</div>
    :
    null

    let alertType

    switch (this.state.succeed) {
      case true:
        alertType = 'alert-success'

      case false:
        alertType = 'alert-danger'
    
      default:
        alertType = 'alert-info'
    }

    const checkingInformation = this.state.checkingInformation ?
    <div className={`alert ${alertType}`}>{this.state.checkingInformation}</div>
    :
    null

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="panel h-600">
              <div className="mx-16 mt-24">
                <Link to={`/courses/${this.props.params.id}`} className="link link--black flex"><img src={arrow} alt="" className="mr-12"/>Вернуться к курсу</Link>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="panel h-600">
              <header className="ml-32 mt-24 fs-24 mb-20">{this.state.title}</header>
              <ReactMarkdown className="mx-32" source={this.state.description} />
              <div className="form-group mx-32">
                <form action="">
                  <label htmlFor="exampleTextarea">Введите сюда своё решение</label>
                  <textarea className="form-control mb-16" name="solution" id="exampleTextarea" rows="6" onChange={this.handleTextareaChange}></textarea>
                  <button className="button mb-16" onClick={this.checkTheSolution}>Отправить решение</button>
                  {alert}
                  {checkingInformation}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowContent
