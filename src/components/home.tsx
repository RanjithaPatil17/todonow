import { Component } from "react";

type Props = {};

type State = {};

export default class Home extends Component<Props, State> {
  render() {
    return (
      <div
        className="col-md-12"
        style={{
          fontSize: '60px', // Adjust the font size as needed
          fontWeight: 'bold',
          fontFamily: 'Lugrazia, cursive', // Use "Lugrazia" font family
          backgroundColor: '#f0f0f0',
          color: '#333',
          padding: '20px',
          textAlign: 'center',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          border: '2px solid #ccc', // Add a border around the div
          maxWidth: '800px', // Limit the maximum width of the div
          margin: '0 auto', // Center the div horizontally
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Add a text shadow
          lineHeight: '1.2', // Set the line height for better readability
        }}
      >
        TodoNow application
      </div>
    );
  }
}
