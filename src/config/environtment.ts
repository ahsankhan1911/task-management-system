export enum Environment {
  Test = 'test',
  Local = 'local',
  Development = 'development',
  Production = 'production',
}
  
const env: string = process.env.NODE_ENV || Environment.Development;
const values: Array<string> = Object.values(Environment);

if (!values.includes(env)) {
  const message = [
    'It seems you specified wrong NODE_ENV',
    `Possible values are: ${ values.join(', ') }`,
    `Your value is: ${ env }.`,
  ].join('. ');
  
  throw new Error(message);
}
  
export const ENV: Environment = env as Environment;
  