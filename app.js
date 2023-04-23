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

window.addEventListener("orientationchange", function () {
    var orientation = window.orientation;
    if (orientation === 90 || orientation === -90) {
        document.getElementById("image").classList.add("landscapeImg");
        document.getElementById("downloadButton").classList.add("landscapeBtn");
    } else {
        document.getElementById("image").classList.remove("landscapeImg");
        document.getElementById("downloadButton").classList.remove("landscapeBtn");
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
    const container = document.getElementById("container");

    html2canvas(container, {
        width: window.innerWidth, // 設定截圖寬度為目前視窗的寬度
        height: window.innerHeight // 設定截圖高度為目前視窗的高度
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "光耀扶輪.png";
        link.href = canvas.toDataURL();
        link.click();
    });
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