'use babel';

/** @jsx etch.dom */

import etch from 'etch';
import classNames from 'classnames';

class Options {
  constructor (props, children) {
    this.props = props;
    this.childern = children;

    this.props.open;
    this.props.mediumInegrationToken = atom.config.get('atom-writer.medium.integrationToken');

    etch.initialize(this);
  }

  render () {
    var menuClass = classNames('options-menu', {
      "open": this.props.open,
      "close": this.props.open === false
    });

    return (
      <div className="atom-writer--options">
        <button id="menu-toggle" onClick={this.toggle}>Menu</button>
        <div className={menuClass}>
          <h2>Options Menu</h2>
          <input id="medium-integration-token" name="medium-integration-token" type="text" value={this.props.mediumInegrationToken} placeholder="Integration Token" />
          <button id="save" onClick={this.save}>Save</button>
        </div>
      </div>
    );
  }

  toggle(e) {
    e.preventDefault();

    this.props.open = !this.props.open;
    this.update();
  }

  save(e) {
    e.preventDefault();

    atom.config.set('atom-writer.medium.integrationToken', document.querySelector('#medium-integration-token').value);
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
