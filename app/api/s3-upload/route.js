import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";


const client = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials:{
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_S_ACCESS,
    } 
});




async function uploadFileToS3(image, imageName){
    const imageBuffer = image;
    console.log(imageName)

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${imageName}`,
        Body: imageBuffer,
        ContentType: "image/jpg"
    }

    const command = new PutObjectCommand(params);
    await client.send(command);
    return imageName ;
}



export async function POST (request){

    try {

        const formData = await request.formData();
        const image = formData.get("image");

        if(!image){
            return NextResponse.json({error:"Image is required."}, {status:400});
        }

        const buffer= Buffer.from(await image.arrayBuffer());
        const imageName = await uploadFileToS3(buffer, image.name);

        return NextResponse.json({success: true, imageName})


        
    } catch (error) {
        
        return NextResponse.json ({error: error});
    }
}