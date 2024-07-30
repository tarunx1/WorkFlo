import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';


const Column = ({ column, tasks }) => {
    return (
        <div className="column">
            <h3>{column}</h3>
            <Droppable droppableId={column}>
                {(provided) => (
                    <div className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => (
                            <Task key={task._id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
