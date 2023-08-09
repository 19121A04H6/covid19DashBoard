import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

export default function Footer() {
  return (
    <div className="footer">
      <p className="covid19">
        Covid19<span className="india">India</span>
      </p>
      <p className="para">we stand with everyone fighting on the front lines</p>
      <div className="logos">
        <VscGithubAlt className="cat" />
        <FiInstagram className="insta-logo" />
        <FaTwitter className="twitter" />
      </div>
    </div>
  )
}
