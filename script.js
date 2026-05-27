const radarCanvas =
  document.getElementById("radarCanvas");

const radarCtx =
  radarCanvas.getContext("2d");

radarCanvas.width = 500;
radarCanvas.height = 500;

const spectrumCanvas =
  document.getElementById("spectrumCanvas");

const spectrumCtx =
  spectrumCanvas.getContext("2d");

spectrumCanvas.width = 400;
spectrumCanvas.height = 220;

const beamCanvas =
  document.getElementById("beamCanvas");

const beamCtx =
  beamCanvas.getContext("2d");

beamCanvas.width = 400;
beamCanvas.height = 220;

// SLIDERS
const freqSlider =
  document.getElementById("freqSlider");

const angleSlider =
  document.getElementById("angleSlider");

const arraySlider =
  document.getElementById("arraySlider");

const freqValue =
  document.getElementById("freqValue");

const angleValue =
  document.getElementById("angleValue");

const arrayValue =
  document.getElementById("arrayValue");

let sweepAngle = 0;

// UPDATE UI
freqSlider.addEventListener("input", () => {

  freqValue.innerText =
    freqSlider.value;
});

angleSlider.addEventListener("input", () => {

  angleValue.innerText =
    angleSlider.value;
});

arraySlider.addEventListener("input", () => {

  arrayValue.innerText =
    arraySlider.value;
});

// RADAR ANIMATION
function drawRadar() {

  radarCtx.clearRect(
    0,
    0,
    radarCanvas.width,
    radarCanvas.height
  );

  const centerX =
    radarCanvas.width / 2;

  const centerY =
    radarCanvas.height / 2;

  const radius = 200;

  radarCtx.strokeStyle = "#22c55e";

  radarCtx.lineWidth = 2;

  // CIRCLES
  for(let i = 1; i <= 4; i++) {

    radarCtx.beginPath();

    radarCtx.arc(
      centerX,
      centerY,
      radius * (i / 4),
      0,
      Math.PI * 2
    );

    radarCtx.stroke();
  }

  // SWEEP
  radarCtx.beginPath();

  radarCtx.moveTo(centerX, centerY);

  radarCtx.lineTo(

    centerX +
    radius *
    Math.cos(sweepAngle),

    centerY +
    radius *
    Math.sin(sweepAngle)
  );

  radarCtx.strokeStyle = "#38bdf8";

  radarCtx.lineWidth = 4;

  radarCtx.stroke();

  sweepAngle += 0.02;

  requestAnimationFrame(drawRadar);
}

// SPECTRUM
function drawSpectrum() {

  spectrumCtx.clearRect(
    0,
    0,
    spectrumCanvas.width,
    spectrumCanvas.height
  );

  for(let i = 0; i < 50; i++) {

    const barHeight =
      Math.random() * 180;

    spectrumCtx.fillStyle =
      "#38bdf8";

    spectrumCtx.fillRect(

      i * 8,

      220 - barHeight,

      6,

      barHeight
    );
  }

  requestAnimationFrame(drawSpectrum);
}

// BEAMFORMING
function drawBeam() {

  beamCtx.clearRect(
    0,
    0,
    beamCanvas.width,
    beamCanvas.height
  );

  const angle =
    angleSlider.value;

  beamCtx.strokeStyle =
    "#22c55e";

  beamCtx.lineWidth = 3;

  beamCtx.beginPath();

  beamCtx.moveTo(50, 180);

  beamCtx.lineTo(

    300 +
    angle * 1.5,

    40
  );

  beamCtx.stroke();

  // ANTENNA ELEMENTS
  const elements =
    parseInt(arraySlider.value);

  for(let i = 0; i < elements; i++) {

    beamCtx.fillStyle =
      "#38bdf8";

    beamCtx.beginPath();

    beamCtx.arc(

      50 + i * 10,

      180,

      4,

      0,

      Math.PI * 2
    );

    beamCtx.fill();
  }

  requestAnimationFrame(drawBeam);
}

// START
drawRadar();

drawSpectrum();

drawBeam();