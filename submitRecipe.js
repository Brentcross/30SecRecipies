document.getElementById('recipeForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the normal form submission

    const recipeData = {
        name: document.getElementById('recipeName').value,
        ingredients: document.getElementById('recipeIngredients').value.split(','),
        instructions: document.getElementById('recipeInstructions').value,
    };

    // Here you would normally send the data to the server
    console.log(recipeData);

    alert('Recipe submitted! Thank you.');

    // Optionally, clear the form or redirect the user
    // this.reset();
    // window.location.href = 'thank-you.html'; // Redirect to a thank you page
});
