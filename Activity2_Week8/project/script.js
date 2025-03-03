document.addEventListener('DOMContentLoaded', function() {
   
    const quizForm = document.getElementById('quizForm');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultsDiv = document.getElementById('results');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('totalQuestions');
    const feedbackParagraph = document.getElementById('feedback');
    

    const correctAnswers = {
        q1: 'a', // Paris
        q2: 'a', //  United Arab Emirates
        q3: 'c',  // Saudi Arabia
    };
    
    
    const totalQuestions = Object.keys(correctAnswers).length;
    totalQuestionsSpan.textContent = totalQuestions;
    
 
    submitBtn.addEventListener('click', checkAnswers);
    resetBtn.addEventListener('click', resetQuiz);
    

    function checkAnswers() {
        let score = 0;
        
       
        document.querySelectorAll('.options li').forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
        
        
        let allAnswered = true;
        
     
        for (let question in correctAnswers) {
            const selectedAnswer = document.querySelector(`input[name="${question}"]:checked`);
            const options = document.querySelectorAll(`input[name="${question}"]`);
            
            if (!selectedAnswer) {
                allAnswered = false;
            }
            
            if (selectedAnswer) {
                const userAnswer = selectedAnswer.value;
                const correctAnswer = correctAnswers[question];
                
                
                options.forEach(option => {
                    const li = option.parentElement;
                    if (option.value === correctAnswer) {
                        li.classList.add('correct');
                    }
                    if (option.checked && option.value !== correctAnswer) {
                        li.classList.add('incorrect');
                    }
                });
                
            
                if (userAnswer === correctAnswer) {
                    score++;
                }
            }
        }
        
        
        scoreSpan.textContent = score;
        
        
        let feedback = '';
        const percentage = (score / totalQuestions) * 100;
        
        if (percentage === 100) {
            feedback = 'Perfect! You got all the answers correct!';
        } else if (percentage >= 70) {
            feedback = 'Great job! You have a good understanding of the topics.';
        } else if (percentage >= 40) {
            feedback = 'Not bad, but there\'s room for improvement.';
        } else {
            feedback = 'You might want to study more and try again.';
        }
        
        if (!allAnswered) {
            feedback += ' (Note: You didn\'t answer all questions)';
        }
        
        feedbackParagraph.textContent = feedback;
        resultsDiv.style.display = 'block';
        
        
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
    }
    
    
    function resetQuiz() {
       
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.checked = false;
        });
        
        
        document.querySelectorAll('.options li').forEach(option => {
            option.classList.remove('correct', 'incorrect');
        });
        
        
        resultsDiv.style.display = 'none';
        
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});