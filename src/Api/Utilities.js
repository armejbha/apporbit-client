import axios from "axios"

// upload image on cloudinary 

export const imageUpload = async imageData => {
    const imageFormData = new FormData();
    imageFormData.append('image', imageData);
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, imageFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log(data.secure_url);
    return data?.secure_url;
}

// save user in database 

export const saveUserInDb = async user => {
    const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/user`,
        user
    )

    return data
}


export const parseDescriptionText = (text) => {
    return text
        .split("\n") 
        .filter(Boolean) 
        .map((line) => {
            const [label, ...rest] = line.split(":");
            return {
                label: label.trim(),
                content: rest.join(":").trim(), 
            };
        });
};