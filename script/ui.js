function updateOverlay()
{
    const question = JSON.parse(localStorage.getItem("quiz_questions"))
    const index = parseInt(localStorage.getItem("currentIndex"))
    const currentQ = question[index]
    const overlay = document.getElementById("img-overlay")
    const overlayImage =document.getElementById("overlay-image")

    if (currentQ && currentQ.image)
    {
    overlayImage.src = currentQ.image
    overlay.classList.remove("hidden")
    }
    else
    {
        overlay.classList.add("hidden")
    }
}