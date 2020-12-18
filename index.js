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
const translit = require('latin-to-cyrillic')
// var bodyParser = require('body-parser')

// app.use(bodyParser.json())

app.get('/', function (req, res) {

    res.redirect('https://www.sa-mp-translate.com');

});

app.get('/en-to-ru', function (req, res) {

    res.redirect('https://www.sa-mp-translate.com');

});

app.get('/ru-to-en', function (req, res) {

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


app.post('/en-to-ru', function (req, res) {

    original_msg = req.body.message;
    api_key = req.body.apikey;
    console.log('This is original msg ' + original_msg)
    console.log('This is apikey ' + api_key);
    
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



app.post('/ru-to-en', function (req, res) {

    original_msg = req.body.message;
    api_key = req.body.apikey;
    console.log(api_key);

 
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

    if ((language = 'ru') || (language = 'sl')) {

        if(/[а-яА-ЯЁё]/.test(original_msg)) {

            console.log('crylic')

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

        } else {

            console.log('no crylic')
            original_msg = translit(original_msg);

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

        }

        //Translate the messages to English


        //end of send translation 
    } 
}) 
});


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

        if ((language = 'ru') || (language = 'sl')) {

            if(/[а-яА-ЯЁё]/.test(original_msg)) {
    
                console.log('crylic')
    
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
                        
                    latin_english_chat = translatedresponse;
            
                    todo = {
                        "detectedLanguageCode": language,
                        "translatedLanguageCode": 'es',
                        "latinTranslatedMessage": latin_english_chat
                    };
                    
                    res.send(todo);
            
              
                })
            
                .catch((err) => {   
                    console.log(err);
            
            
                });
    
            } else {
    
                console.log('no crylic')
                original_msg = translit(original_msg);
    
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
                        
                    latin_english_chat = translatedresponse;
            
                    todo = {
                        "detectedLanguageCode": language,
                        "translatedLanguageCode": 'es',
                        "latinTranslatedMessage": latin_english_chat
                    };
                    
                    res.send(todo);
            
              
                })
            
                .catch((err) => {   
                    console.log(err);
            
            
                });
    
            }
    
            //Translate the messages to English
    
    
            //end of send translation 
        } 
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
