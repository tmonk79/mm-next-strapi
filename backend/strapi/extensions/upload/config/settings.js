module.exports = {
    "provider": 'aws-s3',
    providerOptions: {
        "accessKeyId": process.env.ACCESS_KEY,
        "secretAccessKey": process.env.SECRET_KEY,
        "region": "ap-south-1",
        params: {
          "Bucket": "dc-recipe/Recipes",
        },
      },
}
