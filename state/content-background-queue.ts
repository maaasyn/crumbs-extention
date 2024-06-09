const createQueue = <T>(input: T) => {
  const queue: T[] = [];

  const push = (item: T) => {
    queue.push(item);
  };

  return {
    queue,
  };
};
