var timer = document.getElementById("counter");
var div = document.getElementById("stopwatch");
var min = 0;
var sec = 0;
var m_sec = 0;
var new_timer = "";
var timerInterval;
var isRunning = false;
var stopButton;
var flags = [];
var flagsDiv = document.getElementById("flags");

function addZeros(val){
    if(val<10){
        return "0" + val.toString();
    }else{
        return val.toString();
    }
}

function increase_time(min, sec, m_sec) {
    // Do not re-declare min, sec, m_sec here
    if (m_sec >= 99) {
      m_sec = 0;
      sec += 1;
    } else {
      m_sec += 1;
    }
  
    if (sec >= 59) {
      min += 1;
      sec = 0;
    }
  
    new_timer = addZeros(min) + ":" + addZeros(sec) + ":" + addZeros(m_sec);
    timer.textContent = new_timer;

    window.min = min;
    window.sec = sec;
    window.m_sec = m_sec;
}

function flag(){
    var new_flag = document.createElement("h3");
    new_flag.setAttribute("class", "flag");
    new_flag.textContent = addZeros(min) + ":" + addZeros(sec) + ":" + addZeros(m_sec);
    div.appendChild(stopButton);
}

document.getElementById("start").addEventListener("click", function() {
    if(!isRunning){
        document.getElementById("start").textContent = "Flag";
        clearInterval(timerInterval);

        // Set a new interval
        timerInterval = setInterval(function () {
            increase_time(window.min, window.sec, window.m_sec);
        }, 10);
        isRunning = true;

        if(stopButton == null){
            stopButton = document.createElement("button");
            stopButton.setAttribute("id", "stop");
            stopButton.textContent = "Pause";
            div.appendChild(stopButton);
            stopButton.addEventListener("click", function(){
                if(isRunning){
                    //document.getElementById("stop").textContent = "Reset";
                    clearInterval(timerInterval);
                    isRunning = false;
                    document.getElementById("start").textContent = "Resume";
                    stopButton.textContent = "Reset";

                }else{
                    min = 0;
                    m_sec = 0;
                    sec = 0;
                    document.getElementById("start").textContent = "Start";
                    div.removeChild(stopButton);
                    stopButton = null;
                    console.log(flags);
                    for(var i=0; i<flags.length;i++){
                        flagsDiv.removeChild(flags[i]);
                    }
                    flags = [];
                    timer.textContent = addZeros(min) + ":" + addZeros(sec) + ":" + addZeros(m_sec);
                }
            });
        }else{
            stopButton.textContent = "Stop";
        }
    }else{
        var new_flag = document.createElement("h3");
        new_flag.setAttribute("class", "flag");
        new_flag.textContent = addZeros(min) + ":" + addZeros(sec) + ":" + addZeros(m_sec);
        new_flag.setAttribute("class", "flag");
        flagsDiv.appendChild(new_flag);
        flags.push(new_flag);
    }
});
