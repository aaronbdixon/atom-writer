'use babel';

import WriteView from './write-view';
import { CompositeDisposable } from 'atom';

export default {

  writeView: null,
  subscriptions: null,
  writePanel: null,

  activate(state) {
    this.writeView = new WriteView(state.writeViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'write:enable': () => this.enable(),
      'write:disable': () => this.disable()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.writeView.destroy();
  },

  serialize() {
    return {
      writeViewState: this.writeView.serialize()
    };
  },

  enable() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      if (editor.getPath().indexOf('.md') == -1) {
        atom.notifications.addWarning('Incompatible File Type');
        return;
      }

      if (editor.getPath().indexOf('.md') != -1) {
        this.writePanel = atom.workspace.addRightPanel({
          item: this.writeView.getElement(),
          visible: true
        }, '');
      }

      this.writeView.setContent(editor.getText());
      this.writeView.initialzeEditor();

      atom.notifications.addSuccess('Atom Writer Enabled.');
    }

    return;
  },

  disable() {
    this.writePanel.hide();
  }

};
