import { createElement, setVisibility } from '../util/DomControl.js';
import { createPost, updatePost } from '../util/Fetcher.js';

export default class PostFormPopup {
  constructor(appElement) {
    this.dashboardElement = appElement;
    this.render();
    this.setBtnListeners();
  }

  render() {
    this.popup = createElement(
      'div',
      'popup',
      null,
      {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        'vertical-align': 'center',
        'text-align': 'center',
        display: 'none',
      },
      this.dashboardElement
    );
    createElement(
      'div',
      'popup-dimm',
      null,
      {
        position: 'absolute',
        background: '#000',
        opacity: '0.3',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      this.popup
    );
    const popupWrap = createElement(
      'div',
      'popup-wrap',
      null,
      {
        display: 'table',
        'table-layout': 'fixed',
        width: '100%',
        height: '100%',
      },
      this.popup
    );
    const popupInner = createElement(
      'div',
      'popup-inner',
      null,
      {
        display: 'table-cell',
        'vertical-align': 'middle',
        'text-align': 'center',
      },
      popupWrap
    );
    const popupLayer = createElement(
      'div',
      'popupLayer',
      null,
      {
        position: 'relative',
        display: 'inline-block',
        'vertical-align': 'middle',
        width: '60vw',
        'min-height': '150px',
        padding: '50px',
        background: '#fff',
        'z-index': 10,
        opacity: 1,
      },
      popupInner
    );
    this.titleInput = createElement(
      'input',
      null,
      this.post?.title,
      {
        'font-size': '30px',
        'font-weight': 'bold',
        padding: '5px',
        'text-align': 'center',
        width: '100%',
      },
      popupLayer
    );
    this.titleInput.placeholder = '제목 입력';

    this.bodyTextarea = createElement(
      'textarea',
      null,
      this.post?.body,
      {
        'font-size': '20px',
        padding: '3px',
        'margin-top': '10px',
        width: '100%',
        height: '200px',
        resize: 'none',
        'text-align': 'left',
      },
      popupLayer
    );
    this.bodyTextarea.placeholder = '내용 입력';

    const controlBtnContainer = createElement(
      'div',
      null,
      null,
      {
        'margin-top': '10px',
        display: 'flex',
        padding: '6px',
        'align-content': 'space-between',
      },
      popupLayer
    );
    this.addOrUpdatePostBtn = createElement(
      'button',
      null,
      '수정',
      { width: '100%' },
      controlBtnContainer
    );
    this.cancelPostBtn = createElement(
      'button',
      null,
      '취소',
      { width: '100%' },
      controlBtnContainer
    );
  }

  show(post = null, onResult) {
    if (post) {
      this.post = post;
      this.titleInput.value = post?.title;
      this.bodyTextarea.value = post?.body;
      this.isNew = false;
    } else {
      this.isNew = true;
    }
    setVisibility(this.popup, true);
    this.onResult = onResult;
  }
  hide() {
    this.titleInput.value = '';
    this.bodyTextarea.value = '';
    setVisibility(this.popup, false);
  }

  setBtnListeners() {
    this.cancelPostBtn.addEventListener('click', (event) => this.hide());
    this.addOrUpdatePostBtn.addEventListener('click', (event) => {
      if (!this.titleInput.value?.trim() || !this.bodyTextarea.value?.trim()) {
        alert('제목과 내용은 필수사항이에요.');
        return;
      }
      const title = this.titleInput.value;
      const body = this.bodyTextarea.value;
      const newPost = {
        ...this.post,
        title,
        body,
      };

      if (this.isNew) {
        createPost(title, body).then((res) => {
          if (res.error) {
            alert(res.error);
          } else {
            this.onResult(res);
          }
        });
      } else {
        updatePost(newPost).then((res) => {
          if (res.error) {
            alert(res.error);
          } else {
            this.onResult(newPost);
          }
        });
      }
      this.hide();
    });
  }
}
