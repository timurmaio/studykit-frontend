import React, { Component } from 'react'
import { API_URL, axios } from '../../config'
import ReactMarkdown from 'react-markdown'

class ShowContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      courseId: '',
      content: []
    }
  }

  componentDidMount () {
    axios.get(API_URL + '/api/courses/' + this.props.params.id + '/content/' + this.props.params.contentId).then((response) => {
      console.log(response.data)
      this.setState({ courseId: response.data.course_id, content: response.data })
    })
  }

  render () {
    return <ReactMarkdown source={this.state.content.body} />
  }
}

export default ShowContent
