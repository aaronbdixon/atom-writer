'use babel';

/** @jsx etch.dom */

import etch from 'etch';
import wysiwyg from 'medium-editor';
import toMarkdown from 'to-markdown';
import marked from 'marked';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

class Writer {
  constructor (props, children) {
    this.props = props;
    this.childern = children;
    this.editor = null;

    this.props.content = this.html(this.props.content);
    this.props.theme = this.getThemePath();

    etch.initialize(this);
  }

  render () {
    return (
      <div className="atom-writer native-key-bindings">
        <link rel="stylesheet" type="text/css" href={this.props.theme} />
        <div className="atom-writer--editor" innerHTML={this.props.content} />
      </div>
    );
  }
  
  getThemePath() {
    var packagePaths = _.filter(atom.packages.getPackageDirPaths(), function(packagePath) {
      return !packagePath.includes('/dev/');
    });

    if (packagePaths.length === 0) return null;
    
    var themePath = packagePaths[0] +
      '/atom-writer/node_modules/medium-editor/dist/css/themes/' +
      atom.config.get('atom-writer.styles.wysiwygTheme') + '.min.css';
    
    try {
      fs.accessSync(themePath, fs.constants.F_OK);
      return themePath;
    }
    catch (err) {
      return null;
    }
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
