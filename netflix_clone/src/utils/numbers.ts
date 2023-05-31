const padding = (num: number) => {
  return `00${Math.floor(num)}`.slice(-2);
};

export const hhmmss = (secs: number) => {
  let minutes = Math.floor(secs / 60);
  secs = secs % 60;
  let hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  const hours_formatted = hours === 0 ? "" : `${padding(hours)}:`;
  return `${hours_formatted}${padding(minutes)}:${padding(secs)}`;
};
