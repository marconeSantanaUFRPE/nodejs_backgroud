const express = require("express")
const bodyParser = require("body-parser")

const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var porta = process.env.PORT || 8089;


app.listen(porta, function(){
    
    console.log("Rodando")

})


app.set('view engine', 'ejs')

app.get('/',(req,res)=>{

    res.render("index.ejs")

})

app.get('/reg', (req, res)=>{

    res.render('registrar.ejs')

})

app.get('/ln', (req, res)=>{

    res.render('login.ejs')

})



app.post("/cadastrar_react_teste", (req,res) =>{


    var email = req.body["email"];
    
    var senha = req.body["senha"];
    
    
    //mover control - chamar banco 
    var mysql = require("mysql");
    connection = mysql.createConnection({
        host: "34.95.179.19",
        user: "admin",
        port: "3306",
        password: "mortadela1",
        database: "nodedb"
        
    
    })
    connection.connect()

   
    var inserir = "INSERT INTO conta(email,senha) VALUES ('"+ email + "'" + "," + "'" + senha + "');"
    connection.query(inserir, function(err,row,fields){

        if(err) throw err;
        console.log("salvou ")
        connection.end();
        res.send("Cadastro Realizado Com Sucesso")
        //res.redirect("/")
        
    });
    
   

});


app.post("/cadastrar" ,(req,res) =>{

    
    var mysql = require("mysql");
    connection = mysql.createConnection({
        host: "34.95.179.19",
        user: "admin",
        port: "3306",
        password: "mortadela1",
        database: "nodedb"
        
    
    })
    connection.connect()
        
    var email = req.body["email"];
    var senha = req.body["senha"];
    var inserir = "INSERT INTO conta(email,senha) VALUES ('"+ email + "'" + "," + "'" + senha + "');"
        
        
    connection.query(inserir,function(err,row,fields){

        if(err) throw err;
        console.log("Cadastro Realizado")
        connection.end();
        res.redirect("/")

        })
    
});

app.post("/login" ,(req,res)=>{


    var mysql = require("mysql");
    connection = mysql.createConnection({
        host: "34.95.179.19",
        user: "admin",
        port: "3306",
        password: "mortadela1",
        database: "nodedb"
        
    
    })
    connection.connect()

    var email_formulario = req.body["email"];
    var senha_formulario = req.body["senha"];
    
    var email_banco;
    var senha_banco;

    var query = "SELECT id,email,senha FROM conta WHERE conta.email ='"+email_formulario+"';";
    //console.log(query)
    connection.query(query,function(err,row,fields){

        if(err) throw err;
        //console.log(row)
        id_banco = (row[0]["id"])
        email_banco = (row[0]["email"])
        senha_banco = (row[0]["senha"])
        
        //Informações recuperadas do banco
        res.render("inicio.ejs",{"id":id_banco, "email":email_banco,"senha":senha_banco})

        connection.end();
        
        })
           
    })








