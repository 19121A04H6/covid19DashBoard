import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class About extends Component {
  state = {faqs: [], isLoading: true}

  componentDidMount() {
    this.getFaqs()
  }

  getFaqs = async () => {
    const url = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const {faq} = data
    this.setState({faqs: faq, isLoading: false})
  }

  getQuestions = () => {
    const {faqs} = this.state

    return (
      <ul testid="faqsUnorderedList">
        {faqs.map(eachFaq => (
          <li key={eachFaq.qno} className="question-and-answer">
            <p className="question">{eachFaq.question}</p>
            <p className="answer">{eachFaq.answer}</p>
          </li>
        ))}
      </ul>
    )
  }

  loadingView = () => (
    <div className="loader-container" testid="aboutRouteLoader">
      <Loader type="TailSpin" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="about-route">
        <Header />
        {isLoading ? (
          this.loadingView()
        ) : (
          <div className="about-container">
            <h1 className="about-text">About</h1>
            <p className="about-para">
              COVID-19 vaccines be ready for distribution
            </p>
            {this.getQuestions()}
          </div>
        )}
        <Footer />
      </div>
    )
  }
}

export default About
