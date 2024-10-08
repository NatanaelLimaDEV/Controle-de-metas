// Define o formato esperado do objeto a ser enviado para criar uma meta.
interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

// Cria uma nova meta no backend.
export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest) {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  })
}
