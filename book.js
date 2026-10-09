/* stage 7·5a · slide: s6-render · indicators 2, 7 · end state */
/* book.js — book.html only */

/* ===== 1. Outdoor note: respond to a click (§4) ===== */

const indoorInput = document.querySelector("#indoor");
const outdoorInput = document.querySelector("#outdoor");
const seatingNote = document.querySelector("#seating-note");

function showSeatingNote() {
  if (outdoorInput.checked) {
    seatingNote.hidden = false;
  } else {
    seatingNote.hidden = true;
  }
}

indoorInput.addEventListener("click", showSeatingNote);
outdoorInput.addEventListener("click", showSeatingNote);

/* ===== 2. Characters left: respond to typing (§4) ===== */

const requestsInput = document.querySelector("#requests");
const requestsCount = document.querySelector("#requests-count");

function updateCount() {
  const left = 200 - requestsInput.value.length;
  requestsCount.textContent = left + " characters left";
}

requestsInput.addEventListener("input", updateCount);

/* ===== 3. Booking rules HTML cannot check (§5) ===== */

const form = document.querySelector("form");
const dateInput = document.querySelector("#date");
const partyInput = document.querySelector("#party");
const formMessage = document.querySelector("#form-message");

function isPastDate(dateText) {
  const endOfThatDay = new Date(dateText + "T23:59");
  return endOfThatDay < new Date();
}

function needsPhoneCall(party) {
  return party > 8;
}

function checkBooking(event) {
  const party = Number(partyInput.value);
  let problem = "";

  if (isPastDate(dateInput.value)) {
    problem = "That date has passed. Please choose today or a later date.";
  } else if (needsPhoneCall(party)) {
    problem = "For more than 8 guests, please call us on (021) 555 0123.";
  }

  if (problem !== "") {
    event.preventDefault();
    formMessage.textContent = problem;
  }
}

form.addEventListener("submit", checkBooking);
