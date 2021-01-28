import Post from './Post.js';
import { createElement } from '../util/DomControl.js';
import { getPosts } from '../util/Fetcher.js';

export default class Dashboard {
  $target = null;

  constructor($target) {
    this.$target = $target;

    const $h1 = document.createElement('h1');
    $h1.innerText = '게시물';

    $target.appendChild($h1);

    const postContainer = createElement(
      'div',
      'post-container',
      null,
      { padding: '5px' },
      $target
    );
    getPosts().then((result) => {
      if (result.error) alert(result.error);
      else {
        result.map((post) => new Post(postContainer, post));
      }
    });
  }
}
