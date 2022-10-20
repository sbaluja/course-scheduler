import './App.css';
import axios from "axios";


const App = () => {

  const submitButton = () => {
    // TODO: Change endpoint URL
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => {
        alert(response.data)
      });
  }

  return (
    <div className="App">
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
  );
}

export default App;
