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
          document.getElementById('quiz-container').style.display = 'block';
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
          method_id: questions[currentQuestionIndex].method_id,
          method: questions[currentQuestionIndex].method,
          comment: questions[currentQuestionIndex]['comment_2'],
          meaningfulness: meaningfulness,
          naturalness: naturalness,
          consistency: consistency
      };

      console.log('Submitting', formData); // Debug statement

      submitRatingToGoogleForms(formData);

      currentQuestionIndex++;
      loadQuestion();
  };

  window.skipToComparison = function() {
      const meaningfulness = document.getElementById('meaningfulness').value;
      const naturalness = document.getElementById('naturalness').value;
      const consistency = document.getElementById('consistency').value;

      const formData = {
          method_id: questions[currentQuestionIndex].method_id,
          method: questions[currentQuestionIndex].method,
          comment: questions[currentQuestionIndex]['comment_2'],
          meaningfulness: meaningfulness,
          naturalness: naturalness,
          consistency: consistency
      };

      console.log('Submitting and skipping to comparison', formData); // Debug statement

      submitRatingToGoogleForms(formData);

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
          method_id: questions[currentQuestionIndex].method_id,
          method: questions[currentQuestionIndex].method,
          preferredComment: preferredComment,
          reason: reason
      };

      console.log('Submitting comparison', comparisonData); // Debug statement

      submitComparisonToGoogleForms(comparisonData);

      currentQuestionIndex++;
      document.getElementById('quiz-container').style.display = 'block';
      document.getElementById('comparison-container').style.display = 'none';
      loadQuestion();
  };

  function submitRatingToGoogleForms(data) {
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdliVnSZKsyLX1MP8VRoL5ubgxo17oLXGp1qbAl5g4LtjdSqA/formResponse';

      const formData = new FormData();
      formData.append('entry.1377370501', data.method_id); // Method ID
      formData.append('entry.673208300', data.method); // Method
      formData.append('entry.312816773', data.comment); // Comment
      formData.append('entry.439694878', data.meaningfulness); // Meaningfulness
      formData.append('entry.632744986', data.naturalness); // Naturalness
      formData.append('entry.970049141', data.consistency); // Consistency

      fetch(formUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
      }).then(response => {
          console.log('Rating form submitted successfully');
      }).catch(error => {
          console.error('Error submitting rating form:', error);
      });
  }

  function submitComparisonToGoogleForms(data) {
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfRh7Cv1hvXemEr9-wLz12qkhc0dMWRJ0gMUIejcWT_p5tZUQ/formResponse'; // Replace with your comparison form URL

    const formData = new FormData();
    formData.append('entry.698561990', data.method_id); // Method ID
    formData.append('entry.1913479941', data.method); // Method
    formData.append('entry.1432506270', data.comment1); // Comment 1
    formData.append('entry.220256943', data.comment2); // Comment 2
    formData.append('entry.944655743', data.preferredComment); // Preferred Comment (Option 1 or Option 2)
    formData.append('entry.1260493539', data.reason); // Reason

    fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).then(response => {
        console.log('Comparison form submitted successfully');
    }).catch(error => {
        console.error('Error submitting comparison form:', error);
    });
}

});
