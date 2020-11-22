const express = require('express');
const path = require('path');
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();
var convert = require('cyrillic-to-latin');
const fetch = require('node-fetch');

// Your credentials
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.post('/lang-to-russian', function (req, res) {

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
            
        //Send the translated message to the server  

        .then((res) => {
            // console.log('this is your message in Russian ' + res);                                 

            // Convert the Cryllic Russian message to Latin
                
            crylic_russian_chat = res;
            latin_russian_chat = convert(res);

            todo = {
                "detectedLanguageCode": language,
                "translatedLanguageCode": 'ru',
                "playerID": player_id,
                "latinTranslatedMessage": latin_russian_chat,
                "crylicTranslatedMessage": crylic_russian_chat
            };
            
            app.post('/to', function (req, res) {
                res.send(todo);
                console.log(req.params);
              })
            // console.log('This is your message in readable russian ' + latin_russian_chat);

            // Store current user

            // Get current user 

      
        })

        .catch((err) => {   
            console.log(err);


        });

        //end of send translation 
    } 
}) 

        res.redirect(307, '/to')


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

        .then((res) => {
            // console.log('this is your message in Russian ' + res);                                 

            // Convert the Cryllic Russian message to Latin
                
            latin_english_chat = res;

            let todo = {
                "detectedLanguageCode": language,
                "translatedLanguageCode": 'en',
                "playerID": player_id,
                "latinTranslatedMessage": latin_english_chat
            };
            
            
            fetch(res_url, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => console.log("Original message " + original_msg + "\n" + "Translated Message " + latin_russian_chat));

            // console.log('This is your message in readable russian ' + latin_russian_chat);

            // Store current user

            // Get current user 

      
        })

        .catch((err) => {   
            console.log(err);


        });

        //end of send translation 
    } 
}) 

    res.send('Success! POST request with translation has been sent to ' + res_url)


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

        .then((res) => {
            // console.log('this is your message in Russian ' + res);                                 

            // Convert the Cryllic Russian message to Latin
                
            latin_spanish_chat = res;

            let todo = {
                "detectedLanguageCode": language,
                "translatedLanguageCode": 'es',
                "playerID": player_id,
                "latinTranslatedMessage": latin_spanish_chat
            };
            
            
            fetch(res_url, {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: { 'Content-Type': 'application/json' }
            }).then(res => console.log("Original message " + original_msg + "\n" + "Translated Message " + latin_spanish_chat));

            // console.log('This is your message in readable russian ' + latin_russian_chat);

            // Store current user

            // Get current user 

      
        })

        .catch((err) => {   
            console.log(err);


        });

        //end of send translation 
    } 
}) 

    res.send('Success! POST request with translation has been sent to ' + res_url)


})


app.listen(process.env.PORT , () => console.log('Server started on ' + process.env.PORT ))
