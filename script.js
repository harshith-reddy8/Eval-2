document.addEventListener('DOMContentLoaded', () => {
  let currentQuestionIndex = 0;
  let questions = [];

  // Fetch data from data.json
  fetch('data.json')
      .then(response => response.json())
      .then(data => {
          questions = data;
          console.log('Questions loaded:', questions); // Debug statement
          loadQuestion();
      })
      .catch(error => {
          console.error('Error loading data.json:', error); // Debug statement
      });

  function loadQuestion() {
      if (currentQuestionIndex < questions.length) {
          const questionContainer = document.getElementById('question-container');
          const method = questions[currentQuestionIndex].method;
          const comment = questions[currentQuestionIndex]['comment_2'];
          console.log('Loading question:', currentQuestionIndex, method, comment); // Debug statement
          questionContainer.innerHTML = `
              <pre>${method}</pre>
              <p>${comment}</p>
          `;
      } else {
          document.getElementById('quiz-container').innerHTML = '<p>Thank you for completing the survey!</p>';
      }
  }

  window.submitRating = function() {
      const meaningfulness = document.getElementById('meaningfulness').value;
      const naturalness = document.getElementById('naturalness').value;
      const consistency = document.getElementById('consistency').value;

      const formData = {
          method: questions[currentQuestionIndex].method,
          comment: questions[currentQuestionIndex]['comment_2'],
          meaningfulness: meaningfulness,
          naturalness: naturalness,
          consistency: consistency
      };

      console.log('Submitting', formData); // Debug statement

      // Here you would send formData to Google Forms

      currentQuestionIndex++;
      loadQuestion();
  };

  window.skipToComparison = function() {
      const meaningfulness = document.getElementById('meaningfulness').value;
      const naturalness = document.getElementById('naturalness').value;
      const consistency = document.getElementById('consistency').value;

      const formData = {
          method: questions[currentQuestionIndex].method,
          comment: questions[currentQuestionIndex]['comment_2'],
          meaningfulness: meaningfulness,
          naturalness: naturalness,
          consistency: consistency
      };

      console.log('Submitting and skipping to comparison', formData); // Debug statement

      // Here you would send formData to Google Forms

      document.getElementById('quiz-container').style.display = 'none';
      document.getElementById('comparison-container').style.display = 'block';

      loadComparison();
  };

  function loadComparison() {
      if (currentQuestionIndex < questions.length) {
          const method = questions[currentQuestionIndex].method;
          const comment1 = questions[currentQuestionIndex]['comment_1'];
          const comment2 = questions[currentQuestionIndex]['comment_2'];
          console.log('Loading comparison:', currentQuestionIndex, method, comment1, comment2); // Debug statement

          document.getElementById('method-display').innerHTML = `<pre>${method}</pre>`;
          document.getElementById('comment1').textContent = comment1;
          document.getElementById('comment2').textContent = comment2;
      } else {
          document.getElementById('comparison-container').innerHTML = '<p>Thank you for completing the survey!</p>';
      }
  }

  window.submitComparison = function() {
      const preferredComment = document.querySelector('input[name="preferred-comment"]:checked').value;
      const reason = document.getElementById('reason').value;

      const comparisonData = {
          method: questions[currentQuestionIndex].method,
          preferredComment: preferredComment,
          reason: reason
      };

      console.log('Submitting comparison', comparisonData); // Debug statement

      // Here you would send comparisonData to Google Forms

      currentQuestionIndex++;
      loadQuestion();
      document.getElementById('quiz-container').style.display = 'block';
      document.getElementById('comparison-container').style.display = 'none';
  };
});
