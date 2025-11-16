/** @format */

let boutonMenu = document.querySelector(".boutonMenu");
let closeMenu = document.querySelector(".closeMenu");
let mobile_navigation = document.querySelector(".mobile_navigation");

boutonMenu.addEventListener("click", () => {
  mobile_navigation.classList.add("mobile_navigation_js_class");
});
closeMenu.addEventListener("click", () => {
  mobile_navigation.classList.remove("mobile_navigation_js_class");
});

let linkMobile = document.querySelectorAll(".linkMobile");
for (let i = 0; i < linkMobile.length; i++) {
  linkMobile[i].addEventListener("click", () => {
    mobile_navigation.classList.remove("mobile_navigation_js_class");
  });
}
