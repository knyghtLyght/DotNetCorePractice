//To prevent leaking into GLobal scope we wrap the JS
//in an anon function with jquery .ready
$(document).ready(() => {
    console.log("Hello test")

    var theForm = $("#theForm")
    theForm.hide();

    var button = $("#buyButton");
    button.on("click", () => {
        console.log("Buy item clicked")
    });

    var productInfo = $(".product-props li");
    productInfo.on("click", function () {
        console.log("You clicked on " + $(this).text());
    });

    var $loginToggle = $("#loginToggle");
    var $popupForm = $(".popup-form");

    $loginToggle.on("click", function () {
        $popupForm.toggle();
    });
});