'use strict';
import { numbersInPortuguese, hundredsInPortuguese } from './numeros.mjs';

export function toWrittenForm(number) {
    if (number <= 100) {
        return numbersInPortuguese[number];
    } else if (number % 100 === 0) {
        return hundredsInPortuguese[number / 100];
    } else {
        const hundreds = Math.floor(number / 100);
        const units = number % 100;
        return `${hundredsInPortuguese[hundreds]} e ${numbersInPortuguese[units]}`;
    }
}

// Only run browser-specific code if we're in a browser environment
if (typeof window !== 'undefined') {

    let currentNumber = 0;
    let streak = 0;

    function updateStreak() {
        document.getElementById('streak').textContent = `Sequência: ${streak}`;
    }

    function removeDiacritics(str) {
        // Normalize the string to NFD (Normalization Form Decomposition)
        // This separates the base characters from the diacritical marks
        return str.normalize("NFD")
            // Use a regular expression to remove the diacritical marks
            // [\u0300-\u036f] matches all diacritical marks in the Unicode range U+0300 to U+036F
            .replace(/[\u0300-\u036f]/g, "");
    }

    function getPortugueseVoice() {
        const voices = speechSynthesis.getVoices();
        return voices.find(voice => voice.lang === 'pt-PT') || voices[0];
    }

    function speakCurrentNumber() {
        const utterance = new SpeechSynthesisUtterance(toWrittenForm(currentNumber));
        utterance.lang = 'pt-PT';
        utterance.voice = getPortugueseVoice();
        speechSynthesis.speak(utterance);
    }

    function getRandomNumberAndSpeak() {
        const maxNumber = document.querySelector('input[name="questionRange"]:checked').id;
        currentNumber = Math.floor(Math.random() * parseInt(maxNumber));
        document.getElementById('question').innerHTML = `O número é <b>${currentNumber}</b>.`;

        const questionType = document.querySelector('input[name="questionType"]:checked').id;
        if (questionType === 'both' || questionType === 'voice') {
            speakCurrentNumber();
        }
    }

    function checkAnswer() {
        const userInputElement = document.getElementById('userInput');
        const userInput = removeDiacritics(userInputElement.value.trim().toLowerCase());
        const correctAnswer = toWrittenForm(currentNumber);
        const result = document.getElementById('result');
        if (userInput === removeDiacritics(correctAnswer)) {
            result.textContent = `Correto! A resposta é ${correctAnswer}.`;
            result.style.color = "green";
            streak++;
            getRandomNumberAndSpeak();
        } else {
            result.textContent = `Incorreto. Você digitou "${userInputElement.value}". A resposta correta é ${correctAnswer}.`;
            result.style.color = "red";
            streak = 0;
        }
        updateStreak();
        userInputElement.value = '';
    }

    document.getElementById('checkButton').addEventListener('click', checkAnswer);

    document.getElementById('userInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });

    document.querySelectorAll('input[name="questionRange"]').forEach((elem) => {
        elem.addEventListener('change', (event) => {
            getRandomNumberAndSpeak();
        });
    });

    document.querySelectorAll('input[name="questionType"]').forEach((elem) => {
        elem.addEventListener('change', (event) => {
            const questionType = event.target.id;
            if (questionType === 'both' || questionType === 'voice') {
                speakCurrentNumber();
            }
            if (questionType === 'voice') {
                document.getElementById('question').style.display = 'none';
            } else {
                document.getElementById('question').style.display = 'block';
            }
        });
    });

    // Ensure voices are loaded before using them
    speechSynthesis.onvoiceschanged = () => {
        getPortugueseVoice();
    };

    getRandomNumberAndSpeak();
}
