'use babel';

import AtomWriter from './writer';
import { CompositeDisposable } from 'atom';

export default {
  atomWriter: null,
  subscriptions: null,
  panel: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'write:enable': () => this.enable(),
      'write:disable': () => this.disable()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.atomWriter.destroy();
    this.panel.destroy();
  },

  /*serialize() {
    return {
      atomWriterState: this.atomWriter.serialize()
    };
  },*/

  enable() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      if (editor.getPath().indexOf('.md') == -1) {
        atom.notifications.addWarning('Incompatible File Type');
        return;
      }

      this.atomWriter = new AtomWriter({
        content: editor.getText()
      });

      this.panel = atom.workspace.addRightPanel({
        item: this.atomWriter,
        visible: true
      }, '');

      this.atomWriter.loadWysiwyg();

      atom.workspace.getLeftPanels().forEach(function(panel) {
        panel.hide();
      });

      atom.notifications.addSuccess('Atom Writer Enabled.');
    }

    return;
  },

  disable() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.setText(this.atomWriter.markdown());
      editor.save();
    }

    atom.workspace.getLeftPanels().forEach(function(panel) {
      panel.show();
    });

    this.panel.hide();
  }
};
