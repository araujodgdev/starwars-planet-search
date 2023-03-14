import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockPlanets from './helpers/mockPlanets'

jest.setTimeout(10000); // 10 segundos

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockPlanets)
  })
})

it('Renderiza o App corretamente', async () => {
  render(<PlanetsProvider><App /></PlanetsProvider>);

  const appTitle = screen.getByText(/star wars planets/i);
  const tatooine = await screen.findByText(/tatooine/i);
  
  expect(appTitle).toBeInTheDocument();
  expect(tatooine).toBeInTheDocument();
});
