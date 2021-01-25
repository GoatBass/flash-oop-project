import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const app = Vue.createApp({
    data() {
        return {
            showQCard: false, //boolean to use for showing question form
            btnQ: 'Add Question', //text for the button add question in case we want to change it
            showFlashcard: false, //boolean to use for showing the flashcard
            flashCards: [], //Array that will contain our flasshcards
            //Our object flashcard
            flashcard: {
                question: '',
                answer: '',
            },
            showAnswer: false //boolean to use for swhoing answer
        }
    },

    methods: {
        //Method that will change the state of the question card to it's opposite on every click we do to it. Added on line 29 of the html
        showQuestion(){
            this.showQCard = !this.showQCard
        },
        //Method that activates when we submit the form and shows us the flash card. It makes an unshift to our array with the two values added on the form, plus it adds a random unique ID using nanoid.
        //We add the method on line 42 of the html
        submitForm(){
            this.showFlashcard = true
            //NOTE: Unshift does the same as a push, but it adds the element on the first position of the array
            this.flashCards.unshift({
                ...this.flashcard, 
                id: nanoid(),
            })
            this.showQCard = !this.showQCard
        },
        //Method to toggle the value of showing the answer, related on the line 66 of the html file
        toggleAnswer(){
            this.showAnswer = !this.showAnswer
        },
        //Method to remove the element of the array related with their unique id. Added on line 70 of the html
        removeCard(id){
            this.flashCards = this.flashCards.filter(elm => {
                return elm.id != id
            })
        }
    }
})

app.mount('#app')