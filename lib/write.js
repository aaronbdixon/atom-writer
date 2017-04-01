'use babel';

import WriteView from './write-view';
import { CompositeDisposable } from 'atom';

export default {

  writeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.writeView = new WriteView(state.writeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.writeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'write:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.writeView.destroy();
  },

  serialize() {
    return {
      writeViewState: this.writeView.serialize()
    };
  },

  toggle() {
    console.log('Write was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
