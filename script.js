
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const placeholderText = document.getElementById("placeholderText");

const fileInput = document.getElementById("fileInput");
const chooseFileBtn = document.getElementById("chooseFileBtn")

const brightnessInput = document.getElementById("brightness-input");
const brightnessValue = document.getElementById("brightnessValue")
const contrastInput = document.getElementById("contrast-input");
const contrastValue = document.getElementById("contrastValue");
const saturationInput = document.getElementById("saturation-input");
const saturationValue = document.getElementById("saturationValue");
const blurInput = document.getElementById("blur-input");
const blurValue = document.getElementById("blurValue");
const grayscaleBtn = document.getElementById("grayscaleBtn");
const sepiaBtn = document.getElementById("sepiaBtn");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadImgBtn");

let image = new Image();

let sepia = false;

chooseFileBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = () => {
        image.src = reader.result;
    }

    reader.readAsDataURL(file); 
});

image.onload = () => {
    canvas.height = image.height;
    canvas.width = image.width;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    placeholderText.classList.add('hidden');
    canvas.classList.remove('hidden');
    downloadBtn.disabled = false;
}

function applyFilters() {
    const brightnessValue = brightnessInput.value;
    const contrastValue = contrastInput.value;
    const blurValue = blurInput.value;
    const saturationValue = saturationInput.value;
    const sepiaValue = sepia ? 100 : 0;

    ctx.filter = `brightness(${brightnessValue}%) contrast(${contrastValue}%) saturate(${saturationValue}%) blur(${blurValue}px) sepia(${sepiaValue}%)`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}

grayscaleBtn.addEventListener('click', () => {
    saturationInput.value = 0;
    saturationValue.textContent = 0;
    applyFilters();
});

sepiaBtn.addEventListener('click', () => {
    sepia = !sepia;

    if(sepia) {
        sepiaBtn.style.backgroundColor = '#3e537cff';
    } else {
        sepiaBtn.style.backgroundColor = '#1E293B';
    }
    applyFilters();
});

resetBtn.addEventListener('click', () => {
    brightnessInput.value = 100;
    saturationInput.value = 100;
    contrastInput.value = 100;
    blurInput.value = 0;
    sepia = false;
    sepiaBtn.style.backgroundColor = '#607b8f';
    applyFilters();
})

downloadBtn.addEventListener('click', () => {
    const link = document.createElement("a");
    
    link.download = "edited-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
})

brightnessInput.addEventListener('input', () => {
    brightnessValue.textContent = `${brightnessInput.value}`;
    applyFilters();
});
contrastInput.addEventListener('input', () => {
    contrastValue.textContent = `${contrastInput.value}`;
    applyFilters();
});
blurInput.addEventListener('input', () => {
    blurValue.textContent = `${blurInput.value}`;
    applyFilters();
});
saturationInput.addEventListener('input', () => {
    saturationValue.textContent = `${saturationInput.value}`;
    applyFilters();
});