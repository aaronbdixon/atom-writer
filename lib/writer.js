'use babel';

/** @jsx etch.dom */

import etch from 'etch';
import wysiwyg from 'medium-editor';
import toMarkdown from 'to-markdown';
import marked from 'marked';
import Options from './options';

class Writer {
  constructor (props, children) {
    this.props = props;
    this.childern = children;
    this.editor = null;

    this.props.content = this.html(this.props.content);
    
    etch.initialize(this);
  }

  render () {
    return (
      <div className="atom-writer native-key-bindings">
        <div className="atom-writer--editor" innerHTML={this.props.content} />
        <Options />
      </div>
    );
  }

  markdown() {
    return toMarkdown(this.props.content);
  }

  html(content) {
    return marked(content);
  }

  loadWysiwyg() {
    this.editor = new wysiwyg.MediumEditor('.atom-writer--editor', {
      placeholder: false,
      spellcheck: true
    });

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
