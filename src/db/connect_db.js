import mongoose from "mongoose"

export async function connectDB(url) {
    return new Promise((resolve, reject) => {
        mongoose.connect(url)
            .then((response) => {
                console.log(`Connection to ${mongoose.connection.name} database Successful!`);
                resolve('Successful')
            }, (error) => {
                console.log(error)
                reject(error)
            });

    })
}
