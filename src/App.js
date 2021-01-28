import Dashboard from './components/Dashboard.js';

export default class App {
  $target = null;
  dashboard = null;

  constructor($target) {
    this.$target = $target;

    this.dashboard = new Dashboard($target);
  }
}
