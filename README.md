# mis
simple events

## Usage

### Node.js

**mis** exports a single function which can be used to bind callbacks local events.

```Javascript
var mis=require("mis");

var en=mis();

// create a callback stack for an 'each' event:
en('each',function(msg){
    console.log(msg);
});

// do something with the resulting callback:
var count=0;
setInterval(function(){
    en('each')(count++);
},1000);
```

### In the browser

```HTML
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" charset="UTF-8">
        <script src="mis.js"></script>
<body>
<script>
// call mis() as many times as you want.
// It returns a new, unique set of stacks each time.
var en=mis();

// calling it with no arguments returns its internal state:
    // hooks (object), stacks (object), place(function)

// place initializes a stack with whatever name you pass
// once initialized, it's safe to call that stack
    // (your own functions still have to work, though)
en().place('each');

var countDown=10;
var interval=window.setInterval(function(){
    en('each')(countDown--);
},1000);

// add a function to the list to be called on each iteration of the interval
en('each',function(n){
    console.log(n);
});

en('done',function(){
    window.clearInterval(interval);
    console.log("Blast off!");
});

// push as many as you want
en('each',function(msg){
    if(countDown == 0){
        en('done')();
    }
});
</script>
```

