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
        alt="not-found-pic"
      />
      <h1 className="page-not-found">PAGE NOT FOUND</h1>
      <p className="para">
        we are sorry, the page you requested could not be found
      </p>
      <p>Please go back to the homepage</p>
      <button onClick={goToHomePage} className="home-button" type="button">
        Home
      </button>
    </div>
  )
}

export default withRouter(NotFound)
