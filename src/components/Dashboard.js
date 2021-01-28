import Post from './Post.js';
import { createElement } from '../util/DomControl.js';
import { getPosts } from '../util/Fetcher.js';
import PostFormPopup from './PostFormPopup.js';

export default class Dashboard {
  $target = null;

  constructor($target) {
    this.$target = $target;

    this.render();

    getPosts().then((result) => {
      if (result.error) alert(result.error);
      else {
        result.map((post) => new Post(this, post));
      }
    });
  }

  render() {
    const $h1 = document.createElement('h1');
    $h1.innerText = '게시물';

    this.$target.appendChild($h1);

    this.dashboardElement = createElement(
      'div',
      'post-container',
      null,
      { padding: '5px' },
      this.$target
    );

    this.postFormPopup = new PostFormPopup(this.$target);
  }
}
