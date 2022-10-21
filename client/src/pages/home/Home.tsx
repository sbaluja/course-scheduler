import axios from "axios";
import "./Home.css"
import { Link } from "react-router-dom";

const Home: React.FC = () => {

  const submitButton = () => {

    // TODO: Change endpoint URL
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        alert("Example response: " + response.data.title)
      });
  }

  return (
    <div className="page-container">
      <nav className="navbar">
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
        <button type="button" onClick={submitButton}>Test</button>
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