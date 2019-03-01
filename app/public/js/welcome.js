var mic, fft, ctx;

function preload(){
  mSong = loadSound('./assets/bank.mp3');
}

function setup() {
   ctx = getAudioContext();
   mCanvas = createCanvas(windowWidth,windowHeight/3.4);
   mCanvas.parent("darkBackground");
   mAmplitude = new p5.Amplitude();//振幅
   mSong.loop();
   mSong.playMode('sustain');
   noFill();

  fft = new p5.FFT();
  mSong.connect(fft);
}

function draw() {

  clear();
   var level = mAmplitude.getLevel();
   var waveform =fft.waveform();
   var spectrum =fft.analyze();
   noFill();


   stroke(61,119,212);
   for (var i = 0; i< spectrum.length/2; i++){
    strokeWeight(random()*8);
    var y = map(waveform[i],-1,1,0,height);
    point(i*8+width/8,y);
   }

  stroke(59,154,255);
   strokeWeight(2);
   beginShape();
   for (var i = 0; i< spectrum.length/2; i++){
    vertex(i*8+width/8, map(waveform[i],-1,1,0,height));
   }
 endShape();

  stroke(20,47,180);
  strokeWeight(2);
   beginShape();
   for (var i = 0; i< spectrum.length/2; i++){
    vertex(i*8+width/8, height/4+map(waveform[i],-1,1,0,height/2));
   }
   endShape();

   stroke(49, 122, 225);
   strokeWeight(4);
    beginShape();
    for (var i = 0; i< spectrum.length/2; i++){
     vertex(i*8+width/8, height*3/8+map(waveform[i],-1,1,0,height/4));
    }
    endShape();
}


function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
