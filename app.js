'use strict'


var productSection = document.getElementById("productSection");
var products = [];
var totalClicks = 0;


var leftImageIndex;
var middleImageIndex;
var rightImageIndex;


var products25 = [
    ["bag", "image/bag.jpg"],
    ["banana", "image/banana.jpg"],
    ["bathroom", "image/banana.jpg"],
    ["boots", "image/boots.jpg"],
    ["breakfast", "image/breakfast.jpg"],
    ["bubblegum", "image/bubblegum.jpg"],
    ["chair", "image/chair.jpg"],
    ["cthulhu", "image/cthulhu.jpg"],
    ["dog-duck", "image/dog-duck.jpg"],
    ["dragon", "image/dragon.jpg"],
    ["pen", "image/pen.jpg"],
    ["pet-sweep", "image/pet-sweep.jpg"],
    ["scissors", "image/scissors.jpg"],
    ["shark", "image/shark.jpg"],
    ["sweep", "image/sweep.png"],
    ["tauntaun", "image/tauntaun.jpg"],
    ["unicorn", "image/unicorn.jpg"],
    ["usb", "image/usb.gif"],
    ["water-can", "image/water-can.jpg"],
    ["wine-glass", "image/wine-glass.jpg"]

]


function Product(name, path) {
    this.name = name
    this.path = path;

    this.numberOfClicks = 0;
    this.numberOfTimesShown = 0;
    

    products.push(this);
}
Product.prototype.percentage = function(){
    var total = this.numberOfClicks / this.numberOfTimesShown;
    return total
};


for (var i = 0; i < products25.length; i++) {
    new Product(products25[i][0], products25[i][1]);
}
generateRandomImage()
console.log(products)

productSection.addEventListener('click', productClickHandler);



function generateRandomImage() {
    var leftImage = document.getElementById("leftImage");
    var middleImage = document.getElementById("middleImage");
    var rightImage = document.getElementById("rightImage");
    leftImageIndex = generateRandomNumber();
    middleImageIndex = generateRandomNumber();
    rightImageIndex = generateRandomNumber();
    while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex) {
        leftImageIndex = generateRandomNumber();
        middleImageIndex = generateRandomNumber();
        rightImageIndex = generateRandomNumber();

    }

    var leftPath = products[leftImageIndex].path;
    var middlePath = products[middleImageIndex].path;
    var rightPath = products[rightImageIndex].path;

    products[leftImageIndex].numberOfTimesShown += 1;
    products[middleImageIndex].numberOfTimesShown += 1;
    products[rightImageIndex].numberOfTimesShown += 1;

    leftImage.setAttribute('src', leftPath);
    middleImage.setAttribute('src', middlePath);
    rightImage.setAttribute('src', rightPath);

}


function generateRandomNumber() {
    return Math.floor(Math.random() * products.length);
}

function productClickHandler() {

    if (totalClicks < 25) {
        var clickedElement = event.target;
        var clickedElementId = clickedElement.id;

        if (clickedElementId === 'leftImage' || clickedElementId === 'middleImage' || clickedElementId === 'rightImage') {
            totalClicks += 1;

            if (clickedElementId === 'leftImage') {
                products[leftImageIndex].numberOfClicks += 1;
            }

            if (clickedElementId === 'middleImage') {
                products[middleImageIndex].numberOfClicks += 1;
            }

            if (clickedElementId === 'rightImage') {
                products[rightImageIndex].numberOfClicks += 1;
            }
            generateRandomImage()

        }
    } else {
        generateUserMessage();
        productSection.removeEventListener('click', productClickHandler);
    }
}
function generateUserMessage() {
    var ulElement = document.getElementById('result');

    for (let index = 0; index < products.length; index++) {
        var listItem = document.createElement('li');
        // `name of the image` has been shown `number of times it was displayed` and clicked `number of times it has been clicked`
        listItem.textContent = products[index].name + ' has been shown ' + products[index].numberOfTimesShown + ' and has been clicked ' + products[index].numberOfClicks;
        ulElement.appendChild(listItem);
    }

    
}