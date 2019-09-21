window.onload = function(){
  const date = new Date()
const monthIndex = date.getMonth()
const months = [
"January",
"February",
"March",
"April",
"May",
"June",
"July",
"August",
"September",
"October",
"November",
"December"
]
const day = date.getDate()
const year = date.getFullYear()
const today = months[monthIndex]+" "+day+" "+year
const dateElement = document.getElementById("date")
dateElement.innerHTML = today
}