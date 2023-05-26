const img = Array.from(document.getElementsByTagName("img"));
let overlay = document.getElementsByClassName("overlay")[0];
let edit = document.getElementsByClassName("edits")[0];
let display = document.getElementById("display");
let display2 = document.getElementById("display2");
let brightnessBtn = document.getElementById("brightness");
let rotateOpt = Array.from(document.querySelectorAll(".rotate button"));
let getColor = document.getElementById("getcolor");
let redButton = document.getElementById("red-button");
let blueButton = document.getElementById("blue-button");
let greenButton = document.getElementById("green-button");
let grayScaleButton = document.getElementById("grayscale");
let element = document.getElementsByClassName("element")[0];
let flipHorizontal = 1;
let flipVertical = 1;
let rotate = 0;

img.forEach((item) => {
  item.addEventListener("click", () => {
    display.src = img[img.indexOf(item)].src;
    display2.src = img[img.indexOf(item)].src;

    overlay.classList.remove("hide");
    //increase brightness
    brightnessBtn.addEventListener("click", () => {
      display2.style.filter = "brightness(200%)";
      img[img.indexOf(item)].style.filter = "brightness(200%)";
      display.style.filter = "brightness(200%)";
    });
    // rotate object
    rotateOpt.forEach((object) => {
      object.addEventListener("click", () => {
        if (object.id === "left") {
          rotate = rotate - 90;
          display2.style.transform = `rotate(${rotate}deg)`;
          item.style.transform = `rotate(${rotate}deg)`;
        } else if (object.id === "right") {
          rotate = rotate + 90;
          display2.style.transform = `rotate(${rotate}deg)`;
          item.style.transform = `rotate(${rotate}deg)`;
        } else if (object.id === "horizontal") {
          flipHorizontal = flipHorizontal === 1 ? -1 : 1;
          display2.style.transform = `scale(${flipHorizontal}, ${flipVertical})`;
          item.style.transform = `scale(${flipHorizontal}, ${flipVertical})`;
        } else {
          flipVertical = flipVertical === 1 ? -1 : 1;
          display2.style.transform = `scale(${flipHorizontal}, ${flipVertical})`;
          item.style.transform = `scale(${flipHorizontal}, ${flipVertical})`;
        }
      });
    });
    //red button
    redButton.addEventListener("click", () => {
      display2.style.filter = "hue-rotate(180deg)";
      img[img.indexOf(item)].style.filter = "hue-rotate(180deg)";
      display.style.filter = "hue-rotate(180deg)";
    });

    //blue button
    blueButton.addEventListener("click", () => {
      display2.style.filter = "hue-rotate(0deg)";
      img[img.indexOf(item)].style.filter = "hue-rotate(0deg)";
      display.style.filter = "hue-rotate(0deg)";
    });

    getColor.addEventListener("click", () => {
      getColorFunc(item);
    });

    grayScaleButton.addEventListener("click", () => {
      item.style.filter = "grayscale(100%)";
      display2.style.filter = "grayscale(100%)";
    });

    //reset filters
    reset.addEventListener("click", () => {
      item.style.filter = "none";
      display2.style.filter = "none";
      display.style.filter = "none";
    });
  });
});

let spanX = document.getElementById("X");
spanX.addEventListener("click", () => {
  overlay.classList.add("hide");
  edit.classList.add("hide");
  display.classList.remove("hide");
  let brightness = 100;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  display2.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  display2.style.filter = `brightness(${brightness}%)`;
  display.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  display.style.filter = `brightness(${brightness}%)`;
});

console.log(edit);
let spanFilter = document.getElementById("filter");
spanFilter.addEventListener("click", () => {
  edit.classList.toggle("hide");
  display.classList.toggle("hide");
});

function getColorFunc(img) {
  console.log(img);
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;
  let redCount = 0;
  let greenCount = 0;
  let blueCount = 0;
  for (let i = 0; i < data.length; i += 4) {
    let red = data[i];
    let green = data[i + 1];
    let blue = data[i + 2];
    if (red > Math.max(green, blue)) {
      redCount++;
    } else if (green > Math.max(red, blue)) {
      greenCount++;
    } else if (blue > Math.max(red, green)) {
      blueCount++;
    }
  }
  let totalCount = redCount + greenCount + blueCount;
  let redPercentage = Math.round((redCount / totalCount) * 100);
  let greenPercentage = Math.round((greenCount / totalCount) * 100);
  let bluePercentage = Math.round((blueCount / totalCount) * 100);
  var result;
  if (redPercentage > 50) {
    result = "reddish";
  } else if (bluePercentage > 50) {
    result = "blueish";
  } else if (greenPercentage > 50) {
    result = "greenish";
  } else {
    result = "not clearly reddish, blueish or greenish";
  }

  element.innerHTML = `<p>The image is ${result}</p>`;
  element.classList.remove("hide");
  setTimeout(() => {
    element.classList.add("hide");
  }, 3000);
}
