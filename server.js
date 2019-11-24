
const banco = require("./models/Mysql")
const express = require("express")
const bodyParser = require("body-parser")
const app = express()


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var porta = process.env.PORT || 8089;


 async function pegarusuario  (email_formulario,senha_formulario){

    var id_banco;
    var email_banco;
    var senha_banco;
    var connection =  banco()


    var query = "SELECT id,email,senha FROM Usuario WHERE Usuario.email ='"+email_formulario+"';";
    //console.log(query)
    
    

    async function getusuario(query) {

        const result =  connection.query(query);
       
          return result;
      }
      
    var conta = await getusuario(query)
    //console.log(a[0])
      
     /* connection.query (query,  function  (err, row,fields) {

            if(err) throw err;

            id_banco  =  (row[0]["id"])
            email_banco =  (row[0]["email"])
            senha_banco =  (row[0]["senha"])
            console.log(email_banco)
            connection.end();
            
        })
*/
        return (conta[0])       
    

}

async function pegarPessoa(id){

 
    var connection = banco()

    //console.log(id)
    var query = "SELECT nome,dataNascimento FROM Pessoa WHERE id_conta = '"+ id +"';"

    async function  getpessoa(query) {

        const result =  connection.query(query);
       
          return result;
      }
      
    var pessoa = await getpessoa(query)
    
    return (pessoa[0])


}

async function inserirUsuario(email,senha){

var  connection = banco()
var inserir = "INSERT INTO Usuario(email,senha) VALUES ('"+ email + "'" + "," + "'" + senha + "');"

    async function inserirUsuarioBanco(query){

        await connection.query(inserir)

    }

 var sinal = await inserirUsuarioBanco(inserir)
 return sinal

}


async function inserirPessoa(nome,data_nascimento,id_conta){

    connection = banco()
    var inserir = "INSERT INTO Pessoa(nome,dataNascimento,id_conta) VALUES ('"+ nome + "'" + "," + "'" + data_nascimento + "'" + ","+"'"+ id_conta +"');"
        
    
    async function inserirPessoaBanco(inserir){

        await connection.query(inserir)

    }
    
    var sinal = await inserirPessoaBanco(inserir)
    return sinal

    }
    

app.listen(porta, function(){
    console.log("Rodando API")
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
    
    var nome = req.body["nome"]
    var data_nascimento = req.body["data_nascimento"]
 
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

app.post("/cadastrar" ,async(req,res) =>{
  
    connection = banco()

    var email = req.body["email"];
    var senha = req.body["senha"];
    var nome = req.body["nome"];
    var data_nascimento = req.body["data_nascimento"]
    
    
    var inserir = await inserirUsuario(email,senha)
    var conta = await pegarusuario(email,senha)
    //id para colocar na tabela pessoa
    console.log(conta , "teste")
    
    id_conta = conta[0]["id"]
    
    var inserir_pessoa = await inserirPessoa(nome,data_nascimento,id_conta)

    res.redirect("/")
    
});

 app.post("/login", async(req,res)=>{

    var email_formulario = req.body["email"];
    var senha_formulario = req.body["senha"];
    var id_banco;
    var email_banco;
    var senha_banco;

    var conta = await pegarusuario(email_formulario,senha_formulario)
    
    id_banco = conta[0]["id"]
    email_banco = conta[0]["email"]
    senha_banco = conta[0]["senha"]
    
    var pessoa = await pegarPessoa(id_banco)
   
    var nome = pessoa[0]["nome"]
    var data_nascimento = pessoa[0]["dataNascimento"]
    
    res.render("inicio.ejs",{"id":id_banco, "email":email_banco,"senha":senha_banco, "data_nascimento":data_nascimento,"nome":nome})
    console.log("Login Realizado")
    console.log("Usuario: ", conta)
    console.log("Pessoa: ", pessoa)
        
    })
