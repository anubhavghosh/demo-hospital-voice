var accessToken = "0a95a90855a64b1fb2ffa6fa5c7f0d01";
    var baseUrl = "https://api.dialogflow.com/v1/";
    $(document).ready(function() {
      $("#input").keypress(function(event) {
        if (event.which == 13) {
          event.preventDefault();
          send();
          this.value = '';
        }
      });
      $("#rec").click(function(event) {
        switchRecognition();
      });
     
      

    });

// Contact Details : KOLKATA KNOWLEDGE CAMPUS 124 B L Saha Road, Kolkata 700 053 Phone/Fax: +91 33 2403 2300/01 DURGAPUR KNOWLEDGE CAMPUS Arrah, Shibtala Via Muchipara, Durgapur 713 212 Phone/Fax: +91 343 253 3813-15

/*    var isAndroid = /(android)/i.test(navigator.userAgent);
    console.log("android Testing: "+isAndroid);
      if(!isAndroid)
      {
        location.assign("https://www.gilabs.co.in/");
      }
*/
    var recognition;
    function startRecognition() {   
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition ||
      window.msSpeechRecognition)();
      recognition.onstart = function(event) {
        updateRec();
      };
      recognition.onresult = function(event) {
        var text = "";
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
          }
          setInput(text);
        stopRecognition();
      };
      recognition.onend = function() {
        stopRecognition();
      };
      recognition.lang = "en-US";
      recognition.start();
    }
  
    function stopRecognition() {
      if (recognition) {
        recognition.stop();
        console.log("++RecognitionStopped");  
        recognition = null;
      }
      updateRec();
    }
    function switchRecognition() {
      if (recognition) {
        stopRecognition();
      } else {
        startRecognition();
      }
    }
    function setInput(text) {
      $("#input").val(text);
      send();
    }
    function updateRec() {
      $("#rec").text(recognition ? "Stop" : "Speak");
    }
    function send() {
     console.log("++insideSend()_Function"); 
           
            var text = $("#input").val();
            console.log("++ValueofText==>"+text); 
            $('.response').append('<span class="user">' + '<b>YOU:</b> '+ text + '</span>\r\n');   

            //conversation.push("Me: " + text + '\r\n');
      $.ajax({
           
        type: "POST",
           
        url: baseUrl + "query?v=20150910",
      //  console.log("++lineAfter_baseUrl");  
        contentType: "application/json; charset=utf-8",
        dataType: "json",
     //   console.log("++lineBefore_headers");  
        headers: {
      //    console.log("++lineBefore_Authorization"); 
          "Authorization": "Bearer " + accessToken
     //     console.log("++Authorization_Done"); 
        },
        data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
        success: function(data) 
                {
                  console.log("++Success");   
                  var respText = data.result.fulfillment.speech;
                  console.log("Respuesta: " + respText);
                  setResponse(respText);
                  responsiveVoice.speak(respText,"Hindi Female");
                  $("#response").scrollTop($("#response").height());
        },
        error: function() {
          console.log("++Error");  
          setResponse("Internal Server Error");
        }
      });
      //setResponse("Thinking...");
    }
    function setResponse(val) {
            $('.response').append('<span class="bot">' + '<b>BOT:</b> '+ val + '</span>\r\n');
            //conversation.push("AI: " + val + '\r\n<br><br>');
     // $("#response").text(conversation.join(""));
    }

    function setButton(val) {
      $('.response').append('<button class="quickButton" onclick= "setButtonVal(this.innerHTML)">' + val + '</button>\r\n');
            
    }

    function setButtonVal(i) {
      $("#input").val(i);
      send();
    }
   // var conversation = [];
    