song1 = "";
song2 = "";

function preload(){
song1 = loadSound("OMG.mp3");
song2 = loadSound("music.mp3");
}
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function setup(){
    canvas = createCanvas(600 , 500);
    canvas.position(330,200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses)
}

function modelLoaded(){
    console.log("PoseNet Is Intialized")
}
function gotPoses(results){
    if(results.length>0){
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX: " + leftWristX + "leftWristY: " + leftWristY);
        console.log("rightWristX: " + rightWristX + "rightWristY: " + rightWristY);
    }
}
function draw() {
    image(video , 0 , 0 , 600 , 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist > 0.2){
        circle(leftWristX , leftWristY , 20);
        song2.stop();
        song1.play();
        document.getElementById("Song").innerHTML = "Playing OMG Song";
    }
    if(scoreRightWrist > 0.2){
            circle(rightWristX , rightWristY , 20);
            song1.stop();
            song2.play();
            document.getElementById("Song").innerHTML = "Playing Harry Potter Song";
        }
    
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

