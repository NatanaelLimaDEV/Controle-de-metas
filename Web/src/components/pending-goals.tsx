import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingGoals } from "../http/get-pending-goals";
import { createGoalCompletion } from "../http/create-goal-completion";

// Exibe metas pendentes.
export function PendingGoals() {
  const queryClient = useQueryClient();

  // Faz a busca de metas pendentes. 
  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  });

  // Valida data
  if (!data) {
    return null;
  }

  // Chamada quando uma meta é concluída.
  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);

    // Atualiza as informações na tela.
    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  }

  // Gera os botões para cada meta.
  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-400" />
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
