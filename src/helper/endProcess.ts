export const endProcess = (error = false) => {
  if (error) {
    process.exit(1);
  } else {
    process.exit(0);
  }
};
