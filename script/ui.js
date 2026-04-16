const routes =
[
    {id: 'stadsparken', name: 'Konstrunda: Stadsparken'},
    {id: 'sveaparken', name: 'Vandring: Sveaparken'}
]

function buildMenu()
{
    const menuContainer = document.getElementById('menu')
    routes.forEach(route => {
        const link = document.createElement('a')
        link.href = `quiz.html?route=${route.id}`
        link.innerText = route.name
        link.className = "menu-button"
        menuContainer.appendChild(link)
    });
}

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
buildMenu()