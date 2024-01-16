import axios from "axios";
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from "eventsource-parser";
import { EventSourceParserStream } from "eventsource-parser/stream";
import { Readable } from "stream";

type GetImageServerUrlResponse = {
  imageServerUrl: string;
  trainingProgressPath: string;
};

export class ImageServerClient {
  async startTrain(prefix: string) {
    const { imageServerUrl: serverUrl, trainingProgressPath } =
      await this.getImageServerUrl();
    console.log(`Image Server URL: ${serverUrl}`);

    const trainingProgressUrl = `${serverUrl}${trainingProgressPath}`;
    console.log(`Image Server Training Progress URL: ${trainingProgressUrl}`);

    const response = await fetch(trainingProgressUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prefix: prefix,
      }),
    });
    console.log(`Upload image prefix response status code: ${response.status}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return null;
    }

    return data;
  }

  async getImageServerUrl(): Promise<GetImageServerUrlResponse> {
    const response = await axios.get<GetImageServerUrlResponse>(
      "/api/image-server/get-server-url"
    );
    return response.data;
  }
}

export default function getImageServerClient() {
  return new ImageServerClient();
}
