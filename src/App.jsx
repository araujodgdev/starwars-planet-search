import React, { useCallback, useContext, useEffect, useState } from 'react';
import PlanetsContext from './context/PlanetsContext';
import Table from './components/Table';
import FormFilters from './components/FormFilters';
import SortForm from './components/SortForm';

const swapiEndpoint = 'https://swapi.dev/api/planets';

function App() {
  const { setPlanets } = useContext(PlanetsContext);
  const [hasAnyError, setHasAnyError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPlanets = useCallback(async () => {
    try {
      const response = await fetch(swapiEndpoint);
      const { results } = await response.json();
      const planetsWithoutResidentsKey = await results.reduce((acc, crr) => {
        const { residents, ...planet } = crr;
        acc.push(planet);
        return acc;
      }, []);
      setPlanets(planetsWithoutResidentsKey);
    } catch (error) {
      setHasAnyError(true);
      setErrorMessage(error.message);
    }
  }, [setPlanets]);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  return (
    <div>
      {hasAnyError ? (
        <p>{errorMessage}</p>
      ) : (
        <div>
          <h1>Star Wars Planets</h1>
          <FormFilters />
          <SortForm />
          <Table />
        </div>
      )}
    </div>
  );
}

export default App;
