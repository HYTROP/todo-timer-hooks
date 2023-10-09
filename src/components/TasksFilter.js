export default function TaskFilters(props) {
  const buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const { handleFilter } = props;
  const filterButton = buttons.map(({ name, label }) => {
    return (
      <li key={name}>
        <button key={name} onClick={() => handleFilter(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{filterButton}</ul>;
}
