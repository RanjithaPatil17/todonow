import { Component } from "react";


type Props = {};

type State = {

};

export default class Home extends Component<Props, State> {

  render() {
    
    return (
        <div className="col-md-12"
            style={
                 { fontSize: '60px', // Adjust the font size as needed
                    fontWeight: 'bold'
                }
            }
        >
        TodoNow application
      </div>
    );
  }
}
