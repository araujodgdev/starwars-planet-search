import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PlanetsContext from '../context/PlanetsContext';

const tableColumnHeaders = [
  'name',
  'rotation_period',
  'orbital_period',
  'diameter',
  'climate',
  'gravity',
  'terrain',
  'surface_water',
  'population',
  'films',
  'created',
  'edited',
  'url',
];

export default function Table() {
  const { planets, filteredPlanets } = useContext(PlanetsContext);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {tableColumnHeaders.map((header) => <th key={ uuidv4() }>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {(filteredPlanets.length > 0 ? filteredPlanets : planets)?.map((planet) => (
            <tr key={ uuidv4() }>
              {tableColumnHeaders.map((header) => (
                <td key={ uuidv4() }>{planet[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
