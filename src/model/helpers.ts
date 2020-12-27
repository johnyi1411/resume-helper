export const dotProduct = (xs: Array<number>, ys: Array<number>) => {
  const sum = (xs: Array<number>) => xs ? xs.reduce((a: number, b: number) => a + b, 0) : undefined;
  return xs.length === ys.length ? (sum(zipWith(multiply, xs, ys))) : undefined;
};

const multiply = (a: number, b: number) => a * b;

const zipWith = (
  f: { (a: number, b: number): number; },
  xs: Array<number>,
  ys: Array<number>
) => {
  const ny = ys.length;
  return (xs.length <= ny ? xs : xs.slice(0, ny)).map((x, i) => f(x, ys[i]));
};