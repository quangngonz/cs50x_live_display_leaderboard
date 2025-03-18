import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import supabase from "../services/supabaseClient.js";

const fetchRankings = async () => {
  const response = await fetch(
    'https://isph-mini-cs50x-api.vercel.app/ranking'
  );
  if (!response.ok) throw new Error('Failed to fetch rankings');
  return response.json();
};

const useTeamRankings = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['rankings'],
    queryFn: fetchRankings,
    staleTime: 60000, // Cache for 1 min
    refetchInterval: 30000, // Polling every 30s
  });

  useEffect(() => {
    const subscription = supabase
      .channel("submissions")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "submissions" },
        () => {
          queryClient.invalidateQueries(['rankings']);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);

  return query;
};

export default useTeamRankings;
