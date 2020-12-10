const express = require('express');
const path = require('path');
const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();
var convert = require('cyrillic-to-latin');
const fetch = require('node-fetch');
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});
// var bodyParser = require('body-parser')

// app.use(bodyParser.json())

app.get('/', function (req, res) {

    res.redirect('https://www.sa-mp-translate.com');

});

app.get('/lang-to-russian', function (req, res) {

    res.redirect('https://www.sa-mp-translate.com');

});

app.get('/lang-to-english', function (req, res) {

    res.redirect('https://www.sa-mp-translate.com');

});

app.get('/lang-to-spanish', function (req, res) {

    res.redirect('https://www.sa-mp-translate.com');

});

app.get('/lang-to-hindi', function (req, res) {

    res.redirect('https://www.sa-mp-translate.com');

});

app.get('/lang-to-urdu', function (req, res) {

    res.redirect('https://www.sa-mp-translate.com');

});


app.post('/lang-to-russian', function (req, res) {

    original_msg = req.body.message;
    player_id = req.body.playerid;
    res_url = req.body.response_url;
    console.log('This is original msg ' + original_msg)
    
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
                     
        todo = {
                "detectedLanguageCode": language, 
                "translatedLanguageCode": 'ru',
                "latinTranslatedMessage": convert(response),
                "crylicTranslatedMessage": response
            };

            res.send(todo);
                        
    })

        .catch((err) => {   
            console.log(err);

        })

})}
);


app.post('/lang-to-english', function (req, res) {

    original_msg = req.body.message;
    console.log('This is original msg ' + original_msg)
    
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
        
        todo = {
                "detectedLanguageCode": language, 
                "translatedLanguageCode": 'en',
                "latinTranslatedMessage": response,
                "crylicTranslatedMessage": 'NULL'
            };

            res.send(todo);
                        
    })
        .catch((err) => {   
            console.log(err);

        })

})}
);


app.post('/lang-to-spanish', function (req, res) {

    original_msg = req.body.message;
    console.log('This is original msg ' + original_msg)
    
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

        todo = {
                "detectedLanguageCode": language, 
                "translatedLanguageCode": 'es',
                "latinTranslatedMessage": response,
                "crylicTranslatedMessage": 'NULL'
            };

            res.send(todo);
                        
    })

        .catch((err) => {   
            console.log(err);

        })

})}
);


app.post('/lang-to-urdu', function (req, res) {

    original_msg = req.body.message;
    console.log('This is original msg ' + original_msg)
    
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

        todo = {
                "detectedLanguageCode": language, 
                "translatedLanguageCode": 'ur',
                "latinTranslatedMessage": 'NULL',
                "crylicTranslatedMessage": response
            };

            res.send(todo);
                        
    })

        .catch((err) => {   
            console.log(err);

        })

})}
);


app.post('/lang-to-hindi', function (req, res) {

    original_msg = req.body.message;
    console.log('This is original msg ' + original_msg)
    
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

        todo = {
                "detectedLanguageCode": language, 
                "translatedLanguageCode": 'hi',
                "latinTranslatedMessage": 'NULL',
                "crylicTranslatedMessage": response
            };

            res.send(todo);
                        
    })

        .catch((err) => {   
            console.log(err);

        })

})}
);

app.post('/lang-to-chinese', function (req, res) {

    original_msg = req.body.message;
    console.log('This is original msg ' + original_msg)
    
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

        
    translateText(original_msg, 'zh')
        
    .then((response) => {

        todo = {
                "detectedLanguageCode": language, 
                "translatedLanguageCode": 'zh',
                "latinTranslatedMessage": 'NULL',
                "crylicTranslatedMessage": response
            };

            res.send(todo);
                        
    })

        .catch((err) => {   
            console.log(err);

        })

})}
);

app.listen(process.env.PORT, () => console.log('Server started on ' + process.env.PORT ))
// app.listen(3000, () => console.log('Server started on ' + 3000 ))
