import {Link} from 'react-router-dom'

import './index.css'

const Header = () => (
  <nav>
    <div className="nav-container">
      <Link to="/">
        <p className="covid-heading">
          COVID19<span className="span">INDIA</span>
        </p>
      </Link>
      <ul className="home-about-container">
        <Link className="home-link" to="/">
          <li>Home</li>
        </Link>
        <Link className="about-link" to="/about">
          <li>About</li>
        </Link>
      </ul>
    </div>
  </nav>
)

export default Header
