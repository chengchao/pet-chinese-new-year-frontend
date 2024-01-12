import OSS from "ali-oss";
import axios, { AxiosError } from "axios";

type OssStsType = {
  accessKeyId: string;
  accessKeySecret: string;
  stsToken: string;
  expiration: number;
  bucket: string;
  region: string;
};

async function getOssCredentials(): Promise<OssStsType> {
  const response = await axios.post("/api/aliyun/oss/upload_images", {});
  return {
    ...response.data,
    stsToken: response.data.securityToken,
  };
}
/**
 * 获取OSSClient
 * @param accessKeyId AccessKey ID
 * @param accessKeySecret 从STS服务获取的临时访问密钥AccessKey Secret
 * @param stsToken 从STS服务获取的安全令牌（SecurityToken）
 * @param region Bucket所在地域
 * @param bucket Bucket名称
 */
export default async function getOssClient() {
  console.log("Calling getOssClient");
  try {
    const ossSts = await getOssCredentials();
    const client = new OSS({
      ...ossSts,
      refreshSTSTokenInterval: ossSts.expiration,
      refreshSTSToken: async () => await getOssCredentials(), // 过期后刷新token
    });
    return client;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
