class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';
        this.index = 0;
        this.bpm = 1000;
        this.intervalId = null;
        this.selects = document.querySelectorAll('select');
        this.muteBtns = document.querySelectorAll('.mute');
        this.tempoSlider = document.querySelector('.tempo-slider');
    }
    activePad() {
        this.classList.toggle('active');
    }
    repeat() {
        let step = this.index % 8;
        // here the index keeps on inreasing but the step will be reset to 0 once this.index%8 is 0. For more info try to console the following console output. It will keep on repeating after every 1 s as said in start setinterval function

        //console.log(`the step is ${step} and the index is ${this.index}`);
        // lets loop over each bar
        const activeBars = document.querySelectorAll(`.b${step}`);
        //console.log(activeBars);
        //console.log(step);
        // loop over bar
        activeBars.forEach(bar => {

            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            //check if pads are active

            if (bar.classList.contains('active')) {
                // check each sound from which pad is active 
                if (bar.classList.contains('kick-pad')) {
                    //console.log('world');
                    // resetting the current time to 0 so that other music can play without having to wait for the previous one
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }



            }

        });
        this.index++;



    }

    //The setInterval() method, offered on the Window and Worker interfaces, repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.It returns an interval ID which uniquely identifies the interval, so you can remove it later by calling clearInterval().
    start() {
        //console.log(this)
        //console.log(this.bpm);

        //console.log(this.intervalId);
        const interval = (60 / this.bpm) * 1000;
        // here this.isintervalId gives the random number and here we are checking if it is giving random number or not  and if it is not giving  we are implying the below function. this.intervalId is false by defalult because null is false. so if(this.intervalId) means if this.intervalId is true but we have declared this.intervalId as false so below function is invoked
        if (!this.intervalId) {
            console.log('this.intervalId is runnong');
            this.intervalId = setInterval(() => {
                // we have to use the arrow function cause if we use the normal function the value of this will point to the window object. Here in case of arrow object since it does not have its own this it will point to its object

                this.repeat();
            }, interval);
        } else {
            // clear the interval if this.intervalId is intervalId . 
            clearInterval(this.intervalId);
            // resetting it to null
            console.log('clear .intervalId is runnong');
            this.intervalId = null;

        }
    }
    updateBtn() {
        // here in the initial state this.intervalId is false and as soon as we press the play button it changes the innertext to stop cause the intervalId is null
        if (!this.intervalId) {
            console.log(this.intervalId);
            this.playBtn.innerText = 'Stop';
            this.playBtn.classList.add('active');

        } else {
            console.log(this.intervalId);

            this.playBtn.innerText = 'Play';
            this.playBtn.classList.remove('active')
        }
    }
    changeSound(e) {
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch (selectionName) {
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionValue;

                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;


        }
    }
    mute(e) {
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');


        if (e.target.classList.contains('active')) {
            e.target.innerHTML = `<i class="fas fa-volume-up"></i>
            `;


            switch (muteIndex) {
                case '0': this.kickAudio.volume = 0;
                    break;
                case '1': this.snareAudio.volume = 0;
                    break;
                case '2': this.hihatAudio.volume = 0;

                    break;
            }
        } else {
            e.target.innerHTML = `<i class="fas fa-volume-mute"></i>
            `;

            switch (muteIndex) {

                case '0': this.kickAudio.volume = 1;
                    break;
                case '1': this.snareAudio.volume = 1;
                    break;
                case '2': this.hihatAudio.volume = 1;
                    break;
            }

        }
    }

    changeTempo(e) {
        const tempoText = document.querySelector('.tempo-nr');
        this.bpm = e.target.value;
        tempoText.innerText = e.target.value;

    }
    updateTempo() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains('active')) {
            console.log(this.bpm);
            this.start();
            console.log(this.bpm);

        }


    }







}




const drumkit = new Drumkit();

// event listener
drumkit.pads.forEach(pad => {
    pad.addEventListener('click', drumkit.activePad);
    // the below event handler is to first remove the anomation after all the pad in first round cause it cannot add animation on top of other in the second round
    pad.addEventListener('animationend', function () {
        this.style.animation = "";

    });

});

drumkit.playBtn.addEventListener('click', () => {
    // // //     // here we are putting it into the function and invoking it because if we simply pass the callback function as drumkit.start it means that this keyword is refering to the drumkit.playBtn instead of our drumkit.start
    drumkit.updateBtn();
    drumkit.start();
});


drumkit.selects.forEach(select => {
    select.addEventListener('change', e => {
        drumkit.changeSound(e);


    })
});


drumkit.muteBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        drumkit.mute(e);
    })
});
// input event happens only after the cursor is stopped. If we put the change event we will get many event because we will keep on mob´ving the cursor
drumkit.tempoSlider.addEventListener('input', e => {
    drumkit.changeTempo(e);
});
// every time there is a change in the tempo we want to stp the music 
drumkit.tempoSlider.addEventListener('change', e => {
    drumkit.updateTempo(e);
})