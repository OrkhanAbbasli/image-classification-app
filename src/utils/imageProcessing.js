import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

export async function loadModel() {
    try {
        return await mobilenet.load();
    } catch (error) {
        console.error("Error loading the model:", error);
        throw error;
    }
}

export function preprocessImage(image) {
    const tensor = tf.browser
        .fromPixels(image)
        .resizeNearestNeighbor([224, 224]) // MobileNet input size
        .toFloat()
        .expandDims();
    return tensor.div(127.5).sub(1); // Normalize to [-1, 1] range
}

export function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => resolve(img);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}