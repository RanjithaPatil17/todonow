import exp from 'constants';
import React, { FC, ReactElement } from 'react';

type ChildProps = {

}

const TasksItem: FC<ChildProps> = ({ }): ReactElement => {
  return (
    <div>
      <p>Task Item:</p>
      <button>Click Me!</button>
    </div>
  )
};

export default TasksItem;