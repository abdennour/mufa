import {serviceA} from './ServiceA';
import {on, fire} from 'mufa';

on('start_getGitUserInfo', (...args) => {
  serviceA.getGitUserInfo(...args).then(response => {
    fire('success_getGitUserInfo', response);
  }).catch(error => {
    fire('fail_getGitUserInfo', error);
  });
});
