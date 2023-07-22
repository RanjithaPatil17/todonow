import React, { useState,FC,ReactElement, useEffect
} from 'react';
import ReactModal from 'react-modal';

import {
  
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import Item from './item';

export interface Item {
  _id: string;
  content: string;
}




const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any): React.CSSProperties => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : '',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  background: isDraggingOver ? 'lightblue' : '',
  padding: grid,
  width: 600,
});

type Props = {
  CompletedItems: Item[];
  PendingItems: Item[];
  New: (params: any) => any;
  Update: (id: string, index: any, destination: any) => any;
}


// const TasksColumn: FC<ChildProps> = ({ Name }): ReactElement => 
 const Board: FC<Props> = ({ CompletedItems,PendingItems, New, Update }): ReactElement =>  {
   const [state, setState] = useState<Item[][]>([]);
   const [completed, setCompleted] = useState<Item[]>([]);
   const [pending, setPending] = useState<Item[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
   const [inputText, setInputText] = useState<string>('');
   
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
    var dstIndex = destination.index;
    var destinationId = destination.droppableId;
    Update(result.draggableId, dstIndex, destinationId);
  };

   
  return (
    <div>
           <button type="button" onClick={() => setIsDialogOpen(true)}>
        Add new item
      </button>

      <ReactModal
        isOpen={isDialogOpen}
        onRequestClose={() => setIsDialogOpen(false)}
        contentLabel="Example Modal"
      >
        <h2>Add new item</h2>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            // Handle dialog box submission here
            // You can access the input text using `inputText` state
            // Do any processing or actions based on the user input
            console.log('User input:', inputText);
            New(inputText);
            setInputText('');
            // Close the dialog box after handling the input
            
            setIsDialogOpen(false);
          }}
        >
          Submit
        </button>
        <button type="button" onClick={() => setIsDialogOpen(false)}>
          Cancel
        </button>
      </ReactModal>
      <div style={{ display: 'flex' }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable key={"pending"} droppableId={"pending"} >
            {(provided, snapshot) => (
             <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
              >
                {pending.map((item, index) => (
                    <Draggable key={item._id} draggableId={item._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                        <Item content={item.content} _id={item._id} completed={false} />
                        </div>
                      )}
                    </Draggable>
                  ))}

              </div>
            )}
          </Droppable>
          <Droppable key={"completed"} droppableId={"completed"} >
            {
              (provided, snapshot) => (
               <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
              >
                {completed.map((item, index) => (
                    <Draggable key={item._id} draggableId={item._id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                        <Item content={item.content} _id={item._id} completed={true} />
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
              )
            }
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Board;
