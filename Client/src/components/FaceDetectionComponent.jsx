import React, { useRef, useEffect } from 'react';
import { Box, AspectRatio } from '@chakra-ui/react';
import * as FaceApi from 'face-api.js';

export const FaceDetectionComponent = () => {
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    startVideo();
    videoRef && loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadModels = async () => {
    try {
      await Promise.all([
        FaceApi.nets.tinyFaceDetector.loadFromUri('/models'),
        FaceApi.nets.faceLandmark68Net.loadFromUri('/models'),
        FaceApi.nets.faceRecognitionNet.loadFromUri('/models'),
        FaceApi.nets.faceExpressionNet.loadFromUri('/models'),
      ]);
      faceMyDetect();
    } catch (error) {
      console.error('Error loading face-api.js models:', error.message);
    }
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      const detections = await FaceApi
        .detectAllFaces(videoRef.current, new FaceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      canvasRef.current.innerHTML = FaceApi.createCanvasFromMedia(videoRef.current);
      FaceApi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });

      const resized = FaceApi.resizeResults(detections, {
        width: 940,
        height: 650,
      });

      FaceApi.draw.drawDetections(canvasRef.current, resized);
      FaceApi.draw.drawFaceLandmarks(canvasRef.current, resized);
      FaceApi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 1000);
  };

  return (
    <Box className="face-api-component" p="4">
      <Box className="video-container" mb="4" position="relative">
        <AspectRatio ratio={16 / 9} style={{ minWidth: '300px', minHeight: '200px' }}>
          <video crossOrigin="anonymous" ref={videoRef} autoPlay />
        </AspectRatio>
        <canvas
          ref={canvasRef}
          width="940"
          height="650"
          className="canvas-element"
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      </Box>
    </Box>
  );
};
