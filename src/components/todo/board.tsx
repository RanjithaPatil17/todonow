import React, { useState, FC, ReactElement, useEffect } from "react";
import ReactModal from "react-modal";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Item from "./item";

export interface Item {
  _id: string;
  content: string;
}

const grid = 8;

const getItemStyle = (
  isDragging: boolean,
  draggableStyle: any
): React.CSSProperties => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "" : "",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? "lightblue" : "",
  minHeight: "500px",
  padding: grid,
  // width: 600,
});

type Props = {
  CompletedItems: Item[];
  PendingItems: Item[];
  New: (params: any) => any;
  Update: (id: string, index: any, destination: any) => any;
  Delete: (id: string) => any;
};

// const TasksColumn: FC<ChildProps> = ({ Name }): ReactElement =>
const Board: FC<Props> = ({
  CompletedItems,
  PendingItems,
  New,
  Update,
  Delete,
}): ReactElement => {
  const [state, setState] = useState<Item[][]>([]);
  const [completed, setCompleted] = useState<Item[]>([]);
  const [pending, setPending] = useState<Item[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    setCompleted(CompletedItems);
    setPending(PendingItems);
  }, [CompletedItems, PendingItems]);

  const onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    if (destination.droppableId === "delete") {
      Delete(result.draggableId);
      return;
    }
    var dstIndex = destination.index;
    var destinationId = destination.droppableId;
    Update(result.draggableId, dstIndex, destinationId);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add new task"
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              value={inputText}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={() => {
                if (inputText.length > 0) {
                  New(inputText);
                  setInputText("");
                }
              }}
            >
              New
            </button>
          </div>
        </div>

        <div className="col-9">
          <div style={{ display: "flex" }}>
            <div className="container text-center">
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="row align-items-start">
                  <div className="col">
                    <Droppable key={"pending"} droppableId={"pending"}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                          Pending
                          {pending.map((item, index) => (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <Item
                                    content={item.content}
                                    _id={item._id}
                                    completed={false}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      )}
                    </Droppable>
                  </div>
                  <div className="col">
                    <Droppable key={"completed"} droppableId={"completed"}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                          Completed
                          {completed.map((item, index) => (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <Item
                                    content={item.content}
                                    _id={item._id}
                                    completed={true}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      )}
                    </Droppable>
                  </div>
                  <div className="col">
                    <Droppable key={"delete"} droppableId={"delete"}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                          {...provided.droppableProps}
                        >
                            <div className={snapshot.isDraggingOver ? "image-container": ""}>
                              <img src="https://img.icons8.com/ios/50/000000/delete-forever--v1.png" />
                            </div>
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
