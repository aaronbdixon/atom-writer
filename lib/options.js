'use babel';

/** @jsx etch.dom */

import etch from 'etch';
import classNames from 'classnames';

class Options {
  constructor (props, children) {
    this.props = props;
    this.childern = children;

    this._enabled;
    this._activeSection = 'general';
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

  get activeSection() {
    return this._activeSection;
  }

  set activeSection(val) {
    this._activeSection = val;
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
    });

    return (
      <div className="atom-writer--options">
        <nav>
          <div id="exit-button" onClick={this.disable}>Exit</div>
          <div id="menu-button" className={buttonClass} onClick={this.toggle}>
            <span></span><span></span><span></span><span></span>
          </div>
        </nav>
        <div className={menuClass}>
          <div className="menu-section">
            <div className="section-heading" onClick={() => this.activeSection = 'general'}>General</div>
            <div className={classNames('section-body', {'active': this.activeSection === 'general'})}>

            </div>
          </div>
          <div class="menu-section">
            <div className="section-heading" onClick={() => this.activeSection = 'medium'}>Medium</div>
            <div className={classNames('section-body', {'active': this.activeSection === 'medium'})}>
              <div class="row">
                <label for="medium-integration-token">Integration Token</label>
                <input id="medium-integration-token" name="medium-integration-token" type="text" value={this._mediumInegrationToken} placeholder="Integration Token" />
              </div>
              <div class="row">
                <button id="save" onClick={this.save}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Options;
