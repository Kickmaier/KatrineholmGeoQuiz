const urlParam = new URLSearchParams(window.location.search)
const routeId = urlParam.get('route')

const apiUrl = `https://katrineholmgeoquiz.onrender.com/api/questions?type=${routeId}`

function decodeHTML(html)
{
    const txt = document.createElement("textarea")
    txt.innerHTML = html
    return txt.value
}

fetch(apiUrl)
    .then(function(response) {return response.json()})
    .then(function(data)
    {
    const rawQuestion = data.results ? data.results : data
    const cleanQuestion = rawQuestion.map(function(question)
    {
        return{
            question : decodeHTML(question.question),
            correct_answer : decodeHTML(question.correct_answer),
            incorrect_answers : question.incorrect_answers.map(function(item)
            {            
            return decodeHTML(item)
            }),
            image : question.image_url || null,
            lat : question.lat || null,
            lng : question.lng || null
        }
        })
        console.log(cleanQuestion)
        localStorage.setItem("quiz_questions", JSON.stringify(cleanQuestion))
        localStorage.setItem("currentIndex", 0)
        const firstQ = cleanQuestion[0]
        if(firstQ && firstQ.lng && firstQ.lat)
        {
            console.log("Zoomar in på första frågan")
            
        }

        console.log("Frågor sparade")
        updateOverlay()
    })

    function showQuestion()
    {
        // const currentQ = questions[index]
        let allAnswers = [currentQ.correct_answer].concat(currentQ.incorrect_answers)
        allAnswers.sort(function() {return Math.random() -0.5 }) 
        
        const trivia = document.getElementById("trivia")
        trivia.innerHTML = ""
        if(currentQ.image)
        {
            const img = document.createElement("img")
            img.src = currentQ.image
            img.alt = "Frågebild"
            trivia.appendChild(img)
        }
        const questionText = document.createElement("h2")
        questionText.textContent = currentQ.question
        trivia.appendChild(questionText)

        allAnswers.forEach(answer => 
            {
                const card = document.createElement("div")
                card.classList.add("answer-card")

                const answerText = document.createElement("p")
                answerText.textContent = answer
                card.appendChild(answerText)

                card.onclick = function()
                {
                    checkAnswer(answer, currentQ.correct_answer, card)
                }
                trivia.appendChild(card)
            })
    }
    function checkAnswer(answer, correctAnswer, chosenCard)
    {
        if(answer === correctAnswer)
        {
            chosenCard.classList.add("correct")
        }
        else
        {
            chosenCard.classList.add("incorrect")
            const allCards = document.querySelectorAll(".answer-card")
            allCards.forEach(card =>
            {
                if(card.textContent === correctAnswer)
                    card.classList.add("correct")
            })
        }
        setTimeout(()=>{
            document.getElementById("trivia").classList.add("hidden")
            document.getElementById("trivia").innerHTML = ""
            if (typeof startGps === "function")
            {
                startGps()
            }
        }, 1000)
        window.index++
        localStorage.setItem("currentIndex", index)
        updateOverlay()
    }
    
    