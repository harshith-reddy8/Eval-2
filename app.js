document.addEventListener('DOMContentLoaded', function() {
    // Dummy data
    const data = [
        {"type": "rating", "comment": "This is a sample comment.", "method": "Sample Method"},
        {"type": "rating", "comment": "Another sample comment.", "method": "Another Method"},
        {"type": "comparison", "method_id": "method1", "method": "Comparison Method", "comment1": "First comment to compare.", "comment2": "Second comment to compare."}
    ];
    let currentQuestionIndex = 0;

    function loadQuestion() {
        const questionContainer = document.getElementById('question-container');
        const ratingContainer = document.getElementById('rating-container');
        const comparisonContainer = document.getElementById('comparison-container');
        const currentData = data[currentQuestionIndex];

        if (currentData.type === 'rating') {
            ratingContainer.style.display = 'block';
            comparisonContainer.style.display = 'none';
            questionContainer.innerHTML = `
                <p>${currentData.comment}</p>
                <p><strong>Method:</strong> ${currentData.method}</p>
            `;
        } else if (currentData.type === 'comparison') {
            ratingContainer.style.display = 'none';
            comparisonContainer.style.display = 'block';
            questionContainer.innerHTML = `<p><strong>Method:</strong> ${currentData.method}</p>`;
            document.getElementById('comment1').textContent = currentData.comment1;
            document.getElementById('comment2').textContent = currentData.comment2;
        }
    }

    const form = document.getElementById('comment-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from being submitted normally

        const currentData = data[currentQuestionIndex];
        const formData = new FormData(form);

        if (currentData.type === 'rating') {
            const meaningfulness = document.getElementById('meaningfulness').value;
            const naturalness = document.getElementById('naturalness').value;
            const consistency = document.getElementById('consistency').value;

            // Submit rating data to Google Forms
            const params = new URLSearchParams();
            params.append('entry.504190672', 'YES');
            params.append('entry.1246742046', 'YES');
            params.append('entry.790380436', meaningfulness);
            params.append('entry.240260106', naturalness);
            params.append('entry.1991584273', consistency);

            submitToGoogleForms(params);
        } else if (currentData.type === 'comparison') {
            const preferredComment = document.getElementById('preferred-comment').value;
            const reason = document.getElementById('reason').value;

            // Submit comparison data to Google Forms
            const params = new URLSearchParams();
            params.append('entry.650268919', preferredComment);
            params.append('entry.812987669', 'YES');
            params.append('entry.1520462176', reason);

            submitToGoogleForms(params);
        }

        // Move to the next question
        currentQuestionIndex++;
        if (currentQuestionIndex < data.length) {
            loadQuestion();
        } else {
            alert('Thank you for your participation!');
        }
    });

    function submitToGoogleForms(params) {
        const formUrl = `https://docs.google.com/forms/d/e/1FAIpQLScHj1FaA0RpWx18pVgQoUyHh7NQzhEE0DrNI2PO4PVPg2V21g/formResponse`;
        fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params.toString()
        })
        .then(() => {
            console.log('Form submitted successfully');
        })
        .catch((error) => {
            console.error('Error submitting form:', error);
        });
    }

    loadQuestion();
});