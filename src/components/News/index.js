import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { API_URL, axios } from '../../config'

class News extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    axios.get(API_URL + '/api/articles').then((response) => {
      this.setState({ data: response.data })
      console.log(response)
    })
  }

  renderItem = (item) => {
    return (
      <div key={item.id} className="shadow p-2 mb-3" style={{position: "relative"}}>
        <h2>{item.title}</h2>
        <p>{item.body}</p>
        <img style={{position: "absolute", right: "100px", top: "10px"}} src={item.avatar} width="70px" alt="Изображение новости" />
      </div>
    )
  }

  render () {
    return (
      <div>
        <h1>News</h1>
        {this.state.data.map(this.renderItem)}
      </div>
    )
  }
}

export default News