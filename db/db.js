const { Client } = require('pg');

class Database {
    constructor(config) {
        this.client = new Client(config);
    }

    connect() {
        return this.client.connect();
    }

    query(sql, args) {
        return this.client.query(sql, args);
    }

    close() {
        return this.client.end();
    }

    viewAllDepartments() {
        return this.query('SELECT * FROM department').then((res) => {
            console.table(res.rows);
        });
    }
}


module.exports = Database;