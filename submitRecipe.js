document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recipeForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm()) {
            displayError('Please fill out all fields correctly.');
            return;
        }

        const recipeData = gatherFormData();
        submitRecipe(recipeData)
            .then(handleResponse)
            .catch(handleError);
    });

    function gatherFormData() {
        return {
            name: document.getElementById('recipeName').value.trim(),
            ingredients: document.getElementById('recipeIngredients').value.split(',').map(ingredient => ingredient.trim()),
            instructions: document.getElementById('recipeInstructions').value.trim(),
        };
    }

    function validateForm() {
        const { name, ingredients, instructions } = gatherFormData();
        return name && ingredients.length > 0 && ingredients[0] && instructions;
    }

    function displayError(message) {
        alert(message);
    }

    function submitRecipe(recipeData) {
        return fetch('/submit-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeData),
        });
    }

    function handleResponse(response) {
        if (response.ok) {
            response.json().then(data => {
                console.log('Success:', data);
                displaySuccess('Recipe submitted! Thank you.');
                form.reset();
                window.location.href = 'thank-you.html';
            });
        } else {
            throw new Error('Server responded with an error');
        }
    }

    function handleError(error) {
        console.error('Error:', error);
        displayError('Failed to submit recipe. Please try again.');
    }

    function displaySuccess(message) {
        alert(message);
    }
});
