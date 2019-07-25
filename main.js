noise.seed(Math.random())
let t = 0
let container = document.getElementById('container')
let el = document.getElementById('audio')


const perlinMovement = () => {

        setInterval(() => {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            for (let y = 0; y < 1; y += 0.01) {
                let bloc = document.createElement("div"); 
                bloc.className = 'test-box'
                bloc.style.height = (1 - noise.perlin2(t, y*5)) * volume +'px'
                bloc.style.left =  y * 50 +'%'
                container.appendChild(bloc); 

            }
            t +=0.005
        } , 10

        )
        

}





el.addEventListener('play', () => {
    playSound()
})


 function playSound() {
    var ctx = new AudioContext();
    var audioSrc = ctx.createMediaElementSource(el);
    var analyser = ctx.createAnalyser();


    analyser.smoothingTimeConstant = 0.3;
    analyser.fftSize = 1024;

    audioSrc.connect(analyser);
    audioSrc.connect(ctx.destination);
   
    var frequencyData = new Uint8Array(analyser.frequencyBinCount);
   
    function renderFrame() {
       requestAnimationFrame(renderFrame);
       // update data in frequencyData
       analyser.getByteFrequencyData(frequencyData);
       volume = Math.floor(Math.average(frequencyData));
    }


    renderFrame();
    perlinMovement()


  };




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


