import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const app = Vue.createApp({
    data() {
        return {
            showQCard: false,
            btnQ: 'Add Question',
            showFlashcard: false,
            flashCards: [],
            flashcard: {
                question: '',
                answer: ''
            },
            showAnswer: false
        }
    },

    methods: {
        showQuestion(){
            this.showQCard = !this.showQCard
        },

        submitForm(){
            this.showFlashcard = true
            this.flashCards.push({...this.flashcard})
        },

        toggleAnswer(){
            this.showAnswer = !this.showAnswer
        }
    }
})

app.mount('#app')