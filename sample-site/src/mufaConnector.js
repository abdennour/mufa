import {serviceA} from './ServiceA';


export default function(on, fire) {

  on('start_getGitUserInfo', (...args) => {
    serviceA.getGitUserInfo(...args).then(response => {
      fire('success_getGitUserInfo', response);
    }).catch(error => {
      fire('fail_getGitUserInfo', error);
    });
  });
};
