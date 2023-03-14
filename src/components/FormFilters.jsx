import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PlanetsContext from '../context/PlanetsContext';
import { initialColumnFilterOptions } from '../context/PlanetsProvider';

export default function FormFilters() {
  const {
    nameFilter,
    setNameFilter,
    columnFilter,
    setColumnFilter,
    columnFilterOptions,
    setColumnFilterOptions,
    comparisonFilter,
    setComparisonFilter,
    filterValue,
    setFilterValue,
    filters,
    setFilters,
    setFilteredPlanets,
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

  function handleRemoveFilter(filter) {
    const newFilters = filters.filter((f) => f.column !== filter.column);
    const newColumnFilterOptions = initialColumnFilterOptions.reduce((acc, crr) => {
      if (!newFilters.some((f) => f.column === crr)) {
        acc.push(crr);
      }
      return acc;
    }, []);
    setFilteredPlanets([]);
    setFilters(newFilters);
    setColumnFilterOptions(newColumnFilterOptions);
    setColumnFilter(newColumnFilterOptions[0]);
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
            placeholder="Filtrar por nome"
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
          <button
            type="button"
            onClick={ () => setFilters([]) }
            data-testid="button-remove-filters"
          >
            Remover Filtros
          </button>
        </fieldset>
      </form>
      {filters.map((filter) => (
        <p key={ uuidv4() } data-testid="filter">
          {`${filter.column} ${filter.comparison} ${filter.value}`}
          <button onClick={ () => handleRemoveFilter(filter) } type="button">
            X
          </button>
        </p>
      ))}
    </div>
  );
}
