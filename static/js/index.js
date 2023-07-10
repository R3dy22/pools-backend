// Sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

// Time convert function
const convertTime12to24 = time12h => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "p.m") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};

// Update each pool every second
const raw_pools = document.querySelectorAll(".timer");

const pools = Array.from(raw_pools);

pools.forEach(async pool => {
    while (true) {
    var timer_data = pool.childNodes[1].dataset.date;
    
    console.log(pool.childNodes[0])

    // Start of the program
    var raw_date = timer_data.split(',');
                    
    var convertedTime = convertTime12to24(raw_date[2].slice(1));

    var date = raw_date[0] + "," +  raw_date[1] + ', '+ convertedTime;

    var countDownDate = new Date(date).getTime();

    // Update the count down every 1 second
    
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    if (days == 0) {
        pool.childNodes[1].innerHTML = hours + "h " + minutes + "m " + seconds + "s ";
    } else {
        pool.childNodes[1].innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    };

    // If the count down is finished, write some text
    if (distance < 0) {
        pool.childNodes[1].innerHTML = "EXPIRED";
        pool.parentElement.childNodes[1].innerHTML = `<div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="red" class="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"></circle>
              </svg>
            </div>
          <span>INACTIV</span>`
    };
    await sleep(1 * 1000);
};
});