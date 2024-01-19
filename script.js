function requestOrientationPermission(){
    DeviceOrientationEvent.requestPermission()
    .then(response => {
        if (!(response == 'granted')) {
            alert("Not compatible with this device. Open on a mobile device. ");
        }
    })
    .catch(console.error)
}

requestOrientationPermission();

alert("This website works best on mobile devices with gyro (otherwise use arrow keys). Press the request orientation permission button to allow gyro. ")

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

if(window.innerHeight < window.innerWidth && window.mobileCheck){
    alert("Please hold your phone vertically and right side up! (Consider locking your screen rotation)");
}
window.addEventListener("orientationchange", function() {
    // Announce the new orientation number
    if (window.screen.orientation.type!="portrait-primary") {
        alert("Please hold your phone vertically and right side up! (Consider locking your screen rotation)");
    }
}, false);

const g = -9.81;
const mass = 2.5; 
const muk = 0.15; 
const mus = 0.04; 
const collision_eff = 0.90; 
const arrowInc = 5; 

let xpos = 0; 
let ypos = 0; 

let xvel = 0; 
let yvel = 0; 

let xacc = 0; 
let yacc = 0; 

let alpha = 0;  // Assuming phone is flat on back, rotating the plane chnages this value
let beta  = 0;   // Tilting forward makes this neghative, back makes it positve (|beta| < 180)
let gamma = 0;  // Left is negative, right is positive

let baselinealpha = 0; 
let baselineBeta = 0; 
let baselineGamma = 0; 

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
    alpha    = event.alpha;  // Assuming phone is flat on back, rotating the plane chnages this value
    beta     = event.beta;   // Tilting forward makes this neghative, back makes it positve (|beta| < 180)
    gamma    = event.gamma;  // Left is negative, right is positive

    document.getElementById("alpha").innerHTML=alpha; 
    document.getElementById("beta").innerHTML=beta; 
    document.getElementById("gamma").innerHTML=gamma; 
    // Do stuff with the new orientation data

    xacc = -g * Math.sin((gamma-baselineGamma) * (Math.PI/180)); 
    yacc = -g * Math.sin((beta-baselineBeta)  * (Math.PI/180)); 

    document.getElementById("xacc").innerHTML=xacc; 
    document.getElementById("yacc").innerHTML=yacc; 
}

function calibrate() {
    baselinealpha = alpha; 
    baselineBeta = beta; 
    baselineGamma = gamma; 

}

function updatePosition() {
    const m = document.getElementById("m"); 
    
    document.getElementById("mus").innerHTML=mus*g; 
    document.getElementById("muk").innerHTML=muk*g; 

    //if ((Math.floor(xvel) != 0) || (Math.abs(xacc) > (mus*g))){ 
    if (Math.abs(xvel)>0){
        let kfric = muk*g;  
        if (xvel<0) {kfric*=-1;}

        xvel += (xacc + kfric) * 3/200; 
    } else if (Math.abs(xacc) > Math.abs(mus*g)){
        let kfric = muk*g;  
        if (xvel<0) {kfric*=-1;}

        xvel += (xacc + kfric) * 3/200; 
    }

    if (Math.abs(yvel)>0){ 
        let kfric = muk*g;  
        if (yvel<0) {kfric*=-1;}
        yvel += (yacc + kfric) * 3/200; 
    } else if (Math.abs(yacc) > Math.abs(mus*g)) {
        let kfric = muk*g;  
        if (yvel<0) {kfric*=-1;}
        yvel += (yacc + kfric) * 3/200; s
    }

    document.getElementById("xvel").innerHTML=xvel; 
    document.getElementById("yvel").innerHTML=yvel; 

    xpos += xvel; 
    ypos += yvel; 

    m.style.marginLeft = xpos + "px"; 
    m.style.marginTop = ypos + "px"; 

    if ((xpos + m.naturalWidth > window.innerWidth) || (xpos< 0)) {
        xvel*=(-1 * collision_eff); 
        if (xpos< 0) {xpos = 1;}
        if (xpos + m.naturalWidth > window.innerWidth) {
            xpos = window.innerWidth - m.naturalWidth
        }
    }
    if ((ypos + m.naturalHeight > window.innerHeight) || (ypos< 0)) {
        yvel*=(-1 * collision_eff); 
    }


}

setInterval(updatePosition, 15);


/*
window.addEventListener("keydown", function (event) {
    console.log(event)
    // The parameter event is of the type KeyboardEvent
  	if (event.key === "ArrowUp"&& beta>-90) {
        beta-=arrowInc
    }
    if (event.key === "ArrowDown" && beta<90) {
        beta+=arrowInc
    }
    if (event.key === "ArrowRight" && gamma<90) {
        gamma+=arrowInc;
    }
    if (event.key === "ArrowLeft" && gamma>-90) {
        gamma-=arrowInc
    }
    console.log(beta)
    console.log(gamma)

    document.getElementById("alpha").innerHTML=alpha; 
    document.getElementById("beta").innerHTML=beta; 
    document.getElementById("gamma").innerHTML=gamma; 
    // Do stuff with the new orientation data

    xacc = -g * Math.sin((gamma-baselineGamma) * (Math.PI/180)); 
    yacc = -g * Math.sin((beta-baselineBeta)  * (Math.PI/180)); 

    document.getElementById("xacc").innerHTML=xacc; 
    document.getElementById("yacc").innerHTML=yacc; 
});

*/
window.addEventListener("keyup", function (event) {
    console.log(event)
    // The parameter event is of the type KeyboardEvent
  	if (event.key === "ArrowUp") {
        beta=0;
    }
    if (event.key === "ArrowDown") {
        beta=0;
    }
    if (event.key === "ArrowRight" ) {
        gamma=0;
    }
    if (event.key === "ArrowLeft" ) {
        gamma=0;
    }
    console.log(beta)
    console.log(gamma)

    document.getElementById("alpha").innerHTML=alpha; 
    document.getElementById("beta").innerHTML=beta; 
    document.getElementById("gamma").innerHTML=gamma; 
    // Do stuff with the new orientation data

    xacc = -g * Math.sin((gamma-baselineGamma) * (Math.PI/180)); 
    yacc = -g * Math.sin((beta-baselineBeta)  * (Math.PI/180)); 

    document.getElementById("xacc").innerHTML=xacc; 
    document.getElementById("yacc").innerHTML=yacc; 
});

// Define an object to store the state of pressed keys
var pressedKeys = {};

window.addEventListener("keydown", function (event) {
    pressedKeys = {};
    pressedKeys[event.key] = true;

    handleKeys();
});

function handleKeys() {
    // Check the state of each key and update accordingly
    if (pressedKeys["ArrowUp"] && beta > -90) {
        beta -= arrowInc;
    }
    if (pressedKeys["ArrowDown"] && beta < 90) {
        beta += arrowInc;
    }
    if (pressedKeys["ArrowRight"] && gamma < 90) {
        gamma += arrowInc;
    }
    if (pressedKeys["ArrowLeft"] && gamma > -90) {
        gamma -= arrowInc;
    }

    // Update the orientation data and perform other actions
    // ...

    // Update the displayed values
    document.getElementById("alpha").innerHTML = alpha;
    document.getElementById("beta").innerHTML = beta;
    document.getElementById("gamma").innerHTML = gamma;

    xacc = -g * Math.sin((gamma - baselineGamma) * (Math.PI / 180));
    yacc = -g * Math.sin((beta - baselineBeta) * (Math.PI / 180));

    document.getElementById("xacc").innerHTML = xacc;
    document.getElementById("yacc").innerHTML = yacc;
}
