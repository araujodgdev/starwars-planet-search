import React, { useCallback, useContext, useEffect } from 'react';
import PlanetsContext from './context/PlanetsContext';
import Table from './components/Table';
import FormFilters from './components/FormFilters';

const swapiEndpoint = 'https://swapi.dev/api/planets';

function App() {
  const { setPlanets } = useContext(PlanetsContext);

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
      console.log(error.message);
    }
  }, [setPlanets]);

  useEffect(() => {
    fetchPlanets();
  }, [fetchPlanets]);

  return (
    <div>
      <h1>Star Wars Planets</h1>
      <FormFilters />
      <Table />
    </div>
  );
}

export default App;
