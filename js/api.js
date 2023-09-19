const apiKey = '9c294ea016b94a04a2ceefe500fa9c6d';


function fetchPopularRecipes() {
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?number=6&apiKey=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const recipeCards = document.querySelectorAll('.card');

      data.results.forEach((recipe, index) => {
        if (index < recipeCards.length) {
          const recipeCard = recipeCards[index];

          // Populate card elements with data from the API
          const recipeImage = recipeCard.querySelector('.card-img-top');
          recipeImage.src = recipe.image;
          recipeImage.alt = recipe.title;

          const recipeTitle = recipeCard.querySelector('.card-title');
          recipeTitle.textContent = recipe.title;

          const recipeCuisine = recipeCard.querySelector('.card-cuisine');
          classifyCuisine(recipe.title, recipe.ingredientList)
            .then((cuisine) => {
              recipeCuisine.textContent = `Cuisine: ${cuisine}`;
            });

          const recipeCalories = recipeCard.querySelector('.card-calories');
          getCalories(recipe.title)
            .then((calories) => {
              recipeCalories.textContent = `Calories: ${calories}`;
            });

          const viewRecipeButton = recipeCard.querySelector('.btn-primary');
          viewRecipeButton.href = recipe.sourceUrl;

          // Show the card now that it's populated
          recipeCard.style.display = 'block';
        }
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to classify cuisine
function classifyCuisine(recipeTitle, ingredientList) {
  const apiUrl = 'https://api.spoonacular.com/recipes/cuisine';

  // Create the request body
  const requestBody = new URLSearchParams();
  requestBody.append('title', recipeTitle);
  requestBody.append('ingredientList', ingredientList);
  requestBody.append('language', 'en');

  // Make a POST request to classify cuisine
  return fetch(`${apiUrl}?apiKey=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.cuisines && data.cuisines.length > 0) {
        return data.cuisines.join(', ');
      } else {
        return 'N/A';
      }
    })
    .catch((error) => {
      console.error('Error classifying cuisine:', error);
      return 'N/A';
    });
}

// Function to get calorie information
function getCalories(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json?apiKey=${apiKey}`;
  
    // Make a GET request to get nutrition information
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.calories) {
          return `${data.calories} Calories`;
        } else {
          return 'N/A';
        }
      })
      .catch((error) => {
        console.error('Error fetching calorie information:', error);
        return 'N/A';
      });
  }
  
  // Function to fetch popular recipes
  function fetchPopularRecipes() {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?number=6&apiKey=${apiKey}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const recipeCards = document.querySelectorAll('.card');
  
        data.results.forEach((recipe, index) => {
          if (index < recipeCards.length) {
            const recipeCard = recipeCards[index];
  
            // Populate card elements with data from the API
            const recipeImage = recipeCard.querySelector('.card-img-top');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;
  
            const recipeTitle = recipeCard.querySelector('.card-title');
            recipeTitle.textContent = recipe.title;
  
            const recipeCuisine = recipeCard.querySelector('.card-cuisine');
            classifyCuisine(recipe.title, recipe.ingredientList)
              .then((cuisine) => {
                recipeCuisine.textContent = `Cuisine: ${cuisine}`;
              });
  
            // Retrieve recipe calorie information using recipe ID
            getCalories(recipe.id)
              .then((calories) => {
                const recipeCalories = recipeCard.querySelector('.card-calories');
                recipeCalories.textContent = `Calories: ${calories}`;
              });
  
            const viewRecipeButton = recipeCard.querySelector('.btn-primary');
            viewRecipeButton.href = recipe.sourceUrl;
  
            // Show the card now that it's populated
            recipeCard.style.display = 'block';
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  
  // Call the function to fetch and populate popular recipes
  fetchPopularRecipes();
  