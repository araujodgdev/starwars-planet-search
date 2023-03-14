import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { initialColumnFilterOptions } from '../context/PlanetsProvider';
import PlanetsContext from '../context/PlanetsContext';

export default function SortForm() {
  const {
    order,
    setOrder,
    filteredPlanets,
    setFilteredPlanets,
  } = useContext(PlanetsContext);

  function handlePlanetsSort(e) {
    e.preventDefault();
    const { column, sort } = order;
    const sortedFilteredPlanets = [...filteredPlanets].sort((a, b) => {
      switch (sort) {
      case 'ASC':
        if (b[column] === 'unknown') {
          return -1;
        }
        return a[column] - b[column];
      default:
        return b[column] - a[column];
      }
    });
    setFilteredPlanets(sortedFilteredPlanets);
  }

  return (
    <div>
      <form onSubmit={ (e) => handlePlanetsSort(e) }>
        <fieldset>
          <legend>Ordenar por:</legend>
          <select
            onChange={ ({ target: { value } }) => setOrder({ ...order, column: value }) }
            value={ order.column }
            data-testid="column-sort"
          >
            {initialColumnFilterOptions.map((option) => (
              <option key={ uuidv4() } value={ option }>
                {option}
              </option>
            ))}
          </select>
          <label htmlFor="asc">
            <input
              type="radio"
              name="order"
              id="asc"
              value="ASC"
              data-testid="column-sort-input-asc"
              onChange={ ({ target: { value } }) => setOrder({ ...order, sort: value }) }
            />
            Ascendente
          </label>
          <label htmlFor="desc">
            <input
              type="radio"
              name="order"
              id="desc"
              value="DESC"
              data-testid="column-sort-input-desc"
              onChange={ ({ target: { value } }) => setOrder({ ...order, sort: value }) }
            />
            Descendente
          </label>
          <button type="submit" data-testid="column-sort-button">
            Ordenar
          </button>
        </fieldset>
      </form>
    </div>
  );
}
