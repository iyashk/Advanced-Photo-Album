let buttons = Array.from(document.querySelectorAll(".filter-class button"));
let images = Array.from(document.querySelectorAll(".box .dream img"));
buttons.forEach((item) => {
  item.addEventListener("click", () => {
    if (buttons.indexOf(item) != 0) {
      console.log(item);
      buttons.forEach((item) => {
        item.classList.remove("active");
      });

      item.classList.add("active");
      buttons[0].classList.remove("active");
      images.forEach((image) => {
        image.classList.add("hide");
      });
      images.forEach((image) => {
        let value = item.getAttribute("data-item");
        if (image.classList.contains(value)) {
          image.classList.remove("hide");
          console.log();
        }
      });
    } else {
      buttons.forEach((item) => {
        item.classList.remove("active");
      });
      buttons.forEach((item) => {
        item.classList.remove("hide");
      });
      buttons[0].classList.add("active");
      images.forEach((image) => {
        image.classList.remove("hide");
      });
    }
  });
});
