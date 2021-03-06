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
 const path = require("path");
 const fs = require('fs');
 const mime = require('mime-types'); 
const axios = require('axios')

 module.exports = {

  createRecipe: async(productInfo) => {
    try{
      const model= "recipes"; 
      const data = await strapi.services[model].create(productInfo)
      return data;
    }
    catch(err) {
      console.log(err.message)
    }
  },

  createCategory: async () => {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    console.log("&&&&&&&createCategory&&&&&")
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
  },

 createIngredient: async(ingridentsdata) => {
    try{
      const model= "recipe-ingredient"; 
      const data = await strapi.services[model].create(ingridentsdata)
      return data;
    }
    catch(err) {
      console.log(err.message)
    }
 },

 createSteps: async(stepsData) => {
  try{
    const model= "recipe-steps"; 
    const data = await strapi.services[model].create(stepsData)
    return data;
  }
  catch(err) {
    console.log(err.message)
  }
 },

 uploadImage: async (imgPath) => {
  const name = path.basename(imgPath);
  const buffer = await fs.statSync(imgPath);

  const del = await strapi.plugins.upload.services.upload.upload({
    data: {}, //mandatory declare the data(can be empty), otherwise it will give you an undefined error.
    files: {
      path: imgPath, 
      name: `${name}`,
      type: mime.lookup(imgPath), 
      size: buffer.size, 
	  }
   });

   return del;
 }

}

