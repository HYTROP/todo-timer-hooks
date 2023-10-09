import TaskFilter from './TasksFilter';

export default function Footer({ handleFilter, todoCount, handlerClearCompleted, id }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter id handleFilter={handleFilter} />
      <button className="clear-completed" onClick={() => handlerClearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}
