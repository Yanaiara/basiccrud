const mysql = require('../mysql').pool;

exports.getAcmeCo = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM acmeco;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    usersAcmeCo: result.map(users => {
                        return {
                            id_acmeco: users.id_acmeco,
                            name: users.name,
                            cpf: users.cpf,
                        }
                    })
                }
                return res.status(200).send(response);
            }
        )
    })
};

exports.postAcmeCo = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO acmeco (name, cpf) VALUES (?,?)',
            [req.body.name, req.body.cpf],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    message: 'Funcionário cadastrado com sucesso!',
                    createdUser: {
                        id_acmeco: result.id_acmeco,
                        name: req.name,
                        cpf: req.name,
                    }
                }
                return res.status(201).send(response);
            }
        )
    });
};

exports.getOneAcmeCo = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM acmeco WHERE id_acmeco = ?;',
            [req.params.id_acmeco],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Não foi encontrado um funcionário cadastrado.'
                    })
                }
                const response = {
                    user: {
                        id_acmeco: result[0].id_acmeco,
                        name: result[0].name,
                        cpf: result[0].cpf,
                    }
                }
                return res.status(200).send(response);
            }
        )
    });
};

exports.deleteAcmeCo = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM acmeco WHERE id_acmeco = ?;`,
            [req.params.id_acmeco],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    message: 'Funcionário removido com sucesso.',
                    request: {
                        type: 'POST',
                        description: 'Volta a página de cadastro de funcionários.',
                        url: 'http://localhost:3333/acmeco',
                        body: {
                            name: 'STRING',
                            cpf: 'STRING'
                        }
                    }
                }
                return res.status(200).send(response);
            }
        )
    });
};