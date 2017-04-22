'use babel';

import AtomWriter from './writer';
import { CompositeDisposable } from 'atom';
import { Config, Settings } from './config';
import _ from 'lodash';

export default {
  config: Settings,
  atomWriter: null,
  subscriptions: null,
  panel: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'write:enable': () => this.enable(),
      'write:disable': () => this.disable()
    }));

    atom.workspace.onDidStopChangingActivePaneItem((editor) => {
      if (editor.getPath && editor.getPath().indexOf('.md') !== -1) {
        atom.notifications.addSuccess('Atom Writer Mode Available', { dismissable: true });
      }

      return;
    })
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
      if (editor.getPath && editor.getPath().indexOf('.md') == -1) {
        atom.notifications.addWarning('Incompatible File Type', {
          dismissable: true,
          detail: 'File must be Markdown (.md)'
        });
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
      this.distractionFree(true);

      atom.notifications.addSuccess('Atom Writer Enabled.', { dismissable: true });
    }

    return;
  },

  distractionFree(enabled) {
    var panels = _.concat(
      atom.workspace.getLeftPanels(),
      atom.workspace.getTopPanels(),
      atom.workspace.getBottomPanels(),
      atom.workspace.getHeaderPanels(),
      atom.workspace.getFooterPanels()
    );
    
    panels.forEach((panel) => {
      if (enabled) { panel.hide(); }
      else { panel.show() }
    });
  },

  disable() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.setText(this.atomWriter.markdown());
      editor.save();
    }

    this.distractionFree(false);

    this.panel.hide();
  }
};
