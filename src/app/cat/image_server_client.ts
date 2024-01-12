import axios from "axios";

class ImageServerClient {
  async sendImagePaths(petName: string, names: string[]) {
    const response = await axios.post("/api/image_server/upload_image_urls", {
      petName: petName,
      names: names,
    });
  }
}

export default function getImageServerClient() {
  return new ImageServerClient();
}
