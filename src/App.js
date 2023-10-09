import React, { useState } from 'react';
import './App.css';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import { v4 as uuidv4 } from 'uuid';

export default function App() {
  const [tasksData, setTaskData] = useState([]);
  const [filter, setFilter] = useState('all');

  let taskClassName;

  const handleAddTask = (inputText, min, sec) => {
    if (inputText.trim() === '') {
      return false;
    }

    const newItem = {
      label: inputText,
      min: min,
      sec: sec,
      id: uuidv4(),
      isDone: false,
      isEditing: false,
      timeStamp: new Date(),
      stopTimerDate: '',
    };

    setTaskData((prevState) => [...prevState, newItem]);
  };

  const handleIsDone = (id) => {
    setTaskData((prevState) =>
      prevState.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isDone: !Boolean(task.isDone),
          };
        }
        return task;
      })
    );
  };

  const handleOnDelete = (id) => {
    setTaskData((prevState) => prevState.filter((el) => el.id !== id));
  };

  const handleOnEdit = (id) => {
    setTaskData((prevState) =>
      prevState.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isEditing: !task.isEditing,
          };
        }
        return task;
      })
    );
  };

  const handleEditTask = (newLabel, id) => {
    setTaskData((prevState) =>
      prevState.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            label: newLabel,
            isEditing: false,
          };
        }
        return task;
      })
    );
  };

  const handleFilter = (name) => {
    setFilter(name);
  };

  const getFilteredTasks = () => {
    if (filter === 'all') {
      return tasksData;
    } else if (filter === 'active') {
      return tasksData.filter((e) => !e.isDone);
    } else if (filter === 'completed') {
      return tasksData.filter((e) => e.isDone);
    }
  };

  const handlerClearCompleted = () => {
    setTaskData((prevState) => prevState.filter((el) => !el.isDone));
  };

  const saveTimerValueById = (id, min, sec, stopTimerDate) => {
    const newTasksData = [...tasksData];
    console.log(tasksData);
    const index = tasksData.findIndex((e) => e.id === id);
    if (index !== -1) {
      newTasksData[index].min = min;
      newTasksData[index].sec = sec;
      newTasksData[index].stopTimerDate = stopTimerDate;
      setTaskData(newTasksData);
    }
  };

  const doneCount = tasksData.filter((el) => el.isDone).length;
  const todoCount = tasksData.length - doneCount;

  return (
    <section className="todoapp">
      <header>
        <h1>ToDos</h1>
        <NewTaskForm addTask={handleAddTask} />
      </header>
      <section className="main">
        <TaskList
          data={getFilteredTasks()}
          isEditing
          handleIsDone={handleIsDone}
          taskClassName={taskClassName}
          handleOnEdit={handleOnEdit}
          handleEditTask={handleEditTask}
          handleOnDelete={handleOnDelete}
          saveTimerValueById={saveTimerValueById}
        />

        <Footer
          todoCount={todoCount}
          data={tasksData}
          handleFilter={handleFilter}
          handlerClearCompleted={handlerClearCompleted}
        />
      </section>
    </section>
  );
}
