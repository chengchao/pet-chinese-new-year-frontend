import axios from "axios";

class ImageServerClient {
  async sendImagePrefix(prefix: string) {
    const response = await axios.post("/api/image_server/upload_image_prefix", {
      prefix: prefix,
    });
  }
}

export default function getImageServerClient() {
  return new ImageServerClient();
}
