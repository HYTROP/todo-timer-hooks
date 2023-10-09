import Task from './Task';

export default function TaskList({
  data,
  handleOnDelete,
  handleOnEdit,
  handleEditTask,
  handleIsDone,
  taskClassName,
  saveTimerValueById,
}) {
  // console.log(data)
  const elements = data.map((item) => {
    return (
      <Task
        {...item}
        key={item.id}
        taskClassName={taskClassName}
        handleOnDelete={() => handleOnDelete(item.id)}
        handleIsDone={handleIsDone}
        handleEditTask={handleEditTask}
        handleOnEdit={handleOnEdit}
        isEditing={item.isEditing}
        isDone={item.isDone}
        saveTimerValueById={saveTimerValueById}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}
