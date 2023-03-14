import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PlanetsContext from '../context/PlanetsContext';

export default function FormFilters() {
  const {
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    columnFilterOptions,
    // setColumnFilterOptions,
    comparisonFilter,
    setComparisonFilter,
    filterValue,
    setFilterValue,
    filters,
    setFilters,
  } = useContext(PlanetsContext);

  function handleFilter(e) {
    e.preventDefault();
    const newFilter = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: filterValue,
    };
    setFilters([...filters, newFilter]);
  }

  return (
    <div>
      <form onSubmit={ (e) => handleFilter(e) }>
        <label htmlFor="filterByName">
          <input
            type="text"
            name="filterByName"
            id="filterByName"
            data-testid="name-filter"
            value={ nameFilter }
            onChange={ ({ target }) => setNameFilter(target.value) }
          />
        </label>
        <fieldset>
          <legend>Filtros</legend>
          <select
            onChange={ ({ target: { value } }) => setColumnFilter(value) }
            value={ columnFilter }
            data-testid="column-filter"
          >
            {columnFilterOptions.map((option) => (
              <option key={ uuidv4() } value={ option }>
                {option}
              </option>
            ))}
          </select>
          <select
            onChange={ ({ target: { value } }) => setComparisonFilter(value) }
            value={ comparisonFilter }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
          <input
            type="text"
            onChange={ ({ target: { value } }) => setFilterValue(value) }
            value={ filterValue }
            data-testid="value-filter"
          />
          <button type="submit" data-testid="button-filter">
            Filtrar
          </button>
        </fieldset>
      </form>
      {filters.map((filter) => (
        <p key={ uuidv4() }>
          {`${filter.column} ${filter.comparison} ${filter.value}`}
          <button type="button">
            X
          </button>
        </p>
      ))}
    </div>
  );
}
