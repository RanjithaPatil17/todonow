import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import TasksColumn from "./todo/tasks.column";
import Board from "./todo/board";

type Props = {};

type State = {
  content: string;
};

export default class BoardUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div className="container text-center">
        <div className="row align-items-start">
          <div className="col">
            <Board Name=""/>
            </div>
        </div>
      </div>
    );
  }
}
