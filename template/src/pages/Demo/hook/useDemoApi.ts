import { useQuery } from '@tanstack/react-query';
import { fetchDemoApi } from '../api/fetchDemoApi';
import type { Users } from '../demo.type';
import { demoQuery } from './queryKey';

type UseDemoApiReturn = {
  result: Users;
  isLoading: boolean;
  isError: boolean;
};

export const useDemoApi = (): UseDemoApiReturn => {
  const { data = [], isLoading, isError } = useQuery<Users>({ queryKey: demoQuery(), queryFn: fetchDemoApi });

  return { result: data, isLoading, isError };
};
