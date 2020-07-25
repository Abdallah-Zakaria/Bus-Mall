'use strict'


var productSection = document.getElementById("productSection");
var products = [];
var previousData= [];

var totalClicks = 0;
var numberOfClicksList = [];
var ProductName = [];

var leftImageIndex;
var middleImageIndex;
var rightImageIndex;
var previousImageIndex = [];

var numberOfClicks= [] ;
var numberOfTimesShown = [];

// this is a list include all the products to show (images and path)
var products25 = [
    ["bag", "image/bag.jpg"],
    ["banana", "image/banana.jpg"],
    ["bathroom", "image/bathroom.jpg"],
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

// this is the main constructor to pass on it the 20 product to make them objects and push them in a list name it a products
function Product(name, path) {
    this.name = name
    this.path = path;

    this.numberOfClicks = 0;
    this.numberOfTimesShown = 0;


    products.push(this);
}

for (var i = 0; i < products25.length; i++) {
    new Product(products25[i][0], products25[i][1]);
    
}

generateRandomImage()

productSection.addEventListener('click', productClickHandler);


// this function for generated a 3 image every time you click on one of them .
// this function have a if statament that make sure to not take iamge that already show in the previous iteration.
// set every iteration a new attribute  inside the src to have a new one.
function generateRandomImage() {
    var leftImage = document.getElementById("leftImage");
    var middleImage = document.getElementById("middleImage");
    var rightImage = document.getElementById("rightImage");

    leftImageIndex = generateRandomNumber();
    middleImageIndex = generateRandomNumber();
    rightImageIndex = generateRandomNumber();



    while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex || previousImageIndex.includes(leftImageIndex) || previousImageIndex.includes(middleImageIndex) || previousImageIndex.includes(rightImageIndex)) {
        leftImageIndex = generateRandomNumber();
        middleImageIndex = generateRandomNumber();
        rightImageIndex = generateRandomNumber();



    }
    previousImageIndex = [];
    previousImageIndex.push(leftImageIndex, middleImageIndex, rightImageIndex)

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

// this function to get random number between 1 and 25 and make it floor using math.
function generateRandomNumber() {
    return Math.floor(Math.random() * products.length);
}

// this function work when any of the image get clicked will add to number of click for the clicked image plus one 
// and every iteration the three showen image will get plus one on his number of show
// this function will stay only 25 times and make the calculations each time 
// when the 25 times finish will call the chart and message to the user of the cumulative statistics of number of click and showen
// then will store the data in the local storage to use it again.
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
        populateNumberOfClicksArr()
        generateUserMessage();
        generateChart();
        storeDate();
        productSection.removeEventListener('click', productClickHandler);
    }
}
function generateUserMessage() {
    var ulElement = document.getElementById('result');

    for (let index = 0; index < products.length; index++) {
        var listItem = document.createElement('li');
        // `name of the image` has been shown `number of times it was displayed` and clicked `number of times it has been clicked`
        listItem.textContent = products[index].name + ' had ' + products[index].numberOfClicks + ' votes and was shown ' + products[index].numberOfTimesShown + " times";
        ulElement.appendChild(listItem);
    }


}

function populateNumberOfClicksArr() {
    for (let index = 0; index < products.length; index++) {
        numberOfClicksList.push(products[index].numberOfClicks);
        ProductName.push(products[index].name)
    }
}

function storeDate() {
    var dataStringify = JSON.stringify(products);
    localStorage.setItem("products", dataStringify);
}

function updateData(previousData) {
    for (let index = 0; index < products.length; index++) {
        products[index].numberOfClicks = previousData[index].numberOfClicks;
        products[index].numberOfTimesShown = previousData[index].numberOfTimesShown;
    }
}
function addPreviousData() {
    var previousData = JSON.parse(localStorage.getItem("products"))
    updateData(previousData);

}
var emptyList = [];
if(localStorage.getItem("products") !== null ){
    addPreviousData();
}

// this function is a library name chart.js
// only we pass in it the type oof chart , labels and data will shown in array 
// you can change the color of the bars 
function generateChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ProductName,
            datasets: [{
                label: '# of Clicks',
                data: numberOfClicksList,
                backgroundColor:'rgba(255, 99, 132, 0.2)' ,
                borderColor:'black' ,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }

    });
}

