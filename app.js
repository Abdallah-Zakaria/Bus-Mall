'use strict'


var productSection = document.getElementById("productSection");
var products = [];
var totalClicks = 0;
var numberOfClicks = [];
var ProductName = [];

var leftImageIndex;
var middleImageIndex;
var rightImageIndex;
var previousImageIndex = [];


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



function generateRandomImage() {
    var leftImage = document.getElementById("leftImage");
    var middleImage = document.getElementById("middleImage");
    var rightImage = document.getElementById("rightImage");

    leftImageIndex = generateRandomNumber();
    middleImageIndex = generateRandomNumber();
    rightImageIndex = generateRandomNumber();

    console.log(previousImageIndex)

    while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex || previousImageIndex.includes(leftImageIndex) || previousImageIndex.includes(middleImageIndex) || previousImageIndex.includes(rightImageIndex) ) {
        console.log(leftImageIndex,middleImageIndex,rightImageIndex)
        console.log("have change")
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
        populateNumberOfClicksArr()
        generateUserMessage();
        generateChart();
        productSection.removeEventListener('click', productClickHandler);
    }
}
function generateUserMessage() {
    var ulElement = document.getElementById('result');

    for (let index = 0; index < products.length; index++) {
        var listItem = document.createElement('li');
        // `name of the image` has been shown `number of times it was displayed` and clicked `number of times it has been clicked`
        listItem.textContent = products[index].name + ' had ' + products[index].numberOfClicks + ' votes and was shown ' +   products[index].numberOfTimesShown + " times";
        ulElement.appendChild(listItem);
    }
    

}

function populateNumberOfClicksArr() {
    for (let index = 0; index < products.length; index++) {
        numberOfClicks.push(products[index].numberOfClicks);
        ProductName.push(products[index].name)
    }
}




function generateChart() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ProductName,
            datasets: [{
                label: '# of Clicks',
                data: numberOfClicks,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
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

