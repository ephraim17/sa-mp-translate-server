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
    console.log('This is original msg ' + original_msg)
    
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
        
    .then((response) => {

           
        crylic_russian_chat = response;
           
        latin_russian_chat = convert(response);

           
        todo = {
                // "detectedLanguageCode": language, 
                "translatedLanguageCode": 'ru',
                "latinTranslatedMessage": latin_russian_chat,
                "crylicTranslatedMessage": crylic_russian_chat
            };

            res.json(todo);
                        
    })

        .catch((err) => {   
            console.log(err);

        })

});


app.post('/lang-to-english', function (req, res) {

    original_msg = req.body.message;
    console.log('This is original msg ' + original_msg)
    
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

        
    translateText(original_msg, 'en')
        
    .then((response) => {

           
        latin_english_chat = response;

        todo = {
                // "detectedLanguageCode": language, 
                "translatedLanguageCode": 'en',
                "latinTranslatedMessage": latin_english_chat,
                "crylicTranslatedMessage": 'NULL'
            };

            res.json(todo);
                        
    })

        .catch((err) => {   
            console.log(err);

        })

});



    
    
app.post('/lang-to-spanish', function (req, res) {

    original_msg = req.body.message;
    console.log('This is original msg ' + original_msg)
    
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

        
    translateText(original_msg, 'es')
        
    .then((response) => {

           
        latin_spanish_chat = response;

        todo = {
                // "detectedLanguageCode": language, 
                "translatedLanguageCode": 'es',
                "latinTranslatedMessage": latin_spanish_chat,
                "crylicTranslatedMessage": 'NULL'
            };

            res.json(todo);
                        
    })

        .catch((err) => {   
            console.log(err);

        })

});


app.post('/lang-to-urdu', function (req, res) {

    original_msg = req.body.message;
    console.log('This is original msg ' + original_msg)
    
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

        
    translateText(original_msg, 'ur')
        
    .then((response) => {

           
        crylic_urdu_chat = response;

        todo = {
                // "detectedLanguageCode": language, 
                "translatedLanguageCode": 'ur',
                "latinTranslatedMessage": 'NULL',
                "crylicTranslatedMessage": crylic_urdu_chat
            };

            res.json(todo);
                        
    })

        .catch((err) => {   
            console.log(err);

        })

});

app.post('/lang-to-hindi', function (req, res) {

    original_msg = req.body.message;
    console.log('This is original msg ' + original_msg)
    
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

        
    translateText(original_msg, 'hi')
        
    .then((response) => {

           
        crylic_hindi_chat = response;

        todo = {
                // "detectedLanguageCode": language, 
                "translatedLanguageCode": 'hi',
                "latinTranslatedMessage": 'NULL',
                "crylicTranslatedMessage": crylic_hindi_chat
            };

            res.json(todo);
                        
    })

        .catch((err) => {   
            console.log(err);

        })

});

app.listen(process.env.PORT, () => console.log('Server started on ' + process.env.PORT ))
