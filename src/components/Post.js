import { createElement } from '../util/DomControl.js';
import { deletePost } from '../util/Fetcher.js';
export default class Post {
  constructor(dashboard, post) {
    this.dashboard = dashboard;
    this.post = post;
    this.render();
  }

  handleUpdatePost() {
    this.dashboard?.postFormPopup?.show(this.post, (newPost) => {
      this.post = newPost;
      this.onUpdate();
    });
  }
  handleDeletePost() {
    deletePost(this.post.id).then((result) => {
      if (!result) return;
      if (result.error) {
        alert(result.error);
      } else {
        this.onDelete();
      }
    });
  }

  onDelete() {
    this.postElement.remove();
  }
  onUpdate() {
    this.titleElement.innerText = this.post.title;
    this.bodyElement.innerText = this.post.body;
  }

  render() {
    const dashboardElement = this.dashboard.dashboardElement;
    const { id, title, body, userId } = this.post;
    this.postElement = createElement(
      'div',
      null,
      null,
      { padding: '5px' },
      null
    );
    dashboardElement.prepend(this.postElement);
    this.titleElement = createElement(
      'h2',
      null,
      title,
      null,
      this.postElement
    );
    this.bodyElement = createElement('p', null, body, null, this.postElement);
    const controlBtnContainer = createElement(
      'div',
      'control-btn-container',
      null,
      { padding: '2px', display: 'flex' },
      this.postElement
    );
    const updateBtn = createElement(
      'button',
      null,
      '수정',
      { margin: '3px' },
      controlBtnContainer
    );
    const deleteBtn = createElement(
      'button',
      null,
      '삭제',
      { margin: '3px' },
      controlBtnContainer
    );
    updateBtn.addEventListener('click', (event) => this.handleUpdatePost());
    deleteBtn.addEventListener('click', (event) => this.handleDeletePost());
  }
}
