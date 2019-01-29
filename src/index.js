import React from 'react';
import ReactDOM from 'react-dom';

const API = 'https://jsonplaceholder.typicode.com/photos';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumId: '',
      id: '',
      title: '',
      url: '',
      thumbnailUrl: '',
      count: 50,
      defaultCount: 50,
    };
  }

  handleCount() {
    let count = this.state.defaultCount;
    this.setState({ count });
  }

  fetchPhoto(id) {
    let url = `${API}/${id}`;
    fetch(url)
      .then((res) => res.json())
        .then((data) => {
          this.setState({
            albumId: data.albumId,
            id: data.id,
            title: data.title,
            url: data.url,
            thumbnail: data.thumbnailUrl
          });
        })
        .catch(error => console.log('There was an error, please go back.'));
  }

  componentDidMount() {
    this.fetchPhoto(this.state.id);
  }
  render() {
    return (
      <div>
        <Photo data={this.state} />
      </div>
    );
  }
}

class Photo extends react.Component {
  render() {
    let data = this.props.data;
    return (
      <div>
        <ul>
          <li>
            <h2>
              <span>Id {data.id}</span>
            </h2>
          </li>
            <span>Title {data.title}</span>
          <li>
            <span>Url</span>
            <a href={data.url}></a>
          </li>
          <li>
            <span>Thumbnail {data.thumbnailUrl}</span>
          </li>
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));



//________________________________________________________

// Actual Solution, boy did i screw this up...

import React from "react";
import { render } from "react-dom";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
let APIUrl = "https://jsonplaceholder.typicode.com/photos";
class App extends React.Component {
  state = {
    pictures: [],
    errors: null
  };

  componentDidMount() {
    fetch(APIUrl)
      .then(rep => rep.json())
      .then(payload => {
        let first50 = payload.filter((i, index) => index < 50);
        console.log(first50);
        this.setState({pictures: first50})
      })
      .catch(err => this.setState({ error: err }));
  }

  render() {
    return (
      <div style={styles}>
        {this.state.pictures.map(pic => (
          <img key={pic.id} src={pic.thumbnailUrl} alt={pic.title}/>
        ))}
      </div>
    );
  }
}
render(<App />, document.getElementById("root"));
