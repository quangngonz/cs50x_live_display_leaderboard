import { useState, useEffect } from "react";
import  supabase from "../services/supabaseClient";

export default function useRecentSubmissions() {
  const [recentSubmissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();

    const subscription = supabase
      .channel("submissions")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "submissions" },
        (payload) => {
          const newMessage = {
            id: payload.new.id,
            answer: payload.new.answer,
            correct: payload.new.correct,
            submitted_at: payload.new.submitted_at,
            team_name_id: payload.new.team_name_id,
          }
          console.log(newMessage)
          setSubmissions((prev) => [newMessage, ...prev].slice(0, 10));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function fetchSubmissions() {
    const { data, error } = await supabase
      .from("submissions")
      .select("id, answer, correct, submitted_at, team_name_id")
      .order("submitted_at", { ascending: false })
      .limit(10);

    if (!error) setSubmissions(data);
  }

  return recentSubmissions;
}
