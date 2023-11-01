import React from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: React.FC<Props> = ({ title, videoUrl }) => {
  const [videoData, setVideoData] = React.useState({
    otp: "",
    playbackInfo: "",
  });

  
  React.useEffect(() => {
   axios
      .post(`http://localhost:8000/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res) => {
        setVideoData(res.data);        
      });
  }, [videoUrl]);

  

  return (
    <div style={{ paddingTop: "56.25%", position: "relative", overflow:'hidden' }}>
      {videoData?.otp && videoData?.playbackInfo !== "" && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=NiBxyOVOIF6sY5UO`}
          style={{ border: 0, width: "100%", height: "100%", left:0,top:0 , position:'absolute'}}
          allow="encrypted-media"
          allowFullScreen={true}></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
