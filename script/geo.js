let map
let watchId

function initMap()
{
map = L.map('map',{
zoomControl: false,
attributionControl :false,
zoomSnap:0.1,
zoomDelta:0.1,
touchZoom: true,
bounceAtZoomLimits:true
}).setView([58.993, 16.208], 17.5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom: 19})
.addTo(map)
startGps()
}
function startGps()
{
    if(navigator.geolocation)
    {
        watchId = navigator.geolocation.watchPosition((position) => 
            {
                const uLat = position.coords.latitude
                const uLng = position.coords.longitude

                const question = JSON.parse(localStorage.getItem("quiz-questions"))
                const index = parseInt(localStorage.getItem("currenIndex"))

                if (!question || index >= questions.length) return

                const currentQ = questions[index]

                if(currentQ.lat && currentQ.lng)
                {
                    const dist = map.distance([uLat, uLng], [currentQ.lat, currentQ.lng])

                    const meterDiv = document.getElementById("distance-meter")
                    const meterCount = document.getElementById("meter-count")

                    meterDiv.classList.remove("hidden")
                    meterCount.textContent = Math.round(dist) + " m"

                    if (dist <= 8)
                    {
                        stopGps()
                        geoTrigger()
                    }
                }
            }, (err) => console.error(err), {enableHighAccuracy: true})
    }
}

function stopGps()
{
    if (watchId !== undefined)
    {
        navigator.geolocation.clearWatch(watchId)
        watchId = undefined
        document.getElementById("distance-meter").classList.add("hidden")
    }
}

function geoTrigger()
{
    document.getElementById("trivia").classList.remove("hidden")
    showQuestion()
}
window.addEventListener('load', initMap);
