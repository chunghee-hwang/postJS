import Post from './Post.js';
import { createElement } from '../util/DomControl.js';
import { getPosts } from '../util/Fetcher.js';
import PostFormPopup from './PostFormPopup.js';

export default class Dashboard {
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
    const dashboardHeaderContainer = createElement(
      'div',
      null,
      null,
      { display: 'flex' },
      this.$target
    );
    createElement('h1', null, '게시물', null, dashboardHeaderContainer);
    const newPostBtn = createElement(
      'button',
      null,
      '새 게시물',
      { 'margin-left': '20px' },
      dashboardHeaderContainer
    );
    this.dashboardElement = createElement(
      'div',
      'post-container',
      null,
      { padding: '5px' },
      this.$target
    );

    this.postFormPopup = new PostFormPopup(this.$target);

    newPostBtn.addEventListener('click', (event) =>
      this.postFormPopup.show(null, (newPost) => {
        new Post(this, newPost);
      })
    );
  }
}
