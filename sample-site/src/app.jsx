import React from 'react';
import {Autobind} from 'babel-autobind';

@Autobind
class App extends React.Component {
  state= {userInfo:null, isLoading: false, message: null};

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
    this.setState({userInfo, message: null, isLoading:false})
  }

  onFailGetGitUserInfo(error) {
    this.setState({message: String(error), userInfo: null ,isLoading:false});

  }

  onKeyUp(event) {
    if (event.which == 13 || event.keyCode == 13) {
      this.setState({isLoading: true});
      this.fire('start_getGitUserInfo',  event.target.value);
    }
  }

  renderWhenError() {
    if (this.state.isLoading || this.state.userInfo) return null;
    return (<div style={{color:'red'}}>{this.state.message}</div>)
  }

  renderUserInfo() {
   const {isLoading,  userInfo}= this.state;
    if (isLoading || !userInfo) return null;
    const infoList = (
        <ul>
          {Object.keys(userInfo)
                  .map((key, i) => (
                          <li key={key}><b>{key}</b> {userInfo[key]}</li>
            ))}
        </ul>
    );
     const avatar = (
        <img src={userInfo.avatar_url} style={{maxWidth: '100%', height: 'auto'}} width="171" height="171" />
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

  renderWhenLoading() {
    if (!this.state.isLoading) return null;
    const style = {display: 'flex',justifyContent: 'center',alignItems: 'center'};
    return (
      <div style={style}><span className="rotating">⏳</span></div>
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
              <div >
                {this.renderWhenLoading()}
                {this.renderUserInfo()}
                {this.renderWhenError()}
              </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
