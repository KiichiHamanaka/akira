import {
  Rekognition,
  DetectTextCommand,
  DetectTextCommandInput,
  DetectTextCommandOutput,
} from "@aws-sdk/client-rekognition";

// これの発火タイミング知りたい
export const detectTextInImage = async (
  image: Buffer
): Promise<DetectTextCommandOutput> => {
  const rekognition = new Rekognition({ region: "ap-northeast-1" });

  const params: DetectTextCommandInput = {
    Image: {
      Bytes: image,
    },
  };

  try {
    const command = new DetectTextCommand(params);
    const result = await rekognition.send(command);
    return result;
  } catch (error) {
    console.error("DetectText failed:", error);
    throw error;
  }
};

// // このメソッドを使用する例
// (async () => {
//   try {
//     const imageBuffer: Buffer = ...; // 画像データを適切に読み込んでください
//     const result = await detectTextInImage(imageBuffer);
//     console.log("Text detection result:", result);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
