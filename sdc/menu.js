

let list = document.querySelectorAll(".navigation li");
let addressButton = document.getElementById("addressButton");
let eventButton = document.getElementById("eventButton");
let dressCodeButton = document.getElementById("dressCodeButton");

// Letter Script -------

let isInviteActive = false;
let inviteButton = document.getElementById("inviteButton");
const startBtn = document.querySelector("#start-btn");
const backboard = document.getElementById("backboard");
let intervalId = null;

// Letter Script -------

// Map Script ----------

let isAddressActive = false;
let mapContainer = document.getElementById("map-container");

// Map Script ----------

// Timeline -------

let isEventActive = false;
let timelineContai = document.querySelector("#timeline-contai");

// Timeline -------

// Dress Code -----

let isDresscodeActive = false;
let dresscode = document.querySelector("#dresscode");

// Dress Code -----


function activeLink() {
    // Bỏ active khỏi tất cả các nút
    list.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");

    let spanText = this.querySelector(".text").innerText;
    // Kiểm tra nếu nhấn vào nút "Address"
    console.log("This: ",this)

    if (spanText === "Invite") {
        isInviteActive = true; // Đặt trạng thái là active
        startBtn.style.display ="block"; 
    } else {
        isInviteActive = false; // Đặt trạng thái không active
        startBtn.style.display ="none"; 
	    backboard.style.height = "0vh";
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    if (spanText === "Address") {
        isAddressActive = true; // Đặt trạng thái là active
        mapContainer.style.display = "block";
    } else {
        isAddressActive = false; // Đặt trạng thái không active
        mapContainer.style.display = "none";
    }
    if (spanText === "Event") {
        isEventActive = true; // Đặt trạng thái là active
        timelineContai.style.display = "block";
    } else {
        isEventActive = false; // Đặt trạng thái không active
        timelineContai.style.display = "none";
    }
    if (spanText === "DressCode") {
        isDresscodeActive = true; // Đặt trạng thái là active
        dresscode.style.display = "block";
    } else {
        isDresscodeActive = false; // Đặt trạng thái không active
        dresscode.style.display = "none";
    }

}
list.forEach((item) => item.addEventListener("click", activeLink));

// Letter Script -------

const hackerTextEl = document.querySelector(".code-column");
const allTextChars = hackerTextEl.textContent.split("");

startBtn.addEventListener("click", () => {
	hackerTextEl.textContent = "";
	backboard.style.height = "44vh";
	startBtn.style.display = "none";
	let i = 0;
	intervalId = setInterval(() => {
        if (i < allTextChars.length) {
            hackerTextEl.textContent += allTextChars[i];
            i++;
        } else {
            clearInterval(intervalId); // Dừng khi hoàn thành
            intervalId = null;
        }
    }, 40);
});

// Letter Script -------



// Timeline -----------

document.addEventListener("DOMContentLoaded", function () {
    const timelineLine = document.querySelector(".timeline-line");
    const timelineImage = document.querySelector(".timeline-image");
  
    const maxTimelineHeight =
      (document.querySelectorAll(".my-container").length - 1) * 100;
  
    window.addEventListener("scroll", () => {
      const scrollPercentage = (window.scrollY / maxTimelineHeight) * 65; //Adjust the speed as needed
  
      const adjustedPercentage = Math.min(100, scrollPercentage);
      timelineLine.style.height = `${adjustedPercentage}%`;
      timelineImage.style.top = `${adjustedPercentage}%`;
    });
  });

// Timeline -----------
  

// Dress code ----------

document.querySelectorAll(".color").forEach(function (element) {
    const color = element.dataset.color;
    element.style.background = color;
    element.querySelector("span").textContent = color;
});

// Dress code ----------






