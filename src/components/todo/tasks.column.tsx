import exp from 'constants';
import React, { FC, ReactElement } from 'react';

type ChildProps = {
  Name: string;
}

const TasksColumn: FC<ChildProps> = ({ Name }): ReactElement => {
  return (
    <div>
      <a>{ Name}</a>
      <p>Task Column:</p>
      <button>Click Me!</button>
    </div>
  )
};

export default TasksColumn;