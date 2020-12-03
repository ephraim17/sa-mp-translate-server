const express = require('express');
const path = require('path');
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();
var convert = require('cyrillic-to-latin');
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

app.post('/lang-to-russian', function (req, res) {

    original_msg = req.body.message;

    const detectLanguage = async (text) => {  
        try {     
            let response = await translate.detect(text);    
            return response[0].language;    
        } catch (error) {         
            console.log(`Error at detectLanguage --> ${error}`);               
            return 0;  
        }                   
    }     

    detectLanguage(original_msg)              

    .then((language) => {                                          
        console.log('The request language is => '+ language); 

    if (language != 'ru') {

        //Translate the English messages to Russian
    
        const translateText = async (text, targetLanguage) => {                    
            try {                  
                let [response] = await translate.translate(text, targetLanguage);      
                return response;             
            } catch (error) {                                           
                console.log(`Error at translateText --> ${error}`);     
                return 0;                                       
            }            
        };

        translateText(original_msg, 'ru')
        .then((translatedresponse) => {

            crylic_russian_chat = translatedresponse;
            latin_russian_chat = convert(translatedresponse);

            todo = {
                "detectedLanguageCode": language,
                "translatedLanguageCode": 'ru',
                "latinTranslatedMessage": latin_russian_chat,
                "crylicTranslatedMessage": crylic_russian_chat
            };


            res.send(todo)
            
        })

        
        // res.send('ok')
        .catch((err) => {   
            console.log(err);
        });
    }
}) 
});


app.post('/lang-to-english', function (req, res) {

    original_msg = req.body.message;
    player_id = req.body.playerid;
    res_url = req.body.response_url;

 
    const detectLanguage = async (text) => {  
        try {     
            let response = await translate.detect(text);    
            return response[0].language;    
        } catch (error) {         
            console.log(`Error at detectLanguage --> ${error}`);               
            return 0;  
        }                   
    }             
    detectLanguage(original_msg)               
    .then((language) => {                                          
        console.log('The request language is => '+ language); 

    if (language != 'en') {

        //Translate the messages to English

        const translateText = async (text, targetLanguage) => {                    

            try {                  
                let [response] = await translate.translate(text, targetLanguage);      

                return response;             
 
            } catch (error) {                                           
                console.log(`Error at translateText --> ${error}`);
                    
                return 0;                                       
            }            
        };

        translateText(original_msg, 'en')
            
        //Send the translated message to the server  

        .then((translatedresponse) => {
            // console.log('this is your message in Russian ' + res);                                 

            // Convert the Cryllic Russian message to Latin
                
            latin_english_chat = translatedresponse;

            todo = {
                "detectedLanguageCode": language,
                "translatedLanguageCode": 'en',
                "playerID": player_id,
                "latinTranslatedMessage": latin_english_chat
            };
            
            res.send(todo);

      
        })

        .catch((err) => {   
            console.log(err);


        });

        //end of send translation 
    } 
}) 
})

app.post('/lang-to-spanish', function (req, res) {

    original_msg = req.body.message;
    player_id = req.body.playerid;
    res_url = req.body.response_url;

 
    const detectLanguage = async (text) => {  
        try {     
            let response = await translate.detect(text);    
            return response[0].language;    
        } catch (error) {         
            console.log(`Error at detectLanguage --> ${error}`);               
            return 0;  
        }                   
    }             
    detectLanguage(original_msg)               
    .then((language) => {                                          
        console.log('The request language is => '+ language); 

    if (language != 'es') {

        //Translate the messages to Spanish

        const translateText = async (text, targetLanguage) => {                    

            try {                  
                let [response] = await translate.translate(text, targetLanguage);      

                return response;             
 
            } catch (error) {                                           
                console.log(`Error at translateText --> ${error}`);
                    
                return 0;                                       
            }            
        };

        translateText(original_msg, 'es')
            
        //Send the translated message to the server  

        .then((translatedresponse) => {
            // console.log('this is your message in Russian ' + res);                                 

            // Convert the Cryllic Russian message to Latin
                
            latin_spanish_chat = translatedresponse;

            todo = {
                "detectedLanguageCode": language,
                "translatedLanguageCode": 'es',
                "playerID": player_id,
                "latinTranslatedMessage": latin_spanish_chat
            };
            
            res.send(todo);
      
        })

        .catch((err) => {   
            console.log(err);


        });

        //end of send translation 
    } 
}) 
})


app.listen(process.env.PORT, () => console.log('Server started on ' + process.env.PORT ))
