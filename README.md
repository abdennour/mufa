[![Build Status](https://travis-ci.org/abdennour/mufa.svg?branch=master)](https://travis-ci.org/abdennour/mufa)
[![Coverage Status](https://coveralls.io/repos/github/abdennour/mufa/badge.svg?branch=master)](https://coveralls.io/github/abdennour/mufa?branch=master)

# Overview :

  Mufa is an abbreviation of مُفَوَّضْ (Mufawwad) which is an arabic word and it means DELEGATOR.
  It is designed to separate layers of your application via sub/pub pattern ; where there are two actors : Subscriber (listener) and publisher (notifier).

  See [documetation](https://abdennour.github.io/mufa/) .

# Install

```bash
npm install mufa --save;
```

or, use as CDN :

```html
 <script
   src="https://rawgit.com/abdennour/mufa/master/cdn/mufa-latest.js"
   type="text/javascript">
</script>
```

# Example :

```js
  import {on, fire} from 'mufa';
  // publish
  setTimeout(() => {
     fire('sendEmoji', '👏');
  }, 1000)  ;
  // subscribe
  on('sendEmoji', (emoji) => console.log(emoji));
```

#Documentation :

See [here](https://abdennour.github.io/mufa/) .

# License:

MIT .
