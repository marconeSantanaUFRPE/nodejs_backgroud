

module.exports =  function chamarBanco(){

    const mysql = require("mysql2/promise");
    const connection =  mysql.createPool({
        host: "34.95.179.19",
        user: "admin",
        port: "3306",
        password: "mortadela1",
        database: "nodedb",
        waitForConnections:true
        
    
    })


    
    return connection
}