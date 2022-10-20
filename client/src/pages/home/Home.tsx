import axios from "axios";
import "./Home.css"

const Home: React.FC = () => {

  const submitButton = () => {

    // TODO: Change endpoint URL
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        alert("Example response: " + response.data.title)
      });
  }

  return (
    <div>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#page 2">Page 2</a></li>
          <li><a href="#page 3">Page 3</a></li>
        </ul>
      </nav>
      <br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />
      <h1 className="title">A Simple Website.</h1>
      <div className="center">
        <button className="button" type="button" onClick={submitButton}>Test</button>
      </div>
      <br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />
      <br /><br />
      <footer>
        <p className="footerhead">
          A simple website.<br />For simple people.<br />Team 306
        </p>
      </footer>
    </div >
  )
}

export default Home;