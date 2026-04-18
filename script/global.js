window.questions = JSON.parse(localStorage.getItem("quiz_questions"))
window.index = parseInt(localStorage.getItem("currentIndex"))
window.currentQ = questions[index]
window.video = document.getElementById("video-area")
window.score = parseInt(localStorage.getItem("currentScore"))