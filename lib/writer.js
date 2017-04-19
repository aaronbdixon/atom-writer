'use babel';

/** @jsx etch.dom */

import etch from 'etch';
import wysiwyg from 'medium-editor';
import toMarkdown from 'to-markdown';
import marked from 'marked';

class Writer {
  constructor (props, children) {
    this.props = props;
    this.childern = children;
    this.editor = null;

    etch.initialize(this);
  }

  render () {
    return (
      <div className="atom-writer native-key-bindings">
        <div className="atom-writer--editor" innerHTML={this.html()} />
        <div className="atom-writer--options" onClick={this.optionsClick}>...</div>
      </div>
    );
  }

  optionsClick(e) {
    e.preventDefault();
  }

  markdown() {
    return toMarkdown(this.props.content);
  }

  html() {
    return marked(this.props.content);
  }

  loadWysiwyg() {
    this.editor = new wysiwyg.MediumEditor('.atom-writer--editor');

    this.editor.subscribe('editableInput', (data, editable) => {
      this.props.content = data.target.innerHTML;
    });
  }

  serialize() {return;}

  update (props, children) {
    return etch.update(this);
  }

  async destroy () {
    await etch.destroy(this);
  }
}

export default Writer;
