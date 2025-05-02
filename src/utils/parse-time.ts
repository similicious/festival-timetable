export function parseTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return { hours, minutes };
}
