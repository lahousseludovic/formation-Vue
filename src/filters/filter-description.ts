export default function(value: string, limit: number, active: boolean): string {
  return active ? value : value.substr(0, limit);
}
