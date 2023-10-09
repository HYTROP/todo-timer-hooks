import { useState } from 'react';

export default function NewTaskForm({ addTask }) {
  const [text, setText] = useState('');
  const [newTaskMin, setNewTaskMin] = useState('');
  const [newTaskSec, setNewTaskSec] = useState('');

  const onValueChange = (e) => {
    setText(e.target.value);
  };

  const onMinChange = (e) => {
    setNewTaskMin(e.target.value);
  };

  const onSecChange = (e) => {
    setNewTaskSec(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    addTask(text, Number(newTaskMin), Number(newTaskSec));
    setText('');
    setNewTaskMin('');
    setNewTaskSec('');
  };

  return (
    <header className="header">
      <form onSubmit={handleFormSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={onValueChange}
          value={text}
        />

        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          value={newTaskMin}
          onChange={onMinChange}
        />

        <input
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          value={newTaskSec}
          onChange={onSecChange}
        />

        <button type="submit" hidden />
      </form>
    </header>
  );
}
