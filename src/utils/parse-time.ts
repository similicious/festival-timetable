export function parseTime(duration: string) {
  const [hours, minutes] = duration.split(";").map(parseInt);

  return { hours, minutes };
}
