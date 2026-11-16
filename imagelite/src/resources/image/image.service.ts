import {Image} from './image.resource'

class ImageService {
    baseURL: string = 'http://localhost:8081/v1/images';

    async buscar() : Promise<Image[]> {
        const response = await fetch(this.baseURL);
        return await response.json();
    }
}

//react hook => use
export const useImageService = () => new ImageService();