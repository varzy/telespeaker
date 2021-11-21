import gap from './gap';
import size from './size';

export default (app) => {
  app.directive('gap', gap);
  app.directive('size', size);
};
