import axios from "axios";
import "./Home.css"
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button"

const Home: React.FC = () => {

  const submitButton = () => {

    axios({
      method: "GET",
      url:"http://localhost:5000/testButton",
    })
    .then((response) => {
      alert("Example response: " + response.data.title)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  }

  return (
    <div className="page-container">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/page2">Page 2</Link></li>
          <li><Link to="/page3">Page 3</Link></li>
        </ul>
      </nav>
      <div className="header-container">
        <h1 className="header">Team 306!</h1>
      </div>
      <div className="button-container">
        <Button size="lg" variant="dark" onClick={submitButton}>Test</Button>
      </div>
      <footer>
        <div>
          <span>A simple website.</span>
        </div>
        <div>
          <span>For simple people.</span>
        </div>
        <div>
          <span>Team 306.</span>
        </div>
      </footer>
    </div >
  )
}

export default Home;