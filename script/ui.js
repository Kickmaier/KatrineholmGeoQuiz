// Lägg till en rad i denna för nya rundor samt lägg till array med frågor i api
const routes =
[
    {id: 'stadsparken', name: 'Konstrunda: Stadsparken'},
    {id: 'sveaparken', name: 'Vandring: Sveaparken'}
]

function buildMenu()
{
    const menuContainer = document.getElementById('menu')
    if(!menuContainer) return
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
function startButton()
{
    const button = document.getElementById("start-game")
    console.log("hittade: " ,button)
    if(button)
    {
    button.innerText = "START"
    button.onclick = startGame
    }
}
function startGame()
{
    if('vibrate' in navigator)
    {
        navigator.vibrate(50)
    }
    const overlay = document.getElementById("start-overlay")
    overlay.classList.add("hidden")
    flyToFirstQuestion(questions[index].lat, questions[index].lng)
}
// Lade till denna för att kunna visa tydligt vid redovisning
// function startCamera()
// {
//     navigator.mediaDevices.getUserMedia
//     ({
//         video : {
//             facingMode : { exact: "environment" }
//         }
//     })
// .then(function(stream)
//     {video.srcObject = stream
//         console.log("kameran rullar")
//     })
// .catch(function(err)
//     {
//     console.error("kunde inte ladda kameran ", err)
//     video.style.display = 'none'
//     })
// }
function endGame()
{
    const text = document.getElementById("result-text")
    text.textContent = `Resultat ${score} / ${index}`
    const homeButton = document.getElementById("home-button")
    homeButton.innerHTML = `<a href = "index.html" onclick="localStorage.clear()">Startsidan</a>`
    document.getElementById("result-container").classList.remove("hidden")
}
buildMenu()
startButton()
// startCamera()