import React from 'react';
import {Autobind} from 'babel-autobind';

@Autobind
class App extends React.Component {
    state= {userInfo:''};

    on() {
      this.props.mufa.on.bind(this.props.mufa)(...arguments);
    }

    fire() {
      this.props.mufa.fire.bind(this.props.mufa)(...arguments);
    }

    componentDidMount() {
        this.on('onCompleteGetGitUserInfo', (userInfo) => {
            this.setState({userInfo:JSON.stringify(userInfo)})
         });
    }
    onKeyUp(event) {
      if (event.which == 13 || event.keyCode == 13) {
        console.warn(`🔥`);
        this.fire('onStartGetGitUserInfo',  event.target.value);
      }
    }
  render() {

    return (
      <div>
        <h1>mufa</h1>
        <div>
          <div style={{marginLeft: 100, marginRight: 100}}>
              <input
                type="text"
                placeholder="Enter github username ,then press ENTER"
                onKeyUp={this.onKeyUp}  />
              <p>{this.state.userInfo}</p>
          </div>

        </div>
      </div>
    );
  }
}

export default App;
