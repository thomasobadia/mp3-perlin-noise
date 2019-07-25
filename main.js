noise.seed(Math.random())
let t = 0
let container = document.getElementById('container')
let el = document.getElementById('audio')


const perlinMovement = (analyser,data) => {

    let linesArray = createLines() 
    setInterval(() => {
        // while (container.firstChild) {
        //     container.removeChild(container.firstChild);
        // }
        console.log(linesArray)
        let volume = getVolume(analyser,data)

        for(let y = 0; y <linesArray.length ; y++){
            let range = (1 - noise.perlin2(t, y*0.05)) * volume
            let height = scale(range, 0, 60, 10, 20 )
            linesArray[y].setAttribute('x2', height)
        }

        t +=0.001
    } , 10

    )
    

}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



el.addEventListener('play', () => {
    initSound ()
})




function initSound (){


    var ctx = new AudioContext();
    var audioSrc = ctx.createMediaElementSource(el);
    var analyser = ctx.createAnalyser();
    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 1024;

    audioSrc.connect(analyser);
    audioSrc.connect(ctx.destination);
   
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);


    perlinMovement(analyser,frequencyData)
   
}

function createLines () {

    let lines = []
    for (let y = 0; y < 1; y += 0.01) {
        let line = document.createElementNS('http://www.w3.org/2000/svg','line');
        line.setAttribute('transform',"rotate(" + y * 360 + ")")
        line.setAttribute('x1','10')
        line.setAttribute('y1','0')
        line.setAttribute('y2','0')
        line.setAttribute('x2', 16)
        container.appendChild(line); 
        lines.push(line)
    }
    return lines

}

function getVolume(analyser, data){
    analyser.getByteFrequencyData(data);
    volume = Math.floor(Math.average(data));

    return volume

}






Math.average = function(arguments) {
    var numbers;
    if (arguments[0] instanceof Array) {
        numbers = arguments[0];
    }
    else if (typeof arguments[0] == "number") {
        numbers = arguments;
    }
    var sum		= 0;
    var average	= 0;
    for (var i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }
    average = sum / numbers.length;
    return average;
}


