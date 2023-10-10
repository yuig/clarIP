const getData = (url) => {
    XHR = new XMLHttpRequest();
    XHR.open("GET", url, false);
    XHR.send();
    return XHR.responseText;
}

const notificationTemplate = getData("https://raw.githubusercontent.com/yuig/clarIP/main/notification.html");
const notificationSound = new Audio("https://github.com/yuig/clarIP/raw/main/notification-pretty-good.mp3");
const notifications = [];

const clearIntervalo = clearInterval;

clearInterval = (...args) =>{
    console.log(...args);
    return(clearInterval(...args));
}

class Notification{
    constructor(title,content,x,y,decay=500,state="new"){
        this.title = title;
        this.content = content;
        this.x = x;
        this.y = y;
        this.id = notifications.length;
        this.decay = decay;
        this.state = state;
        this.element = null;
        this.fading = true;
        this.notificationSound = notificationSound;
        this.createElement = () =>{
            this.element = document.createElement("div");
            this.element.innerHTML = notificationTemplate;
            this.element.style.position = "absolute";
            this.element.className = "notification";
            this.element.style.left = this.x + "px";
            this.element.style.top = this.y + "px";
            this.element.id = "notif"+this.id;
            this.opacity = 0;
            console.log(this.element.children);
            this.element.querySelectorAll("div")[0].children[1].innerHTML = this.title;
            this.element.querySelectorAll("div")[1].innerHTML = this.content;
        this.fadein = () =>{
            // console.log(this.element.style.opacity);
            this.opacity += 0.01;
            this.element.style.opacity = this.opacity;
            if (this.opacity < 1){
                this.fading = true;
                requestAnimationFrame(this.fadein);
            }else{
                this.fading = false;
            }
        }

        this.fadeout = () =>{
            this.opacity -= 0.02;
            this.element.style.opacity = this.opacity;
            if (this.opacity > 0){
                this.fading = true;
                requestAnimationFrame(this.fadeout);
            }else{
                this.fading = false;
                this.element.remove();
                delete this;
            }
        }

        this.decaying = () =>{
            console.log(this.decay);
            if(this.decay > 0 && !this.fading){
                this.decay -= 10;
            }

            if(this.decay <= 0 && !this.fading){
                this.state = "close";
            }
        }

        this.inject = () =>{
            document.body.appendChild(this.element);
            this.notificationSound.play();
            this.element.style.opacity = 0;
            this.fadein();
            
        }

        this.destroy = () =>{
            this.fadeout();
            delete this;
        }

        }
    }

}

const addNotification = (title,content,x,y,decay) => {
    const lastNotification = notifications[notifications.length-1];
    if(lastNotification){
        console.log(lastNotification.element);
        y = lastNotification.y + lastNotification.element.clientHeight + 10;
        console.log(y)
    }
    const notification = new Notification(title,content,x,y,decay);
    notification.createElement();
    notifications.push(notification);
}

window.addNotification = addNotification;


setInterval(() => {
    for(let notification of notifications){
        if(notification.state == "new"){
            notification.inject();
            notification.state = "render";
        }
        else if(notification.state == "render"){
            notification.decaying();
        }
        else if(notification.state == "close"){
            notification.destroy();
            notifications.splice(notification,1);
        }
    }
}, 10);
