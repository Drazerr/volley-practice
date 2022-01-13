export function randomFailure(randomFailureRate: number) {
  const roll = Math.random();
  if (roll <= randomFailureRate) {
    throw new Error(
      `Random crash triggered! (${roll.toFixed(2)} / ${randomFailureRate})`
    );
  }
}
