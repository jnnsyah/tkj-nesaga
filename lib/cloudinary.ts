import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: Buffer, folder: string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder: folder,
                    resource_type: "auto",
                    transformation: [
                        {
                            width: 1200,
                            crop: "limit",
                            quality: "auto:good",
                            fetch_format: "auto",
                        },
                    ],
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve({
                        secure_url: result?.secure_url,
                        public_id: result?.public_id,
                    });
                }
            )
            .end(file);
    });
};

export const deleteImage = async (publicId: string) => {
    return await cloudinary.uploader.destroy(publicId);
};

export default cloudinary;
