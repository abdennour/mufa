export const getId = ((prefix = '_', suffix = '_') =>
  prefix + parseInt(Math.random() * 10E10) + Date.now() + suffix
);
