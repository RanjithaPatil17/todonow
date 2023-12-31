import React, { FC, ReactElement } from 'react';

type Props = {
  content: string;
  _id: string;
  completed: boolean;
};

const Item: FC<Props> = ({ content, _id, completed }): ReactElement => {
  const itemClass = `board-item ${completed ? 'completed' : 'not-completed'}`;

  return (
      <div className={itemClass}>
          {
            
                completed ? <s>{content}</s> : content
         }
    </div>
  );
};

export default Item;
