import exp from 'constants';
import React, { FC, ReactElement } from 'react';

type ChildProps = {

}

const TasksList: FC<ChildProps> = ({ }): ReactElement => {
  return (
    <div>
      <p>Task List:</p>
      <button>Click Me!</button>
    </div>
  )
};

export default TasksList;