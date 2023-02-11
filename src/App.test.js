import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Home from './Controlere/Home';
import Login from './Login';
import Register from './Register';
import Reset from './Reset';

import {Stadion} from './Stadion';
import {Meci} from './Meci';
import {Jucator} from './Jucator';
import {Staff} from './Staff';

import React from 'react'; 


test('check if home page renders', () => {
  const {container} = render(<Home />);
  const count = container.getElementsByClassName('home');
  expect(count.length).toBe(1);
});


test('check if user can log', async() => {
  const container = render(<Login />);

  const email_input = container.getByPlaceholderText('Email');
  const passwd_input = container.getByPlaceholderText('Parola');

  await waitFor(async () => {
    const btn = container.getByText("Login");

    act(() => {
      fireEvent.change(email_input, {target: {value: 'test@test.com'}});
      fireEvent.change(passwd_input, {target: {value: '123456'}});
    });

    expect(container.getByPlaceholderText('Email').value).toBe('test@test.com');
    expect(container.getByPlaceholderText('Parola').value).toBe('123456');

    act(() => {
      fireEvent.click(btn);
    });
    
    await waitFor(() => {
      expect(container.getByPlaceholderText('Email').textContent).toEqual('');
      expect(container.getByPlaceholderText('Parola').textContent).toEqual('');
    });
  });
});


test('check if user can register', async() => {
  const container = render(<Register />);

  const email_input = container.getByPlaceholderText('Email');
  const passwd_input = container.getByPlaceholderText('Parola');
  const surname_input = container.getByPlaceholderText('Nume');
  const name_input = container.getByPlaceholderText('Prenume');
  const role_input = container.getByPlaceholderText('Rol');

  await waitFor(async () => {
    const btn = container.getByText("Register");

    act(() => {
      fireEvent.change(email_input, {target: {value: 'test@test.com'}});
      fireEvent.change(passwd_input, {target: {value: '123456'}});
      fireEvent.change(surname_input, {target: {value: 'Popescu'}});
      fireEvent.change(name_input, {target: {value: 'Octavian'}});
      fireEvent.change(role_input, {target: {value: 'jucator'}});
    });

    expect(container.getByPlaceholderText('Email').value).toBe('test@test.com');
    expect(container.getByPlaceholderText('Parola').value).toBe('123456');
    expect(container.getByPlaceholderText('Nume').value).toBe('Popescu');
    expect(container.getByPlaceholderText('Prenume').value).toBe('Octavian');
    expect(container.getByPlaceholderText('Rol').value).toBe('jucator');

    act(() => {
      fireEvent.click(btn);
    });
    
    await waitFor(() => {
      expect(container.getByPlaceholderText('Email').textContent).toEqual('');
      expect(container.getByPlaceholderText('Parola').textContent).toEqual('');
      expect(container.getByPlaceholderText('Nume').textContent).toEqual('');
      expect(container.getByPlaceholderText('Prenume').textContent).toEqual('');
    });
  });
});


test('check if user can reset password', async() => {
  const container = render(<Reset />);

  const email_input = container.getByPlaceholderText('Email');

  await waitFor(async () => {
    const btn = container.getByText("Reset");

    act(() => {
      fireEvent.change(email_input, {target: {value: 'test@test.com'}});
    });

    expect(container.getByPlaceholderText('Email').value).toBe('test@test.com');

    act(() => {
      fireEvent.click(btn);
    });
    
    await waitFor(() => {
      expect(container.getByPlaceholderText('Email').textContent).toEqual('');
    });
  });
});


test('check if stadiums page loads', async() => {
  render(<Stadion />);

  await waitFor(() => {
    const title = screen.getByText(/LISTA STADIOANE/i);
    expect(title).toBeInTheDocument();
  });
});


test('check if matches page loads', async() => {
  render(<Meci />);

  await waitFor(() => {
    const title = screen.getByText(/LISTA MECIURI/i);
    expect(title).toBeInTheDocument();
  });
});


test('check if players page loads', async() => {
  render(<Jucator />);

  await waitFor(() => {
    const title = screen.getByText(/LISTA JUCATORI/i);
    expect(title).toBeInTheDocument();
  });
});


test('check if players page loads', async() => {
  render(<Staff />);

  await waitFor(() => {
    const title = screen.getByText(/MEMBRII STAFF/i);
    expect(title).toBeInTheDocument();
  });
});