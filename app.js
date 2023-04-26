const video = document.querySelector("#videoElement");
const image = document.getElementById("image");
const downloadButton = document.getElementById("downloadButton");

this.startStream();

let isDragging = false;
let initialX;
let initialY;
let imageWidth = image.clientWidth;
let imageHeight = image.clientHeight;
let originalScale = 1;
let newScale = 1;

// image.addEventListener("touchstart", dragStart);
// image.addEventListener("touchend", dragEnd);
// image.addEventListener("touchmove", drag);
// image.addEventListener("gesturestart", gestureStart);
// image.addEventListener("gestureend", gestureEnd);
// image.addEventListener("gesturechange", gestureChange);

downloadButton.addEventListener("click", function () {
    downloadContainerAsImage();
});

let vw = 0.4;

window.addEventListener("orientationchange", function () {
    var orientation = window.orientation;
    if (orientation === 90 || orientation === -90) {
        document.getElementById("image").classList.add("landscapeImg");
        document.getElementById("downloadButton").classList.add("landscapeBtn");
        vw = 0.25;
    } else {
        document.getElementById("image").classList.remove("landscapeImg");
        document.getElementById("downloadButton").classList.remove("landscapeBtn");
        vw = 0.4;
    }
});

function startStream() {
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: { exact: "environment" } } })
            .then(function (stream) {
                video.srcObject = stream;
            })
            .catch(function (err0r) {
                console.log("Something went wrong!");
            });
    }
}

function downloadContainerAsImage() {
    const video = document.getElementById("videoElement");
    const image = document.getElementById("image");

    // 創建 canvas 元素
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 獲取 canvas 的上下文
    var ctx = canvas.getContext('2d');

    const imageWidth = canvas.width * vw * 0.9;
    const imageHeight = canvas.width * vw / image.width * image.height * 0.9;

    // 捕捉畫面並將其渲染到 canvas 上
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, (canvas.width - imageWidth) / 2, (canvas.height - imageHeight) / 2, imageWidth, imageHeight);

    // 將 canvas 轉換為圖像
    var savingImage = new Image();
    savingImage.src = canvas.toDataURL('Rotary_Light_Up/jpeg');

    // 創建一個下載鏈接，將圖像下載到手機本地儲存空間中
    var link = document.createElement('a');
    link.download = 'video-screenshot.jpg';
    link.href = savingImage.src;
    link.click();
}

function dragStart(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    isDragging = true;
}

function dragEnd(e) {
    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        let currentX = e.touches[0].clientX;
        let currentY = e.touches[0].clientY;

        let xOffset = currentX - (initialX + imageWidth / 2);
        let yOffset = currentY - (initialY + imageHeight);
        setTranslate(xOffset, yOffset, image);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform =
        "translate3d(" + xPos + "px, " + yPos + "px, 0) scale(" + newScale + ")";
}

function gestureStart(e) {
    e.preventDefault();
}

function gestureChange(e) {
    e.preventDefault();
    newScale = originalScale * e.scale;
    setTranslate(currentX, currentY, image);
}

function gestureEnd(e) {
    originalScale = newScale;
}