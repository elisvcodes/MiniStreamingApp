const convertSecondsToMinutes = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  return `${minutes}:${Math.floor(remainingSeconds)}`;
};

export default convertSecondsToMinutes;
