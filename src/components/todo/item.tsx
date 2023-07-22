import React, { useState,FC,ReactElement, useEffect
} from 'react';
import ReactModal from 'react-modal';

type Props = {
    content: string;
    id: string;
}

const Board: FC<Props> = ({ content, id }): ReactElement => {
    return (
        <div>
            {content + " " + id}
        </div>
    )
}