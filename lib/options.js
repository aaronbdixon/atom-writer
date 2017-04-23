'use babel';

/** @jsx etch.dom */

import etch from 'etch';
import classNames from 'classnames';

class Options {
  constructor (props, children) {
    this.props = props;
    this.childern = children;

    this._enabled;
    this._mediumInegrationToken = atom.config.get('atom-writer.medium.integrationToken');

    etch.initialize(this);
  }

  get enabled() {
    return this._enabled;
  }

  set enabled(val) {
    this._enabled = val;
    this.update();
  }

  toggle(e) {
    e.preventDefault();
    this.enabled = !this.enabled;
  }

  save(e) {
    e.preventDefault();
    atom.config.set('atom-writer.medium.integrationToken', document.querySelector('#medium-integration-token').value);
  }
  disable(e) {
    e.preventDefault();
  }

  serialize() {return;}

  update () {
    return etch.update(this);
  }

  async destroy () {
    await etch.destroy(this);
  }

  render () {
    var menuClass = classNames('options-menu', {
      "open": this.enabled,
      "close": this.enabled === false
    });

    var buttonClass = classNames({
      "open": this.enabled
    })

    return (
      <div className="atom-writer--options">
        <nav>
          <div id="exit-button" onClick={this.disable}>Exit</div>
          <div id="menu-button" className={buttonClass} onClick={this.toggle}>
            <span></span><span></span><span></span><span></span>
          </div>
        </nav>
        <div className={menuClass}>
          <div class="menu-title">Settings</div>
          <div class="menu-section">
            <div class="section-heading">General</div>
            <div class="section-body">

            </div>
          </div>
          <div class="menu-section">
            <div class="section-heading">Medium</div>
            <div class="section-body">
              <input id="medium-integration-token" name="medium-integration-token" type="text" value={this._mediumInegrationToken} placeholder="Integration Token" />
              <button id="save" onClick={this.save}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Options;
