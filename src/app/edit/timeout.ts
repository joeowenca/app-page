export type TimeoutTypes = {
  id: number;
  appId: string;
};

export function addTimeout(timeout: TimeoutTypes, timeouts: TimeoutTypes[]) {
  const updatedTimeouts = [...timeouts];
  updatedTimeouts.push(timeout);
  return updatedTimeouts;
}