import React from 'react';
import {Autobind} from 'babel-autobind';

@Autobind
class App extends React.Component {
  state= {userInfo:''};

  on() {
    this.props.mufa.on(...arguments);
  }

  fire() {
    this.props.mufa.fire(...arguments);
  }

  mufaDidMount() {
    this.on('success_getGitUserInfo', this.onSuccessGetGitUserInfo);
    this.on('fail_getGitUserInfo', this.onFailGetGitUserInfo);
  }

  componentDidMount() {
    this.mufaDidMount();
  }

  onSuccessGetGitUserInfo(userInfo) {
    if (userInfo && userInfo.message === 'Not Found')
      return this.onFailGetGitUserInfo(this.refs.username.value+' is not found in github.');
    this.setState({userInfo: this.renderUserInfo(userInfo), color:'green'})
  }

  onFailGetGitUserInfo(error) {
    this.setState({userInfo:String(error), color:'red'});

  }

  onKeyUp(event) {
    if (event.which == 13 || event.keyCode == 13) {
      this.fire('start_getGitUserInfo',  event.target.value);
    }
  }

  renderUserInfo(userInfo) {
    const infoList = (
        <ul>
          {Object.keys(userInfo)
                  .map((key, i) => (
                          <li key={key}><b>{key}</b> {userInfo[key]}</li>
            ))}
        </ul>
    );
     const avatar = (
        <img src={userInfo.avatar_url} style={{maxWidth: '100%', height: 'auto'}} />
    );

    return (
      <div>
        <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        {avatar}
        </div>
        <div>
          {infoList}
        </div>

      </div>
    );
  }

  render() {

    return (
      <div style={{marginLeft: '5%', marginRight: '5%'}}>
        <h1><a href="https://abdennour.github.io/mufa">mufa</a></h1>
        <div>
          <div>
              <input
                ref="username"
                type="text"
                placeholder="Enter github username ,then press ENTER"
                onKeyUp={this.onKeyUp}  />
              <div style={{color: this.state.color}}>{this.state.userInfo}</div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
