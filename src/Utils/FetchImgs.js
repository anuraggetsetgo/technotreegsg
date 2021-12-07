 import AWS from 'aws-sdk';
// const AWS_ACCESS_KEY = 'AKIAJWXPD7W5EXVRKSQQ';
// const AWS_SECRET_KEY = '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';
const AWS_ACCESS_KEY = 'AKIAR4RQYHKAF2YRTG5T';
const AWS_SECRET_KEY = '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';
//Bucket policy generator - https://awspolicygen.s3.amazonaws.com/policygen.html
//S3 Documentation - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: 'us-east-1',
    //endpoint: 'https://s3-us-east-1.amazonaws.com/'
});

const s3 = new AWS.S3();

//operations refers to fetch image as 'getObject' or upload image as 'putObject'

// Improvement - To be done
/*
1. Bucket Policy change, specified domains allowed only
https://docs.aws.amazon.com/AmazonS3/latest/dev/example-bucket-policies.html

2. Make dynamic dir path prefix by providing into mutation it self,
so that every client will have their folder in bucket it self, which will be containing their own photos only
*/

function getSignedUrl(filename, filetype, foldername, operation) {
    const folderName = foldername;
    const params = {
        Bucket: 'gsg-image-uploads',
        Key: `${folderName}/` + filename,
        Expires: 604800
    };
    if(operation==='putObject'){
      params['ContentType'] = filetype;
    }
    return new Promise((resolve, reject) => {
      s3.getSignedUrl(operation, params, function(err, data) {
          if (err) {
              console.log("Error",err);
              reject(err)
          } else {
              resolve(data)
          }
      });
    });
}

//delete particular object
function deleteObject(folderName, fileName){
    //const folderName = 'progress_update';
    const params = {
                 Bucket: 'gsg-image-uploads',
                 Key: `${folderName}/` + fileName,
                };
    return new Promise((resolve, reject) => {
      s3.deleteObject(params, function(err, data) {
          if (err) {
              reject(err)
          } else {
              resolve(data)
          }
      });
    });
}

//retrieve the list of objects in specified path in bucket
function getListObjects(Prefix){
    const params = {
      Bucket: 'gsg-image-uploads',
      Prefix:Prefix, //Limits the response that begin with the specified prefix.
      //MaxKeys: 2 //(Integer) Sets the maximum number of keys returned in the response.
    };
    return new Promise((resolve, reject)=>{
      s3.listObjectsV2(params, function(err, data){
        if (err) {
            console.log(err, err.stack);
            reject(err)
        } else {
            const bucketContents = data.Contents;
            var temp = {};
              bucketContents.map(({Size, Key})=>{
                  if(Size>0)
                    {
                      const urlParams = {Bucket: 'gsg-image-uploads', Key};
                      s3.getSignedUrl('getObject',urlParams, function(err, url){
                        temp[Key]= url;
                      });
                    }
              return 0;
            });
              resolve(temp);
            }
      });
    })

}


export { getSignedUrl, getListObjects,deleteObject };
