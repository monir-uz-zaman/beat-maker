class Drumkit {
    constructor() {
        this.pads = document.querySelectorAll('.pad');
        this.kickAudio = document.querySelector('.kick-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.playBtn = document.querySelector('.play');
        this.muteBtns = document.querySelectorAll('.mute');
        this.currentKick = './sounds/kick-classic.wav';
        this.currentSnare = './sounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/hihat-acoustic01.wav';
        this.tempoSlider = document.querySelector('.tempo-slider');
        this.index = 0;
        this.bpm = 420;
        this.intervalId = null;
    }
    activePad() {
        this.classList.toggle('active');
    }
    repeat() {
        let step = this.index % 8;
        const activeBar = document.querySelectorAll(`.b${step}`);
        activeBar.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2 `;
            if (bar.classList.contains('active')) {
                if (bar.classList.contains('kick-pad')) {
                    this.kickAudio.currentTime = 0;

                    this.kickAudio.play();
                }
                if (bar.classList.contains('snare-pad')) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;

                    this.hihatAudio.play();
                }
            }

        })

        this.index++;
    }
    start() {
        const interval = (60 / this.bpm) * 1000;

        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                this.repeat();


            }, interval);

        } else {
            clearInterval(this.intervalId);
            this.intervalId = null;



        }

    }
    updateBtn() {
        if (!this.intervalId) {
            this.playBtn.innerText = 'Stop';


        } else {
            this.playBtn.innerText = 'Play';



        }
    }
    mute(e) {
        //console.log(e.target);
        const muteIndex = e.target.getAttribute('data-track');
        //console.log(muteIndex);
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

        //console.log(e.target.value)
    }
    updateTempo(e) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        const playBtn = document.querySelector('.play');
        if (playBtn.classList.contains('active')) {
            this.start();


        }

    }

}





const drumkit = new Drumkit();


// Event Listener

drumkit.pads.forEach(pad => {
    pad.addEventListener('click', drumkit.activePad);
    pad.addEventListener('animationend', function () {
        //console.log(this);
        this.style.animation = "";

    });

});

drumkit.playBtn.addEventListener('click', () => {
    drumkit.updateBtn();
    drumkit.start()

});
drumkit.muteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => drumkit.mute(e));
})

drumkit.tempoSlider.addEventListener('input', e => {
    drumkit.changeTempo(e);
});
drumkit.tempoSlider.addEventListener('change', (e) => {
    drumkit.updateTempo(e);

});