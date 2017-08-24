'use babel';

import AtomWriter from './writer';
import { CompositeDisposable } from 'atom';
import { Config, Settings } from './config';
import _ from 'lodash';

export default {
  config: Settings,
  writer: null,
  subscriptions: null,
  panel: null,
  enabled: false,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'write:toggle': () => this.toggle()
    }));
    
    //--> TODO: Display icon to allow user to open Atom Editor

    this.handlePaneChange();
  },

  deactivate() {
    this.subscriptions.dispose();
    this.writer.destroy();
    this.panel.destroy();
  },

  /*serialize() {
    return {
      atomWriterState: this.atomWriter.serialize()
    };
  },*/

  handlePaneChange() {
    atom.workspace.onDidStopChangingActivePaneItem((editor) => {
      if (editor && editor.getPath && editor.getPath().indexOf('.md') !== -1) {
        // Show icon to enable writer
      }
      else {
        // Hide icon to enable writer
      }

      return;
    });
  },

  toggleDistractionFree() {
    var panels = _.concat(
      atom.workspace.getLeftPanels(),
      atom.workspace.getTopPanels(),
      atom.workspace.getBottomPanels(),
      atom.workspace.getHeaderPanels(),
      atom.workspace.getFooterPanels()
    );

    panels.forEach((panel) => {
      if (panel.visible) { panel.hide(); }
      else { panel.show() }
    });
    
    if (document.getElementsByClassName('.nuclide-file-tree')) {
      atom.commands.dispatch(
        atom.views.getView(atom.workspace),
        'nuclide-file-tree:toggle'
      );
    }
    
    if (document.getElementsByClassName('.tree-view')) {
      atom.commands.dispatch(
        atom.views.getView(atom.workspace),
        'tree-view:toggle'
      );
    }
  },
  
  toggle() {
    if (this.enabled) {
      this.disable();
    }
    else {
      this.enable();
    }
  },
  
  enable() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      if (editor && editor.getPath && editor.getPath().indexOf('.md') == -1) {
        var warning = atom.notifications.addWarning('Are you even a writer?', {
          dismissable: true,
          detail: 'Atom Writer is only compatible with Markdown (.md) files.'
        });
        
        setTimeout(function() {
          warning.dismiss();
        }, 1500);
        
        return;
      }

      this.writer = new AtomWriter({
        content: editor.getText()
      });

      this.panel = atom.workspace.addRightPanel({
        item: this.writer,
        visible: true
      }, '');

      this.writer.loadWysiwyg();
      this.toggleDistractionFree();

      var success = atom.notifications.addSuccess('Get to Writing!', {
        dismissable: true,
        detail: 'Atom Writer is ready to use.'
      });

      setTimeout(function() {
        success.dismiss();
      }, 1500);
      
      this.enabled = !this.enabled;
    }

    return;
  },

  disable() {
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      editor.setText(this.writer.markdown());
      editor.save();
    }

    this.toggleDistractionFree();

    this.panel.hide();
    
    this.enabled = !this.enabled;
  }
};
