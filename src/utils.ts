export function isEmpty<T extends object>(value: T): boolean {
  for (const prop in value) {
    if (value[prop]) {
      return false;
    }
  }

  return true;
}
