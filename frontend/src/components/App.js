import React, { Component } from "react";

console.log("Rendering App.js");

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }

    componentDidMount() {
        fetch("/api/consoles/") // note the leading slash
        .then((response) => {
        if (response.status > 400) {
            throw new Error(`Bad response: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
        console.log("Fetched consoles:", data);
        this.setState({
            data,
            loaded: true,
        });
        })
        .catch((error) => {
        console.error("Fetch failed:", error);
        this.setState({ placeholder: "Something went wrong!" });
        });
    }


  render() {
    if (!this.state.loaded) {
      return <p>{this.state.placeholder} TEST</p>;
    }

    return (
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Manufacturer</th>
            <th>Release Date</th>
            <th>Media Format</th>
            <th>Max Resolution</th>
            <th>Descripton</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((item) => (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                {item.image_url ? (
                    <img
                    src={item.image_url}
                    alt={item.name}
                    style={{ width: "100px", height: "auto" }}
                    />
                ) : (
                    <span>No image available</span>  // <-- This is the "else" content
                )}
                </td>
                <td>{item.manufacturer_display}</td>
                <td style={{ whiteSpace: 'nowrap', width: '120px' }}>
                {item.release_date}
                </td>
                <td>{item.media_format_display}</td>
                <td>{item.max_resolution_width}x{item.max_resolution_height}</td>
                <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default App;