import {serviceA} from './ServiceA';

const services = [
  serviceA
];

export default function(on, fire) {
  services.forEach((instance) => {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance));

    methods.forEach(methodName => {
      on('start_'+methodName, (...args) => {
        instance[methodName](...args).then(response => {
          fire('success_'+methodName, response);
        }).catch(error => {
          fire('fail_'+methodName, error);
        });
      });
    });
  });

};
