// 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
import Sts20150401, * as $Sts20150401 from '@alicloud/sts20150401';
import * as $OpenApi from '@alicloud/openapi-client';
import Util, * as $Util from '@alicloud/tea-util';

export default class STSClient {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  private static createClient(
    accessKeyId: string,
    accessKeySecret: string
  ): Sts20150401 {
    const config = new $OpenApi.Config({
      // 必填，您的 AccessKey ID
      accessKeyId: accessKeyId,
      // 必填，您的 AccessKey Secret
      accessKeySecret: accessKeySecret,
    });
    // Endpoint 请参考 https://api.aliyun.com/product/Sts
    config.endpoint = process.env.ALIBABA_CLOUD_STS_TOKEN_ENDPOINT;
    return new Sts20150401(config);
  }

  static async generateCredentials(
    durationSeconds: number,
    roleArn: string,
    roleSessionName: string
  ): Promise<$Sts20150401.AssumeRoleResponseBodyCredentials> {
    // 请确保代码运行环境设置了环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID 和 ALIBABA_CLOUD_ACCESS_KEY_SECRET。
    // 工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。以下代码示例使用环境变量获取 AccessKey 的方式进行调用，仅供参考，建议使用更安全的 STS 方式，更多鉴权访问方式请参见：https://help.aliyun.com/document_detail/378664.html
    const client = STSClient.createClient(
      process.env.ALIBABA_CLOUD_ACCESS_KEY_ID,
      process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET
    );
    const assumeRoleRequest = new $Sts20150401.AssumeRoleRequest({
      durationSeconds: durationSeconds,
      roleArn: roleArn,
      roleSessionName: roleSessionName,
    });
    const runtime = new $Util.RuntimeOptions({});
    try {
      console.log('Calling client.assumeRoleWithOptions');
      // 复制代码运行请自行打印 API 的返回值
      const assume_role_response = await client.assumeRoleWithOptions(
        assumeRoleRequest,
        runtime
      );
      console.log('Finish calling client.assumeRoleWithOptions');
      console.log(
        `AssumeRoleResponse.body.credentials: ${assume_role_response.body.credentials}`
      );
      return STSClient.assertValidCredentials(
        assume_role_response.body.credentials
      );
    } catch (error) {
      console.log(`Error! typeof error: ${typeof error}`);
      if (typeof error === 'string') {
        console.log(error);
      } else if (error instanceof Error) {
        // 错误 message
        console.log(error.message);
        if (
          'data' in error &&
          error.data instanceof Object &&
          'Recommend' in error.data
        ) {
          // 诊断地址
          console.log(error.data['Recommend']);
        }
      } else if (error instanceof Object) {
        if ('message' in error) {
          console.log(`error.message ${Util.assertAsString(error.message)}`);
        }
      }
      throw error;
    }
  }

  private static assertValidCredentials(
    credentials: $Sts20150401.AssumeRoleResponseBodyCredentials | undefined
  ): $Sts20150401.AssumeRoleResponseBodyCredentials {
    if (credentials !== undefined && credentials !== null) {
      return credentials;
    }

    throw new Error('credentials is undefined');
  }
}
