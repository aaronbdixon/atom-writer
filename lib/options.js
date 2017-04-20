'use babel';

/** @jsx etch.dom */

import etch from 'etch';

class Options {
  constructor (props, children) {
    this.props = props;
    this.childern = children;

    this.mediumInegrationKey = atom.config.get('atom-writer.medium.integrationToken');

    etch.initialize(this);
  }

  render () {
    return (
      <div className="atom-writer--options">
        <button onClick={this.optionsClick}>Options</button>
        <input id="medium-integration-key" name="medium-integration-key" type="text" value={this.mediumInegrationKey} placeholder="Integration Key" />
        <div className="options-menu">
          <input type="text" value="" placeholder="Integration Key" />
          <button>Submit</button>
        </div>
      </div>
    );
  }

  optionsClick(e) {
    e.preventDefault();
    atom.config.set('atom-writer.medium.integrationToken', document.querySelector('#medium-integration-key').value);
  }

  set(setting, value) {
    atom.config.set(setting, value);
  }

  serialize() {return;}

  update (props, children) {
    return etch.update(this);
  }

  async destroy () {
    await etch.destroy(this);
  }
}

export default Options;
