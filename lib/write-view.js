'use babel';

import $ from 'jquery';
import wysiwyg from 'medium-editor';
import MeMarkdown from 'medium-editor-markdown';
import marked from 'marked';

export default class WriteView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('write', 'native-key-bindings');

    this.createElement('div', 'markdown', 'native-key-bindings');
    this.createElement('div', 'pretty', 'native-key-bindings');
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  getContent() {
    return $('.markdown').text();
  }

  setContent(content) {
    $('.pretty').html(marked(content));
  }

  initialzeEditor() {
    var editor = new wysiwyg.MediumEditor('.pretty', {
      extensions: {
          markdown: new MeMarkdown(function (md) {
              document.querySelector('.markdown').textContent = md;
          })
      }
    });
  }

  createElement(type, ...classList) {
    const el = document.createElement(type);
    el.classList.add(...classList);
    this.element.appendChild(el);
  }

  toggleMarkdown() {
    $('.pretty').toggle();
    $('.markdown').toggle();
    return;
  }
}
