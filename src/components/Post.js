import { createElement } from '../util/DomControl.js';
import { deletePost, updatePost } from '../util/Fetcher.js';
export default class Post {
  constructor($target, post) {
    this.$target = $target;
    this.post = post;
    this.render();
  }

  handleUpdatePost() {
    const titleBody = prompt(
      '제목과 내용을 |로 구분해서 작성해',
      `${this.post.title}|${this.post.body}`
    );
    if (!titleBody) return;
    let index = titleBody.indexOf('|');
    if (index !== -1) {
      const newTitle = titleBody.substring(0, index);
      const newBody = titleBody.substring(index + 1);
      updatePost({ ...this.post, title: newTitle, body: newBody }).then(
        (res) => {
          if (res.error) {
            alert(res.error);
          } else {
            this.post = res;
            this.onUpdate();
          }
        }
      );
    }
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
    const { id, title, body, userId } = this.post;
    this.postElement = createElement(
      'div',
      null,
      null,
      { padding: '5px', display: 'inline-block' },
      this.$target
    );
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
