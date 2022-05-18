
//Debouncing in javascript

var count = 0;
const getData = () =>{

//calls an API and get Data
console.log("Fetching data",count++)

}

const dobounce = function (fn,d){
    let timer;
    return function(){
        let context = this;
        args = arguments;
        clearInterval(timer);
        timer = setTimeout(()=>{
            getData.apply(context,arguments)
        },d)
    }
}

const betterFunction = dobounce(getData,300)