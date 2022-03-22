'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {};
// 'use strict';

// /**
//  * An asynchronous bootstrap function that runs before
//  * your application gets started.
//  *
//  * This gives you an opportunity to set up your data model,
//  * run jobs, or perform some special logic.
//  *
//  * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
//  */


'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = () => {};

 const { createCategory, createIngredient, createSteps, createRecipe , uploadImage} = require('./helper');
 const fs = require("fs");
 const path = require("path")

function getRecipeData () {
    const jsonString = fs.readFileSync(path.join(__dirname,  './', 'recipe.json'), "utf8");
    const recipeData = JSON.parse(jsonString)
    return recipeData
}
 
async function importRecipeData (){   
    const recipeData = getRecipeData()
   
    let promises= [] 
    for( let i=0;i< recipeData.length;i++){
        let recipe = recipeData[i]
        promises.push(createContent(recipe))
    }
    Promise.all(promises).then((results)=>{
        // console.log(results)
    })
} 

async function createContent(recipe) {

    try {
        const isRecipeExist = await isDataExist('recipes', { Title: recipe.name})
    // console.log("isRecipeExist", isRecipeExist)
    if(!isRecipeExist) {
        console.log("inside")
       const dataModel = ProcessJson(recipe)

        const { recipeModel,ingredientModel,StepsModel} = dataModel   
        console.log(recipeModel)
        console.log(JSON.stringify(ingredientModel)) 
        createIngredient(ingredientModel).then((ingredientModelResponse)=>{
            console.log("ingredientModelResponse")
            console.log(ingredientModelResponse)
            recipeModel.Recipe_Ingredients.push(ingredientModelResponse.id)
            createSteps(StepsModel).then((stepsModelResponse)=>{
                const DownloadsPath = path.join(__dirname,  '../', 'oreo-stuffed-cupcakes-step-2 .webp')
                uploadRecipeImages(DownloadsPath).then((UploadImage)=> {
                    console.log("UploadImage") 
                    console.log(UploadImage)
                    recipeModel.Image.push(UploadImage[0].id)
                    recipeModel.Recipe_Steps.push(stepsModelResponse.id)
                    createRecipe(recipeModel).then((res)=>{ 
                        console.log("recipe created") 
                    })
                })
                
            }) 
        })
    }else {
        // console.log("Data already Exist")
    }
    }catch(err) {
        console.log(err.message)
    }
} 

function ProcessJson (recipe) {
        const { ingredients, steps } = recipe
        let ingredientModel = {
            Product_Title: recipe.name,
            Ingredient:[]
        }
        let StepsModel = {
            Product_Title: recipe.name,
            StepsComponent:[]
        }

        let recipeModel = {
            Title: recipe.name,
            Difficulty:recipe.difficulty,
            Time:`${parseInt(recipe.duration)/60} hours`,
            Serves:parseInt(recipe.serves),
            Recipe_Ingredients:[], 
            Recipe_Steps:[],
            Image:[],
            Recipe_Video_Url:recipe.video.src,
            Recipe_Servers_List:recipe.servings
        }
        

        console.log("ingredients.length", ingredients.length)
        ingredients.forEach((currentingredient) => {
        
            let currentIngredient =  {
                Ingredient_Title: currentingredient.ingredientTitle,
                Ingredient_List:[]
            }

           
            if(currentIngredient.items && currentIngredient.items.length > 0) {
                currentingredient.items.forEach((ingredientItem) => {
                    let items = {
                        Ingredient_Label: ingredientItem.label,
                        Metric_Value: ingredientItem.metricValue || "123",
                        Metric_Unit: ingredientItem.metricUnitLabel || "g",
                        Imperial_Value: ingredientItem.imperialValue || "1",
                        Imperial_Unit: ingredientItem.imperialUnitLabel || "tsp"
                    }
                    currentIngredient.Ingredient_List.push(items)
                })
            }
            
            ingredientModel.Ingredient.push(currentIngredient)
        })
        
        steps.forEach((CurrentSteps, index)=>{
            StepsModel.StepsComponent.push({
                description: CurrentSteps.instructions,
                order: index
            })

        });
        
     return ({
         recipeModel,
         ingredientModel,
         StepsModel
     })
}

async function isDataExist (model, query) {
    let check = await strapi.query(model).find(query);
    return check.length
}

async function uploadRecipeImages(imagePath) {

   return await uploadImage(imagePath)
}

module.exports = async () => {
    await importRecipeData()
};
