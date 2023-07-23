import { Component } from "react";

import EventBus from "../common/EventBus";
import Board, {Item} from "./todo/board";
import TodoService from "../services/todo.service";

type Props = {};

type State = {
  completed: Item[];
  pending: Item[];
};

export default class BoardUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      completed: [],
      pending: [],
    };
  }

  fetchTodoList() {
    TodoService.getTodoList().then(
      (response) => {
        if (response.data.completed) {
          this.setState({
            completed: response.data.completed,
          });
        }
        if (response.data.pending) {
          this.setState({
            pending: response.data.pending,
          });
        }
      },
      (error) => {
        // this.setState({
        //   content:
        //     (error.response &&
        //       error.response.data &&
        //       error.response.data.message) ||
        //     error.message ||
        //     error.toString(),
        // });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  AddNew = (content: string) => {
    TodoService.createTodo({
      content: content,
    }).then((resp) => {
      this.fetchTodoList();
    });
  };

  Delete = (id: string) => {
    TodoService.deleteTodo(id).then((resp) => {
      this.fetchTodoList();
    });
  };

  Update = (id: string, index: any, destination: any) => {
    TodoService.updateTodo(id, {
      index: index,
      destination: destination,
    }).then((resp) => {
      this.fetchTodoList();
    });
  };
  componentDidMount() {
    this.fetchTodoList();
  }

  render() {
    return (
      <div className="container text-center">
        {/* <div className="row align-items-start"> */}
          {/* <div className="col"> */}
            <Board
              CompletedItems={this.state.completed}
              PendingItems={this.state.pending}
              New={this.AddNew}
              Update={this.Update}
              Delete={this.Delete}
            />
          {/* </div> */}
        {/* </div> */}
      </div>
    );
  }
}
