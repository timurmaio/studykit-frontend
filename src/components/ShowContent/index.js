import React, { Component } from 'react'
import { API_URL, createAxios } from '../../config'
import ReactMarkdown from 'react-markdown'

const axios = createAxios()

class ShowContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: ''
    }
  }

  componentDidMount () {
    axios.get(`${API_URL}/api/lectures/${this.props.params.lectureId}/content/${this.props.params.contentId}`).then((response) => {
      console.log(response.data)
      this.setState({ title: response.data.title, description: response.data.body })
    })
  }

  render () {
    const input = this.state.description

    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="panel h-600">

            </div>
          </div>
          <div className="col-9">
            <div className="panel h-600">
              <header className="ml-32 mt-24 fs-24 mb-20">{this.state.title}</header>
              <ReactMarkdown className="mx-32" source={input} />
              <div className="form-group mx-32">
                <label htmlFor="exampleTextarea">Введите сюда своё решение</label>
                <textarea className="form-control" id="exampleTextarea" rows="6"></textarea>
              </div>
              {/*<textarea className="input mx-32" name="" id=""></textarea>*/}
            </div>
          </div>
        </div>
      </div>
    )
    // return <ReactMarkdown source={this.state.content.body} />
  }
}

export default ShowContent
