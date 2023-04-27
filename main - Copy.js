  // open & close nav menu
  const menuBtn = document.querySelector("#menu-btn");
  const closeBtn = document.querySelector("#close-btn");
  const menu = document.querySelector("nav .container ul");

// open sidebar
menuBtn.addEventListener('click',() => {
  menu.style.display = 'block';
  menuBtn.style.display = 'none';
  closeBtn.style.display = 'inline-block';
})
// close sidebar
closeBtn.addEventListener('click',() => {
  menu.style.display = 'none';
  closeBtn.style.display = 'none';
  menuBtn.style.display = 'inline-block';
})

//Change active class to clicked nav item
const navItems = document.querySelectorAll('nav ul li');

//Add active class to clicked nav item
navItems.forEach(item => {
  const link = item.querySelector('a');
  link.addEventListener('click', () =>{
    removeActiveClass();
    link.classList.add('active');
  })
})

//Remove active class from other items
const removeActiveClass = () => {
  navItems.forEach(item => {
    const link = item.querySelector('a');
    link.classList.remove('active');
  })
}

//show/hide Projects
const Projects = document.querySelectorAll('section#Projects article');

Projects.forEach(Project => {
  Project.addEventListener('click', () => {
    Project.classList.toggle('open');

    //Change icon
    const icon = Project.querySelector('.icon i');
    if(icon.className === 'uil uil-plus'){
      icon.className = 'uil uil-minus';
    } else{
      icon.className = 'uil uil-plus';
    }

  })

})
// change navbar style on scroll
window.addEventListener("scroll", () => {
  document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0)
})

/* Schedule */
const scheduleDays = document.querySelectorAll('.schedule-day');
const scheduleLinks = document.querySelectorAll('.schedule-link');

scheduleLinks.forEach((link, index) => {
  link.addEventListener('click', e => {
    e.preventDefault();
    scheduleLinks.forEach(link => link.classList.remove('active'));
    link.classList.add('active');
    scheduleDays.forEach(day => day.classList.remove('active'));
    scheduleDays[index].classList.add('active');
  });
});
const eventDate = new Date('2023-08-18T09:00:00.000Z'); // Set the event date and time
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime(); // Get the difference in milliseconds

  // Calculate the remaining days, hours, minutes, and seconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  // Update the countdown element with the remaining time
  countdownElement.innerHTML = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

  // Check if the event has already passed
  if (diff < 0) {
    countdownElement.innerHTML = 'The event has already passed!';
    clearInterval(intervalId);
  }
}

// Call the updateCountdown function every second
const intervalId = setInterval(updateCountdown, 1000);





// Validate form fields and prevent spamming and hacking

const abstractForm = document.getElementById('abstract-form');

abstractForm.addEventListener('submit', function(e) {
	e.preventDefault();

	const nameField = document.getElementById('name');
	const emailField = document.getElementById('email');
	const titleField = document.getElementById('title');
	const abstractField = document.getElementById('abstract');
	const timestampField = document.getElementById('timestamp');

	const nameValue = nameField.value.trim();
	const emailValue = emailField.value.trim();
	const titleValue = titleField.value.trim();
	const abstractValue = abstractField.value.trim();
	const timestampValue = new Date().getTime();

	let valid = true;

	// Validate name field
	if (nameValue === '') {
		nameField.classList.add('invalid');
		valid = false;
	} else {
		nameField.classList.remove('invalid');
	}

	// Validate email field
	if (emailValue === '' || !isValidEmail(emailValue)) {
		emailField.classList.add('invalid');
		valid = false;
	} else {
		emailField.classList.remove('invalid');
	}

	// Validate title field
	if (titleValue === '') {
		titleField.classList.add('invalid');
		valid = false;
	} else {
		titleField.classList.remove('invalid');
	}

	// Validate abstract field
	if (abstractValue === '') {
		abstractField.classList.add('invalid');
		valid = false;
	} else {
		abstractField.classList.remove('invalid');
	}

	// Add timestamp value
	timestampField.value = timestampValue;

	// Submit form if valid
	if (valid) {
		const xhr = new XMLHttpRequest();
		const url = 'submit.php';
		const params = `name=${nameValue}&email=${emailValue}&title=${titleValue}&abstract=${abstractValue}&timestamp=${timestampValue}`;
		xhr.open('POST', url);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				const response = JSON.parse(xhr.responseText);
				if (response.success) {
					showMessage('success', response.message);
				} else {
					showMessage('error', response.message);
				}
			}
		};
		xhr.send(params);
	}
});

function isValidEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function showMessage(type, message) {
	const messageField = document.createElement('div');
	messageField.classList.add(type);
	messageField.textContent = message;
	abstractForm.appendChild(messageField);
	setTimeout(function() {
		messageField.remove();
	}, 3000);
}









 

  
