export const startCamera = (videoElement: { srcObject: MediaStream }) => {
  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      videoElement.srcObject = stream;
      rearCameraStream = stream;
    })
    .catch((error) => {
      console.error("カメラストリーミングに失敗しました: ", error);
    });
};
