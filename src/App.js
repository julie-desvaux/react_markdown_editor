import React, { Component } from 'react'
import './App.css'

import marked from 'marked'

import { sampleText } from './sampleText'
import Button from './components/Button'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: sampleText
    }
    this.onClick = this.onClick.bind(this)
  }
  

  componentDidMount () {
    const text = localStorage.getItem('text')
    if (text) {
      this.setState({ text })
    } else {
      this.setState({ text: sampleText })
    }
  }

  componentDidUpdate () {
    const { text } = this.state
    localStorage.setItem('text', text)
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = text => {
    const __html = marked(text, { sanitize: true })
    return { __html }
  }

  onClick = () => {
    this.setState({ text: sampleText })
  }

  render () {
    return (
      <div className='container'>
        <h1 className='text-center mb-5 title'>Markedown Editor</h1>
        <div className='row'>
          <div className='col-12'>
            <Button onClick={this.onClick}>
              Refresh
            </Button>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <textarea
              onChange={this.handleChange}
              value={this.state.text}
              className='form-control'
              rows='35' />
          </div>
          <div className='col-sm-6'>
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
