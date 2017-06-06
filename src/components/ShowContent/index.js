import React, { Component } from 'react'
import { Link } from 'react-router'
import ReactMarkdown from 'react-markdown'
import { API_URL, createAxios } from '../../config'
import arrow from './arrow-back.svg'
import lection from './lection.svg'
import test from './test.svg'

class ShowContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      contentId: '',
      title: '',
      content: [],
      description: '',
      solution: '',
      succeed: '',
      solvedIds: [],
      type: '',
      checkingInformation: '',
      error: ''
    }
  }

  componentDidMount() {
    const axios = createAxios()
    const userId = localStorage.getItem('user_id')

    axios
      .get(
        `${API_URL}/api/lectures/${this.props.params.lectureId}/content/${this
          .props.params.contentId}`
      )
      .then(response => {
        console.log(response.data)
        this.setState({
          contentId: response.data.sqlProblemId,
          title: response.data.title,
          description: response.data.body,
          type: response.data.type
        })
      })

    axios
      .get(API_URL + '/api/courses/' + this.props.params.id)
      .then(response => {
        console.log(response.data)
        this.setState({
          id: response.data.id,
          courseTitle: response.data.title,
          courseDescription: response.data.description,
          content: response.data.lectures,
          course: response.data,
          owner: response.data.owner,
          solvedIds: response.data.solvedIds,
          createdAt: response.data.createdAt
        })
      })

    axios
      .get(`${API_URL}/api/courses/${this.props.params.id}/participating `)
      .then(response => {
        this.setState({ participating: response.data.participating })
        console.log(response.data)
      })

    axios
      .get(
        `${API_URL}/api/courses/${this.props.params
          .id}/participants/${userId}/statistics`
      )
      .then(response => {
        const courseStatistics = Math.round(
          response.data.data.solved_problems / response.data.data.problems * 100
        )
        // console.log(courseStatistics)

        this.setState({ statistics: courseStatistics })
        console.log(response.data)
      })
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState);
  //   console.log(this.props, this.state);

  //   return true;
  // }

  componentWillReceiveProps(nextProps) {
    // this.forceUpdate()

    const axios = createAxios()
    const userId = localStorage.getItem('user_id')

    this.setState({
      solution: '',
      checkingInformation: '',
      alert: ''
    })

    axios
      .get(
        `${API_URL}/api/lectures/${nextProps.params
          .lectureId}/content/${nextProps.params.contentId}`
      )
      .then(response => {
        console.log(response.data)
        this.setState({
          contentId: response.data.sqlProblemId,
          title: response.data.title,
          description: response.data.body,
          type: response.data.type
        })
      })

    axios
      .get(API_URL + '/api/courses/' + nextProps.params.id)
      .then(response => {
        console.log(response.data)
        this.setState({
          id: response.data.id,
          courseTitle: response.data.title,
          courseDescription: response.data.description,
          content: response.data.lectures,
          course: response.data,
          owner: response.data.owner,
          solvedIds: response.data.solvedIds,
          createdAt: response.data.createdAt
        })
      })

    axios
      .get(`${API_URL}/api/courses/${this.props.params.id}/participating `)
      .then(response => {
        this.setState({ participating: response.data.participating })
        console.log(response.data)
      })

    axios
      .get(
        `${API_URL}/api/courses/${this.props.params
          .id}/participants/${userId}/statistics`
      )
      .then(response => {
        const courseStatistics = Math.round(
          response.data.data.solved_problems / response.data.data.problems * 100
        )
        // console.log(courseStatistics)

        this.setState({ statistics: courseStatistics })
        console.log(response.data)
      })
  }

  handleTextareaChange = event => {
    const name = event.target.name
    const value = event.target.value

    this.setState({
      [name]: value
    })
  }

  checkTheSolution = event => {
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

    axios
      .post(url, data)
      .then(response => {
        if (response.status === 201) {
          const solutionId = response.data.id
          this.setState({
            checkingInformation: 'Идёт проверка...',
            succeed: null
          })

          const waitingForSoluition = setInterval(() => {
            axios
              .get(`${API_URL}/api/sql_solutions/${solutionId}`)
              .then(response => {
                if (response.data.succeed === true) {
                  this.setState({
                    checkingInformation: 'Решение верно!',
                    succeed: true
                  })
                  clearInterval(waitingForSoluition)
                } else if (response.data.succeed === false) {
                  this.setState({
                    checkingInformation: 'Решение неверно, попробуйте ещё раз!',
                    succeed: false
                  })
                  clearInterval(waitingForSoluition)
                }
              })
          }, 1000)
        }
      })
      .catch(error => {
        const errorText = error.response.data.errors[0]
        this.setState({ alert: errorText })
        console.log(errorText)
      })
  }

  render() {
    const alert = this.state.alert
      ? <div className="alert alert-danger">{this.state.alert}</div>
      : null

    let alertType

    switch (this.state.succeed) {
      case true:
        alertType = 'alert-success'
        break

      case false:
        alertType = 'alert-danger'
        break

      default:
        alertType = 'alert-info'
    }

    const checkingInformation = this.state.checkingInformation
      ? <div className={`alert ${alertType}`}>
          {this.state.checkingInformation}
        </div>
      : null

    const passStatistics = this.state.statistics
      ? this.state.participating
        ? <p>Курс пройден на {this.state.statistics}%</p>
        : null
      : null

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="panel h-600">
              <div className="mx-16 mt-24">
                <Link
                  to={`/courses/${this.props.params.id}`}
                  className="link flex mb-16">
                  <img src={arrow} alt="" className="mr-12" />Вернуться к курсу
                </Link>
                <header className="fs-24 mb-20">
                  {this.state.courseTitle}
                </header>

                {passStatistics}

                {this.state.content.map(lecture => {
                  return (
                    <div className="mb-16" key={lecture.id}>
                      <p className="fs-20 mb-0">{lecture.title}</p>
                      <hr className="hr my-4" />

                      {lecture.content.map(content => {
                        const contentIcon = content.type === 'MarkdownContent'
                          ? lection
                          : test
                        return (
                          <Link
                            to={`/courses/${this.props.params
                              .id}/lectures/${lecture.id}/contents/${content.id}`}
                            className="link"
                            key={content.id}>
                            <div className="list-item flex align-items-center">
                              {this.state.solvedIds.indexOf(content.id) >= 0 &&
                                this.state.participating &&
                                <span className="circle circle--green ml-8 mr-16" />}
                              {this.state.solvedIds.indexOf(content.id) ===
                                -1 &&
                                this.state.participating &&
                                <span className="circle ml-8 mr-16" />}
                              <img
                                src={contentIcon}
                                className="mr-16"
                                alt="Иконка контента"
                              />
                              <div style={{ display: 'block' }}>
                                {content.title}
                              </div>
                              {this.state.solvedIds.indexOf(content.id) >= 0 &&
                                this.state.participating &&
                                <div
                                  className="ml-16 fs-12"
                                  style={{ fontWeight: '200', color: 'gray' }}>
                                  Пройдено
                                </div>}
                            </div>
                            <hr className="hr my-4" />
                          </Link>
                        )
                      })}

                    </div>
                  )
                })}

              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="panel h-600">
              <header className="ml-32 mt-24 fs-24 mb-20">
                {this.state.title}
              </header>
              <ReactMarkdown
                className="mx-32"
                source={this.state.description}
              />
              <div className="form-group mx-32">
                {this.state.type !== 'MarkdownContent' &&
                  <form>
                    <label htmlFor="exampleTextarea">
                      Введите сюда своё решение
                    </label>
                    <textarea
                      className="form-control mb-16"
                      name="solution"
                      id="exampleTextarea"
                      rows="6"
                      onChange={this.handleTextareaChange}
                    />
                    <button
                      className="button mb-16"
                      onClick={this.checkTheSolution}>
                      Отправить решение
                    </button>
                    {alert}
                    {checkingInformation}
                  </form>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShowContent
