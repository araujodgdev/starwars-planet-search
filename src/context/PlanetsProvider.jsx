import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

export const initialColumnFilterOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [columnFilterOptions, setColumnFilterOptions] = useState(
    initialColumnFilterOptions,
  );
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [filterValue, setFilterValue] = useState('0');
  const [filters, setFilters] = useState([]);
  const [order, setOrder] = useState({
    column: 'population',
    sort: '',
  });

  const hasNameFilter = nameFilter.length !== '';

  const contextValue = useMemo(
    () => ({
      planets,
      setPlanets,
      filteredPlanets,
      setFilteredPlanets,
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
      order,
      setOrder,
    }),
    [
      planets,
      filteredPlanets,
      nameFilter,
      columnFilter,
      comparisonFilter,
      filterValue,
      columnFilterOptions,
      filters,
      order,
    ],
  );

  const handleFilters = useCallback(() => {
    filters.forEach(({ column, comparison, value }) => {
      if (comparison === 'maior que') {
        const planetsFilteredByComparison = (
          filteredPlanets.length > 0 ? filteredPlanets : planets
        ).filter((planet) => Number(planet[column]) > Number(value));
        const newColumnFilterOptions = columnFilterOptions.filter(
          (opt) => opt !== column,
        );
        setColumnFilterOptions(newColumnFilterOptions);
        setColumnFilter(newColumnFilterOptions[0]);
        setFilteredPlanets(planetsFilteredByComparison);
      }
      if (comparison === 'menor que') {
        const planetsFilteredByComparison = (
          filteredPlanets.length > 0 ? filteredPlanets : planets
        ).filter(
          (planet) => Number(planet[column]) < Number(value),
        );
        const newColumnFilterOptions = columnFilterOptions.filter(
          (opt) => opt !== column,
        );
        setColumnFilterOptions(newColumnFilterOptions);
        setColumnFilter(newColumnFilterOptions[0]);
        setFilteredPlanets(planetsFilteredByComparison);
      }
      if (comparison === 'igual a') {
        const planetsFilteredByComparison = (
          filteredPlanets.length > 0 ? filteredPlanets : planets
        ).filter(
          (planet) => Number(planet[column]) === Number(value),
        );
        const newColumnFilterOptions = columnFilterOptions.filter(
          (opt) => opt !== column,
        );
        setColumnFilterOptions(newColumnFilterOptions);
        setColumnFilter(newColumnFilterOptions[0]);
        setFilteredPlanets(planetsFilteredByComparison);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, planets]);

  useEffect(() => {
    if (hasNameFilter) {
      const planetsFilteredByName = planets.filter(({ name }) => name
        .toLocaleLowerCase().includes(nameFilter.toLocaleLowerCase()));
      setFilteredPlanets(planetsFilteredByName);
    }
    handleFilters();
  }, [hasNameFilter, nameFilter, planets, filters, handleFilters]);

  return (
    <PlanetsContext.Provider value={ contextValue }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
