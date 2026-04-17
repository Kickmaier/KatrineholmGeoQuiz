let lastVibration = -1
let map
let watchId
let positionMarker

const userMarker = L.icon
({
    iconUrl : 'icons/mapmarker.png',
    iconSize : [25 , 25],
    iconAnchor : [20 , 40]
})
function initMap()
{
map = L.map('map',{
zoomControl: false,
attributionControl :false,
zoomSnap:0.1,
zoomDelta:0.1,
touchZoom: true,
bounceAtZoomLimits:true
}).setView([58.993, 16.208], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom: 19})
.addTo(map)
positionMarker = L.marker([0,0], {icon : userMarker}) 
}

function flyToFirstQuestion(lat, lng)
{
if(map)
{
    map.flyTo([lat, lng], 17, 
    {
        animate : true,
        duration : 3
    })
    setTimeout(() => {
        startGps()
    }, 2500)
}
}

function startGps()
{
    if(navigator.geolocation)
    {
        watchId = navigator.geolocation.watchPosition((position) => 
            {
                const uLat = position.coords.latitude
                const uLng = position.coords.longitude
                positionMarker.setLatLng([uLat, uLng]).addTo(map)

                if (!questions || index >= questions.length) return

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
                        // stopGps()
                        geoTrigger(index)
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

function geoTrigger(index)
{
    if(index > lastVibration)
    {
        if("vibrate" in navigator)
        {
            navigator.vibrate([200, 100, 200])
        }
    
    document.getElementById("trivia").classList.remove("hidden")
    showQuestion()
    lastVibration = currentIndex
    }
}
window.addEventListener('load', initMap);
