const format = (uuid) => {
  let part1 = uuid.slice(0, 8);
  let part2 = uuid.slice(8, 12);
  let part3 = uuid.slice(12, 16);
  let part4 = uuid.slice(16, 20);
  let part5 = uuid.slice(20, 32);
  return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}

export {
  format,
}