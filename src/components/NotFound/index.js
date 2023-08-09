import {withRouter} from 'react-router-dom'

import './index.css'

const NotFound = props => {
  const goToHomePage = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dldkabpos/image/upload/v1691582935/Group_7484_e99whf.png"
        alt="not-found"
      />
      <p className="page-not-found">PAGE NOT FOUND</p>
      <p className="para">
        we’re sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <button onClick={goToHomePage} className="home-button" type="button">
        Home
      </button>
    </div>
  )
}

export default withRouter(NotFound)
