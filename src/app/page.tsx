"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { detectTextInImage } from "./lib/detectTextInImage";

const Home = () => {
  const [captureImage, setCaptureImage] = useState<string>();
  const [rearCameraStream, setRearCameraStream] = useState<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoRef.current!.srcObject = stream;
        setRearCameraStream(stream);
      })
      .catch((error) => {
        console.error("カメラストリーミングに失敗しました: ", error);
      });
    // detectTextInImage(captureImage.buffered);
  }, []);

  const handleClick = () => {
    if (videoRef.current === null) return;
    const { videoWidth, videoHeight } = videoRef.current;

    if (canvasRef.current === null) return;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    const rearContext = canvasRef.current.getContext("2d");

    if (rearContext === null) return;

    rearContext.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    setCaptureImage(canvasRef.current.toDataURL("image/png"));
  };

  return (
    <main style={cameraContainerStyle}>
      <video ref={videoRef} autoPlay />
      <button onClick={handleClick}>撮影</button>
      <canvas ref={canvasRef} width={600} height={450} />
    </main>
  );
};

export default Home;

const cameraContainerStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
