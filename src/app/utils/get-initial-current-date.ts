export function getInitialCurrentDate(): Date {
  let time: number = new Date().setHours(0, 0, 0, 0);
  return new Date(time);
}
