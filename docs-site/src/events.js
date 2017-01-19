import Service from './Service';
const service = new Service();

export const subscriptions = (on, fire, one) => {
  on('onStartGetGitUserInfo', (username) => 
    service.getGitUserInfo(username)
     .then(info => fire(`onCompleteGetGitUserInfo`,info))
  );
}



//
