module.exports = {
    hrPool: {
        user          : "TEST",
        password      : "1234",
        connectString : "(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = 172.17.0.2)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = 172.17.0.2)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))",
        poolMin: 10,
        poolMax: 10,
        poolIncrement: 0
    },
    jwtsecret: {
        secret: "mia_p2"
    },
    hashword:{
        salt: "mia_p2"
    }

}