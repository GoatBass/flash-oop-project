import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const app = Vue.createApp({
    data() {
        return {
            showQCard: false, //boolean to use for showing question form
            btnQ: 'Add Question', //text for the button add question in case we want to change it
            error: false,
            showFlashcard: false, //boolean to use for showing the flashcard
            flashCards: [], //Array that will contain our flasshcards
            //Our object flashcard
            question: '',
            answer: '',
            editingCard: undefined
        }
    },

    methods: {
        //Method that will change the state of the question card to it's opposite on every click we do to it. Added on line 29 of the html
        showQuestion(){
            this.showQCard = !this.showQCard
            this.editingCard = undefined
        },
        //Method that activates when we submit the form and shows us the flash card. It makes an unshift to our array with the two values added on the form, plus it adds a random unique ID using nanoid.
        //We add the method on line 42 of the html
        submitForm(){
            this.showFlashcard = true
            //NOTE: Unshift does the same as a push, but it adds the element on the first position of the array
            if(!this.answer || !this.question){
                this.error = true
                return
            }
            //If we are on editModem we just have to update
            if(this.editingCard){
                this.editingCard.question = this.question
                this.editingCard.answer = this.answer
                this.editingCard = undefined
                this.question = ''
                this.answer = ''
                this.error = false
                this.showQCard = !this.showQCard

                return 
            }
            const newCard = {
                question: this.question,
                answer: this.answer,
                showAnswer: false,
                id: nanoid()
            }
            this.flashCards.unshift(newCard)
            //clean form fields
            this.question = ''
            this.answer = ''
            this.error = false
            this.showQCard = !this.showQCard
        },
        //Method to toggle the value of showing the answer, related on the line 67 of the html file
        toggleAnswer(flashcard){
            flashcard.showAnswer = !flashcard.showAnswer
        },
        //Method to remove the element of the array related with their unique id. Added on line 70 of the html
        removeCard(id){
            this.flashCards = this.flashCards.filter(elm => {
                elm.id != id
            })
        },

        getCardById(id){
            return this.flashCards.find(flashcard => {
                return flashcard.id == id
            })
        },

        editCard(flashcard){
            this.showQCard = !this.showQCard
            this.editingCard = flashcard //we changed out app status to inform that we are in edition mode, plus we are editting flashcard
        }
    },

    mounted(){
        let savedFlashs = localStorage.getItem('saved-flashcards')
        if(savedFlashs){
            this.flashCards = JSON.parse(savedFlashs)
        }
        console.log('load: ', this.flashCards)
    },

    watch: {
        flashCards: {
            handler(value){
                console.log('flashcards watch:', value)
                let toLocalStorage = JSON.stringify(value)
                toLocalStorage.setItem('saved-flashcards ', toLocalStorage)
            }
        }
    }
})

app.mount('#app')