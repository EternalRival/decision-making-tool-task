import DecisionPickerPage from './routes/decision-picker';
import ErrorPage from './routes/error-page';
import HomePage from './routes/home';
import Route from './core/models/route.enum';
import HashRouter from './core/router/hash-router';

export default class App extends HashRouter {
  constructor({ root }: { root: HTMLElement }) {
    super({
      root,
      routes: {
        [Route.HOME]: () => new HomePage(),
        [Route.DECISION_PICKER]: () => new DecisionPickerPage(),
      },
      errorPage: () => new ErrorPage(),
    });
  }
}
