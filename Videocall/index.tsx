// @ts-nocheck
import React, { createElement } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";
import "./Videocall.css";
import { borderBottomLeftRadius } from "html2canvas/dist/types/css/property-descriptors/border-radius";
import { border } from "@mui/system";
const App = () => {
  const [shareAble, setShareable] = useState(false);
  const [show, setShow] = useState(false);
  const [startVideoCall, setstartVideoCall] = useState(false);
  var isSharingEnabled = false;
  var isMuteVideo = false;
  var isMuteAudio = false;

  var shareAbleScreen = false;



  let options = {
    appId: "45af6e6a39784baebf0be75ad36b35cc",
    channel: "VIDEO CALL",
    token:
      "007eJxTYOA/UfpUQHD5Yfmqzuehj4IPGiTaO2SbaO+uv7BU1iW7IUaBwcQ0Mc0s1SzR2NLcwiQpMTUpzSAp1dw0McXYLMnYNDmZedaN5IZARga5RG5GRgYIBPG5GMI8XVz9FZwdfXwYGACfGh7M",
    uid: 0,
  };

  let userArray = [];
  let videoArray = [];
  let channelParameters = {
    localAudioTrack: null,
    localVideoTrack: null,
    remoteAudioTrack: null,
    remoteVideoTrack: null,
    remoteUid: null,
  };

  var isHighRemoteVideoQuality = false;
  const joinclick = async () => {
    setstartVideoCall(true);
    setShow(true);
    const agoraEngine = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    const localPlayerContainer = document.createElement("div");

    localPlayerContainer.id = options.uid;
    localPlayerContainer.style.width = "100%";
    localPlayerContainer.style.height = "100%";
    localPlayerContainer.style.zIndex = "0";
    localPlayerContainer.style.display = "flex";
    localPlayerContainer.style.flexDirection = "column";
    localPlayerContainer.style.justifyContent = "center";
    agoraEngine.enableDualStream();

    await agoraEngine.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );

    var constraints = (window.constraints = { audio: true, video: true });
    await navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        var audioTracks = stream.getAudioTracks();
        console.log("Using video device: " + audioTracks[0].label);
        channelParameters.localAudioTrack = AgoraRTC.createCustomAudioTrack({
          mediaStreamTrack: audioTracks[0],
        });

        var videoTracks = stream.getVideoTracks();
        console.log("Using video device: " + videoTracks[0].label);
        channelParameters.localVideoTrack = AgoraRTC.createCustomVideoTrack({
          mediaStreamTrack: videoTracks[0],
        });
      })

      .catch(function (error) {
        console.log(error);
      });

    agoraEngine.on("user-published", async (user, mediaType) => {
      await agoraEngine.subscribe(user, mediaType);
      console.log(mediaType, "subscribe success");

      if (mediaType == "video") {
        channelParameters.remoteVideoTrack = user.videoTrack;

        console.log(user.videoTrack, "hurrttt");

        channelParameters.remoteAudioTrack = user.audioTrack;

        channelParameters.remoteUid = user.uid.toString();

        channelParameters.remoteUid = user.uid.toString();

        const Remoteid = document.getElementById("remotevideo");
          Remoteid.style.display = "grid";
          Remoteid.style.gridTemplateColumns = "230px 230px";
          Remoteid.style.gridAutoRows = "230px";
          Remoteid.style.position = "relative";
          Remoteid.style.gap = "20px";
          Remoteid.style.width = "100%";
          Remoteid.style.height = "100%";
          Remoteid.style.overflow = "scroll";
          Remoteid.style.boxShadow = "3px 3px 10px black";
          Remoteid.style.borderRadius = "25px";
          Remoteid.style.margin = " 0 25px";
          Remoteid.style.flexDirection = "column";

        channelParameters.remoteVideoTrack.play(Remoteid);

        let channelAUdio = channelParameters.remoteAudioTrack;

        let channelVideo = channelParameters.remoteVideoTrack;

        userArray.push(channelVideo);

        if (channelAUdio !== undefined) {
          videoArray.push(channelAUdio);
        }
        // ================ Screen Share 1 ===============//
        
        document.getElementById("remotevideo").onclick = function (id) {

          console.log("Entered main Function")

          const functionalId = id.srcElement.id;

          const ClickedID = document.getElementById(functionalId);
          
          ClickedID.style.width = "100%";
          ClickedID.style.height = "100%";
          ClickedID.style.position = "relative";
          ClickedID.style.borderRadius = "25px";

          const vc_Players = document.getElementById("vc_Players");

          const mainContainer = document.createElement("div");
            mainContainer.style.width = "100%";
            mainContainer.style.height = "100%";
            mainContainer.style.display = "flex";

          const asideLeft = document.createElement("div");
            asideLeft.style.width = "50%";
            asideLeft.style.height = "100%";

          const leftScreenShare = document.createElement("div");
            leftScreenShare.id = "ls-123";
            leftScreenShare.style.width = "100%";
            leftScreenShare.style.border = "5px solid red";
            leftScreenShare.style.height = "50%";
            leftScreenShare.style.borderRadius = "25px";

          const leftLocalUser = document.createElement("div");
            leftLocalUser.style.width = "100%";
            leftLocalUser.style.height = "50%";

          const asideRight = document.createElement("div");
            asideRight.style.width = "50%";
            asideRight.style.height = "100%";
            asideRight.style.height = "5px solid green";


            if(shareAbleScreen===false){
              console.log(shareAbleScreen,"1")
              vc_Players.append(mainContainer);
              mainContainer.append(asideLeft);
              mainContainer.append(asideRight);
              asideLeft.append(leftScreenShare);
              ClickedID.style.width = "100%";
              ClickedID.style.height = "100%";
  
              leftScreenShare.append(ClickedID);
              localUser_wrapper.style.display = "none";
              remote_vc_div.style.display = "none";
              vc_controllers.style.display = "none";

              asideLeft.append(leftLocalUser);
              leftLocalUser.append(lcvc);
              asideRight.append(remotevideo);
              shareAbleScreen = true;
            }

          // ================ Screen Share 2 =============== //
          if(shareAbleScreen===true){
            console.log(shareAbleScreen,"2")

            document.getElementById("ls-123").onclick = function (id) { //OnClick Function For Screen Share view

              mainContainer.style.display = "none";
              asideLeft.style.display = "none";
              asideRight.style.display = "none";
  
              const functionalId = id.srcElement.id;
  
              console.log("Entered In Second Screen View")
  
              // Remote User Clicked ID
              const yui = document.getElementById(functionalId);
  
              const remote_vc_div = document.getElementById("remote_vc_div"); //Remote Users main div

              remote_vc_div.style.display = "none";
  
              const vc_Players = document.getElementById("vc_Players"); //Main Div To append Clicked Div/abc is appended in side this div
  
              vc_Players.style.display = "flex";
              vc_Players.style.justifyContent = "center";
              vc_Players.style.justifyContent = "center";
  
              const abc = document.createElement("div");
              abc.id = "main-div23";
              abc.style.width = "100%";
              abc.style.height = "100%";
  
              const localUser_wrapper = document.getElementById("localUser_wrapper");
              localUser_wrapper.style.display = "none";
  
              abc.style.zIndex = "0";
              abc.style.position = "relative";
  
              const bottomDiv = document.createElement("div");
              //Screen Share View Bottom div to show Remote Users
              bottomDiv.style.width = "100%";
              bottomDiv.style.height = "150px";
              bottomDiv.style.zIndex = "1";
              bottomDiv.style.position = "absolute";
              bottomDiv.style.bottom = "0";
              bottomDiv.style.display = "flex";
              bottomDiv.style.alignItems = "center";
  
              const localUser = document.createElement("div"); // New Div Created to store Local user Window
              localUser.style.width = "150px";
              localUser.style.height = "150px";
              localUser.style.display = "flex";
              localUser.style.justifyContent = "center";
              localUser.style.alignItems = "center";
  
              const Controllers = document.getElementById("vc_controllers");
              // Controllers Div
              Remoteid.style.width = "1500px";
              Remoteid.style.display = "grid";
              Remoteid.style.alignItems = "center";
              Remoteid.style.gridAutoRows = "auto";
  
              const clickedUser = document.createElement("div");
              clickedUser.style.width = "200px";
              clickedUser.style.height = "200px";
              const lcvc = document.getElementById("lcvc");
  
              const remotevideo = document.getElementById("remotevideo");

                console.log("in ABC IF Part")
                Controllers.style.display = "none";
                lcvc.style.width = "150px";
                lcvc.style.height = "150px";
                localPlayerContainer.style.width = "150px";
                localPlayerContainer.style.height = "150px";
                yui.style.width = "100%";
                yui.style.height = "100%";
  
                Remoteid.style.display = "grid";
                Remoteid.style.width = "100%";
                Remoteid.style.gridTemplateColumns = "130px 130px";
                Remoteid.style.gridAutoRows = "130px";
  
                vc_Players.append(abc);
                abc.append(yui);
                abc.append(bottomDiv);
                bottomDiv.append(localUser);
  
                localUser.append(lcvc);
                bottomDiv.append(Remoteid);
                remotevideo.style.height = "150px";
                // shareAbleScreen = true;

              abc.onclick = function () {

                lcvc.style.width = "650px";
                lcvc.style.height = "600px";
                localPlayerContainer.style.width = "650px";
                localPlayerContainer.style.height = "600px";
                Controllers.style.display = "flex";
                Controllers.style.width = "100%";
  
                Remoteid.style.display = "grid";
                Remoteid.style.gridTemplateColumns = "200px 200px";
                Remoteid.style.gridAutoRows = "200px";
  
                Remoteid.style.width = "650px";
                Remoteid.style.height = "100%";
  
                yui.style.width = "200px";
                yui.style.height = "200px";
                yui.style.borderRadius = "25px";
        
                vc_Players.append(lcvc);
                remotevideo.style.height = "600px";
                vc_Players.append(remotevideo);
  
                Remoteid.append(yui);
                bottomDiv.id = "bottom-div23";
                bottomDiv.remove(localUser);
                abc.remove(bottomDiv);
                shareAbleScreen = false;
                console.log(shareAbleScreen,"3")

              };
            };
          }
      
        };



    

        agoraEngine.setStreamFallbackOption(channelParameters.remoteUid,1);
        document
          .getElementById(Remoteid.id)
          .addEventListener("click", function () {
            if (isHighRemoteVideoQuality == false) {
              agoraEngine.setRemoteVideoStreamType(
                channelParameters.remoteUid,
                0
              );
              isHighRemoteVideoQuality = true;
            } else {
              agoraEngine.setRemoteVideoStreamType(
                channelParameters.remoteUid,
                1
              );
              isHighRemoteVideoQuality = false;
            }
          });
      }

      if (mediaType == "audio") {
        channelParameters.remoteAudioTrack = user.audioTrack;
        channelParameters.remoteAudioTrack.play();
      }
      if (mediaType == "audio") {
        channelParameters.audioController = user.audioTrack;
      }
      agoraEngine.on("user-unpublished", (user) => {
        console.log(user.uid + "has left the channel");
        channelParameters.remoteAudioTrack.play();
      });

      document.getElementById("inItScreen").onclick = async function () {

        if (isSharingEnabled == false) {
          // Create a screen track for screen sharing.
          channelParameters.screenTrack =
            await AgoraRTC.createScreenVideoTrack();
          // Stop playing the local video track.
          channelParameters.localVideoTrack.stop();
          // Unpublish the local video track.
          await agoraEngine.unpublish(channelParameters.localVideoTrack);
          // Publish the screen track.
          await agoraEngine.publish(channelParameters.screenTrack);
          // Play the screen track on local container.
          channelParameters.screenTrack.play(localPlayerContainer);
          // Update the button text.
          document.getElementById(`inItScreen`).src =
            "https://cdn.iconscout.com/icon/free/png-256/stop-screen-share-1781754-1518292.png";
          // Update the screen sharing state.
          isSharingEnabled = true;
        } else {
          // Stop playing the screen track.
          channelParameters.screenTrack.stop();
          // Unpublish the screen track.
          await agoraEngine.unpublish(channelParameters.screenTrack);
          // Publish the local video track.
          await agoraEngine.publish(channelParameters.localVideoTrack);
          // Play the local video on the local container.
          channelParameters.localVideoTrack.play(localPlayerContainer);
          // Update the button text.
          document.getElementById(`inItScreen`).src =
            "http://cdn.onlinewebfonts.com/svg/img_375446.png";
          // Update the screen sharing state.
          isSharingEnabled = false;
        }
      };
      document.getElementById("muteVideo").onclick = async function () {
        if (isMuteVideo == false) {
          // Mute the local video.
          channelParameters.localVideoTrack.setEnabled(false);
          // Update the button text.
          document.getElementById(`muteVideo`).src ="https://icons.veryicon.com/png/o/miscellaneous/thick-linear-icon-library/videocam-off-1.png";
          isMuteVideo = true;
        }
         else {
          // Unmute the local video.
          channelParameters.localVideoTrack.setEnabled(true);
          // Update the button text.
          document.getElementById(`muteVideo`).src =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Video_camera_icon_svg.svg/1280px-Video_camera_icon_svg.svg.png";
          isMuteVideo = false;
        }
      };

      document.getElementById("muteAudio").onclick = async function () {
        if (isMuteAudio == false) {
          // Mute the local audio.
          channelParameters.localAudioTrack.setEnabled(false);
          // Update the button text.
          document.getElementById(`muteAudio`).src =
            "https://cdn.iconscout.com/icon/free/png-256/mic-off-1767813-1502393.png";
          isMuteAudio = true;
        } else {
          // Unmute the local audio.
          channelParameters.localAudioTrack.setEnabled(true);
          // Update the button text.
          document.getElementById(`muteAudio`).src =
            "https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png";
          isMuteAudio = false;
        }
      };

      document.getElementById("leave").onclick = async function () {
        const Remoteid = document.getElementById("remotevideo");
        channelParameters.localAudioTrack.close();
        channelParameters.localVideoTrack.close();
        removeVideoDiv(Remoteid.id);
        removeVideoDiv(localPlayerContainer.id);
        await agoraEngine.leave();
      };
    });

    const localuserappend = document.getElementById("lcvc");

    // const firstView = () => {
    //   localuserappend.style.display = "block";
    //   const Remoteid = document.getElementById("remotevideo");
    //   Remoteid.style.display = "block";
    //   document.getElementById("main-div23").style.display = "none";
    //   document.getElementById("bottom-div23").style.display = "none";
    // };

    // const secondView = () => {
    //   localuserappend.style.display = "none";
    //   const Remoteid = document.getElementById("Remoteid");
    //   Remoteid.style.display = "none";
    //   document.getElementById("main-div23").style.display = "block";
    //   document.getElementById("bottom-div23").style.display = "block";
    // };

    localuserappend.append(localPlayerContainer);
    await agoraEngine.publish([
      channelParameters.localAudioTrack,
      channelParameters.localVideoTrack,
    ]);

    console.log(channelParameters.localVideoTrack, "publish success!");
    console.log(channelParameters.localAudioTrack, "publish success!");

    channelParameters.localVideoTrack.play(localPlayerContainer);
    console.log("publish success!");
  };

  function removeVideoDiv(elementId) {
    console.log("Removing " + elementId + "Div");
    let Div = document.getElementById(elementId);
    if (Div) {
      Div.remove();
    }
  }

  return (
    <div className="vc_sdk_container" id="vc_sdk_container">
      <div className="row">
        <div className="buttons_container">
          {show ? (
            <div className="vc_Players" id="vc_Players">
              <div className="localUser_wrapper" id="localUser_wrapper">


    <div id="lcvc"> 
    <div className="vc_controllers" id="vc_controllers">
      <div className="img_cont">
        <img
          src="http://cdn.onlinewebfonts.com/svg/img_375446.png"
          alt=""
          id="inItScreen"
          className="Controller_decore"
        />
      </div>

      <div className="img_cont">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Video_camera_icon_svg.svg/1280px-Video_camera_icon_svg.svg.png"
          alt=""
          id="muteVideo"
          className="Controller_decore"
        />
      </div>

      <div className="img_cont">
        <img
          src="https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png"
          alt=""
          id="muteAudio"
          className="Controller_decore"
        />
      </div>

      <div className="img_cont">
        <img
          src="https://static.thenounproject.com/png/2623556-200.png"
          className="Controller_decore"
          id="leave"
          alt=""
        />
      </div>
    </div>
</div>




   
   


            



              </div>
              <div className="remote_vc_div" id="remote_vc_div">
                <div id="remotevideo" className="maped_users"></div>
              </div>
            </div>
          ) : (
            <>
              {startVideoCall === false ? (
                <h2 className="left-align">Culturefy Video Call</h2>
              ) : null}
              <button type="button" onClick={joinclick} className="joinButton">
                Join Meeting
              </button>
            </>
          )}
          <br />
        </div>
      </div>
    </div>
  );
};

export default App;
