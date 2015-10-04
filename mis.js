if(typeof module !== 'undefined') module.exports=mis;

function mis(opt){
    opt=opt||{};
    var hooks={};
    var stacks={};

    var en;

    var place=function(hook){
        stacks[hook]=stacks[hook]||[];
        hooks[hook]=hooks[hook]||function(msg){
            stacks[hook].forEach(function(cb,i,z){
                cb(msg,i,z);
            });
        };
        return en;
    };

    en=function(hook,callback){
        if(typeof callback === 'undefined'){
            if(hook && stacks[hook]){
                // one argument?
                return hooks[hook];
            }else{
                // zero arguments?
                return {
                    hooks:hooks,
                    stacks:stacks,
                    opt:opt,
                    place:place,
                };
            }
        }else{
            // two arguments, initialize first, just in case.
            place(hook);
            if(typeof callback === 'function'){
                stacks[hook].push(callback);
            }else{
                stacks[hook].push(function(msg,i,z){
                    console.log("[EN %s]: (%s,%s,%s,)",hook,msg,i);
                });
            }
        }
        return en;
    };
    return en;
};
