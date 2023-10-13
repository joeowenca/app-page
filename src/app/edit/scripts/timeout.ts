export type TimeoutTypes = {
  id: number;
  appId: string;
};

export function addTimeout(timeout: TimeoutTypes, timeouts: TimeoutTypes[]) {
  const updatedTimeouts = [...timeouts];
  updatedTimeouts.push(timeout);
  return updatedTimeouts;
}

export function removeTimeout(appId: string, timeouts: TimeoutTypes[]) {
  const updatedTimeouts = [...timeouts];
  const timer = timeouts.find((timer: TimeoutTypes) => timer.appId === appId);
  const timerIndex = timeouts.findIndex((timer: TimeoutTypes) => timer.appId === appId);

  if (timerIndex !== -1 && timer) {
    updatedTimeouts.splice(timerIndex, 1);
    window.clearTimeout(timer.id);
    return updatedTimeouts;
  } else {
    console.log("Error: Timer not found");
    return timeouts;
  }
}