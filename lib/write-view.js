'use babel';

import $ from 'jquery';
import wysiwyg from 'medium-editor';
import MeMarkdown from 'medium-editor-markdown';

export default class WriteView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('write', 'native-key-bindings');

    const markdown = document.createElement('div');
    markdown.classList.add('markdown');

    const pretty = document.createElement('div');
    pretty.classList.add('pretty');

    this.element.appendChild(markdown);
    this.element.appendChild(pretty);
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

  setContent(content) {
    $('.pretty').text(content);
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
}
