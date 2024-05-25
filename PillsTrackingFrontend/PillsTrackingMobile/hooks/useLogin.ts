import React from 'react';
import { setStorageItemAsync } from '@/hooks/useStorageState';

type LoginResponse = {
  phoneNumber: string;
  token: string;
};

type UseLoginHook = [
  { isLoading: boolean; error: string | null },
  (phoneNumber: string) => Promise<void>
];

export function useLogin(): UseLoginHook {
  const [state, setState] = React.useState<{ isLoading: boolean; error: string | null }>({
    isLoading: false,
    error: null
  });

  const login = async (phoneNumber: string) => {
    setState({ isLoading: true, error: null });
    try {
      const response = await fetch('https://localhost:7137/api/Account/login/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phoneNumber })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: LoginResponse = await response.json();
      
      await setStorageItemAsync('userToken', data.token);

      setState({ isLoading: false, error: null });
    } catch (error) {
        let errorMessage = 'An unknown error occurred';
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setState({ isLoading: false, error: errorMessage });
    }
  };

  return {state, login};
}
