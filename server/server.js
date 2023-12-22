const { info } = require("console");
const http = require("http");
const url = require("url");
/* Permette di accedere a i file del server in lettura e scrittura */
const fs = require("fs");







var server = http.createServer(function(request, response){

    let indirizzo = request.headers.host + request.url;
    let infoUrl = url.parse(indirizzo, true);

    let header,contesto;
    let obj = "";
    
    switch (infoUrl.pathname){
                
        case "/save":
            obj = "";

            request.on("data", (dato)=>{
                obj += dato;
            });

            request.on("end", ()=>{

                // console.log(JSON.parse(obj));
                obj = JSON.parse(obj);

                let str = "Hai comprato una "+obj.marca+" "+obj.modello +", ecco le sue caratteristiche :\n"+
                        "Costo : "+obj.costo+"\n"+
                        "Categoria : "+obj.categoria+"\n"+
                        "Carburante : "+obj.alimentazione+"\n"+
                        "Potenza : "+obj.dat_tecnici.potenza+"\n"+
                        "Consumo al litro : "+obj.dat_tecnici.consumi+"\n\n";
                try{
                    fs.appendFileSync('../auto_vendute.txt', str);
                    
                } 
                catch (err) {
                    console.error(err);
                    response.writeHead(200, {"Content-type":"text/plain","Access-Control-Allow-Origin":"*"});
                    response.write(JSON.stringify({"risposta":"non è andata a buon fine"}));
                    response.end();
                }
                
                response.writeHead(200, {"Content-type":"text/plain","Access-Control-Allow-Origin":"*"});
                response.write(JSON.stringify({"risposta":"è andata a buon fine"}));
                response.end();
            });
                
        break;
        case "/cars":
            obj = "";

            request.on("data", (dato)=>{
                obj += dato;
            });

            request.on("end", ()=>{
               
                let file = JSON.parse(fs.readFileSync("../auto.json"));
                response.writeHead(200, {"Content-type":"text/plain","Access-Control-Allow-Origin":"*"});
                response.write(JSON.stringify(file));
                response.end();
            });
                
        break;

        case "/check":
            obj = "";

            request.on("data", (dato)=>{
                obj += dato;
            });

            request.on("end", ()=>{
                let si=false;

                obj=JSON.parse(obj);
                //console.log(obj);
                let file = JSON.parse(fs.readFileSync("credentials.json"));
                //console.log(file);

                file.forEach(element => {
                    if(element.mail == obj.mail && element.password == obj.password){
                        si=true;
                    }
                });

                response.writeHead(200, {"Content-type":"text/plain","Access-Control-Allow-Origin":"*"});
                if(si)
                {
                    response.write(JSON.stringify({"risposta":"ACCESSO CONSENTITO"}));
                }
                else
                {
                    response.write(JSON.stringify({"risposta":"ACCESSO NEGATO"}));
                }
                

                response.end();
                
            });
                
        break;

        case "/register":
            obj = "";

            request.on("data", (dato)=>{
                obj += dato;
            });

            request.on("end", ()=>{
                //console.log(JSON.parse(obj));
                let file = JSON.parse(fs.readFileSync("credentials.json"));
                
                file.push(JSON.parse(obj));
                try{
                    fs.writeFileSync("credentials.json", JSON.stringify(file));
                }
                catch(err){
                    console.error(err);
                    response.writeHead(200, {"Content-type":"text/plain","Access-Control-Allow-Origin":"*"});
                    response.write(JSON.stringify({"risposta":"non è andata a buon fine"}));
                    response.end();
                }
                
                response.writeHead(200, {"Content-type":"text/plain","Access-Control-Allow-Origin":"*"});
                response.write(JSON.stringify({"risposta":"è andata a buon fine"}));
                response.end();
                
            });
        break;

        
    }

    

});
server.listen(1337);
console.log("Il server è stato avviato sulla porta 1337");

//todo| Prelevo il file letto e lo invio al client |
function inviaFile(err,file){

    let contesto={ risp:this.risp,text:file,tipo:this.tipo,cod:200 }
    
    inviaRisposta(contesto)
}

function inviaRisposta(contesto){
    /*
        200-> successo
        400-> Richiesta non corretta
        401-> no autorizzazioni
        404-> risosrsa non trovata
        500-> Errore del server
    */

    header = {"Content-Type":contesto.tipo,
    "Access-Control-Allow-Origin":"*",} 
    contesto.risp.writeHead(contesto.cod,header);
    contesto.risp.write(contesto.text);
    contesto.risp.end();
}
