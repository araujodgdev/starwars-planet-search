import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockPlanets from './helpers/mockPlanets'
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

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

it('É possível filtrar os planetas pelo nome', async () => {
  render(<PlanetsProvider><App /></PlanetsProvider>);

  const nameFilterInput = screen.getByPlaceholderText('Filtrar por nome');
  const alderaan = await screen.findByText(/alderaan/i);

  expect(nameFilterInput).toBeInTheDocument();
  expect(alderaan).toBeInTheDocument();

  act(() => {
    userEvent.type(nameFilterInput, 'oo');
  })

  const tatooine = await screen.findByText(/tatooine/i);
  expect(tatooine).toBeInTheDocument();
  expect(alderaan).not.toBeInTheDocument();
});

it('É possível aplicar um filtro numérico', async () => {
  render(<PlanetsProvider><App /></PlanetsProvider>);

  const columnFilterSelect = screen.getByTestId('column-filter');
  const comparisonFilterSelect = screen.getByTestId('comparison-filter');
  const valueFilterInput = screen.getByTestId('value-filter');

  userEvent.selectOptions(columnFilterSelect, 'diameter');
  userEvent.selectOptions(comparisonFilterSelect, 'maior que');
  userEvent.clear(valueFilterInput);
  userEvent.type(valueFilterInput, '10000');

  const hoth = await screen.findByText(/hoth/i);
  expect(hoth).toBeInTheDocument();

  act(() => {
    userEvent.click(screen.getByRole('button', { name: /filtrar/i }));
  })

  const tatooine = await screen.findByText(/tatooine/i);
  const alderaan = await screen.findByText(/alderaan/i);
  expect(tatooine).toBeInTheDocument();
  expect(alderaan).toBeInTheDocument();
  expect(hoth).not.toBeInTheDocument();

  userEvent.selectOptions(columnFilterSelect, 'population');
  userEvent.selectOptions(comparisonFilterSelect, 'igual a');
  userEvent.clear(valueFilterInput);
  userEvent.type(valueFilterInput, '200000');

  act(() => {
    userEvent.click(screen.getByRole('button', { name: /filtrar/i }));
  })

  expect(alderaan).not.toBeInTheDocument();
  expect(await screen.findByText(/tatooine/i)).toBeInTheDocument();

  act(() => {
    userEvent.click(screen.getAllByRole('button', { name: /x/i })[1]);
  })

  expect(await screen.findByText(/alderaan/i)).toBeInTheDocument();

  act(() => {
    userEvent.click(screen.getByRole('button', { name: /remover filtros/i }));
  })

  expect(await screen.findByText(/hoth/i)).toBeInTheDocument();
});

it.todo('É possível ordenar os planetas', async () => {
});

it('Testa erro no fetch dos planetas', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('Deu ruim'));

  render(<PlanetsProvider><App /></PlanetsProvider>);

  expect(await screen.findByText(/deu ruim/i)).toBeInTheDocument();
});
