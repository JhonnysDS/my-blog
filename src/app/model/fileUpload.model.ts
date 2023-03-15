
export class FileUpload {
    constructor(
        public imagenFullName: string | null,
        public imageName: string | null,
        public imageExt: string,
        public imageSize: number | 0, 
        public imagePath: string | ArrayBuffer | null,
        public imageServer: boolean
    ){}
}