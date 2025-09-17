import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv'

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if (!localFilePath) return console.log("unable to find the local path");
        try {
            const response = await cloudinary.uploader.upload(localFilePath,{resource_type: "auto"})
            

    fs.unlinkSync(localFilePath);

    return {
      url: response.secure_url,
      public_id: response.public_id,
    };



        } catch (error) {
           console.log("there is an error while uploadng to cloudinary ", error);
            
        }

        
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
    }
    
} 

export { uploadOnCloudinary };