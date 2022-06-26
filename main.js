Prediction_1 = ""
Prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

camera = document.getElementById("camera")

Webcam.attach("camera")

function take_snapshot(){
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = '<img id="capture_image" src = "'+data_uri+'">'

    });
}
console.log("ml5 version is",ml5.version)

model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/PhymMamF3/model.json",model_Loaded)

function model_Loaded()
{
    console.log("model loaded succesfully")
}

function speak_data(){
    synth = window.speechSynthesis;
    speak_data_1 = "The first Perdiction is"+Prediction_1
    speak_data_2 = "And the second Perdiction is"+Prediction_2
    utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
    synth.speak(utter_this)
}
function check()
{
    img = document.getElementById("capture_image")
    model.classify(img, gotResult)
}

function gotResult( error, result)
{
    if (error){
        console.error(error)
    }else
    {
        console.log(result)
        document.getElementById("abc").innerHTML = result[0].label
        document.getElementById("result_Guester_name_2").innerHTML = result[1].label
        Prediction_1 = result[0].label
        Prediction_2 = result[1].label
        speak_data()
        if(result[0].label == "Thumbs up")
        {
            document.getElementById("update_Guester").innerHTML = "&#128077;"
        }
        if(result[0].label == "Thumbs down")
        {
            document.getElementById("update_Guester").innerHTML = "&#128078;"
        }
        if(result[0].label == "Super")
        {
            document.getElementById("update_Guester").innerHTML = "&#128076;"
        }
        if(result[1].label == "Thumbs up")
        {
            document.getElementById("update_Guester_2").innerHTML = "&#128077;"
        }
        if(result[1].label == "Thumbs down")
        {
            document.getElementById("update_Guester_2").innerHTML = "&#128078;"
        }
        if(result[1].label == "Super")
        {
            document.getElementById("update_Guester_2").innerHTML = "&#128076;"
        }



    }

}