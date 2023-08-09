import {Link} from 'react-router-dom'

import Popup from 'reactjs-popup'

import './index.css'

const Header = () => (
  <nav>
    <div className="nav-container">
      <p className="covid-heading">
        COVID19<span className="span">INDIA</span>
      </p>
      <ul className="home-about-container">
        <Link className="home-link" to="/">
          <li>Home</li>
        </Link>
        <Link className="about-link" to="/about">
          <li>About</li>
        </Link>
      </ul>

      <Popup
        modal
        trigger={
          <img
            className="icon"
            src="https://res.cloudinary.com/dldkabpos/image/upload/v1691037291/add-to-queue_1_sdevv6.png"
            alt="add-to-queue"
          />
        }
      >
        {close => (
          <div className="popup-container">
            <div className="tabs">
              <Link className="home-tab" to="/">
                <p>Home</p>
              </Link>
              <Link className="about-tab" to="/about">
                <p>About</p>
              </Link>
            </div>
            <button className="close-button" type="button">
              <img
                src="https://res.cloudinary.com/dldkabpos/image/upload/v1691043575/Solid_o1czlj.png"
                alt="close"
                onClick={() => close()}
              />
            </button>
          </div>
        )}
      </Popup>
    </div>
  </nav>
)

export default Header
