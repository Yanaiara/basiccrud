const mysql = require('../mysql').pool;

exports.getNorteEuropa = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT norteeuropa.id_norteeuropa,
            norteeuropa.addmisiondate,
            norteeuropa.email,
            acmeco.id_acmeco,
            acmeco.name,
            acmeco.cpf
       FROM norteeuropa
 INNER JOIN acmeco
         ON acmeco.id_acmeco = norteeuropa.id_acmeco;`,
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    norteeuropa: result.map(userNorteEuropa => {
                        return {
                            id_norteeuropa: userNorteEuropa.id_norteeuropa,
                            addmisiondate: userNorteEuropa.addmisiondate,
                            email: userNorteEuropa.email,
                            acmeco: {
                                id_acmeco: userNorteEuropa.id_acmeco,
                                name: userNorteEuropa.name,
                                cpf: userNorteEuropa.cpf
                            },
                        };
                    })
                };
                return res.status(200).send(response);
            }
        );
    });
};

exports.postNorteEuropa = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM acmeco WHERE id_acmeco ?'),
            [req.body.id_acmeco],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Usuário não cadastrado!'
                    });
                }
            };
        conn.query(
            'INSERT INTO norteeuropa (id_acmeco, addmisiondate, email) VALUES (?,?,?)',
            [req.body.id_acmeco, req.body.addmisiondate, req.body.email],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const responde = {
                    message: 'Funcionário cadastrado no plano Norte Europa',
                    createdUser: {
                        id_acmeco: result.id_acmeco,
                        id_norteeuropa: result.id_norteeuropa,
                        addmisiondate: result.addmisiondate,
                        email: result.email,
                    }
                };
                return res.status(201).send(responde);
            }
        )
    });
};

exports.getOneNorteEuropa = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM norteeuropa WHERE id_norteeuropa = ?;',
            [req.params.id_norteeuropa],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Não foi encontrado funcionário com esse registro!'
                    });
                }
                const response = {
                    norteeuropa: {
                        id_acmeco: result[0].id_acmeco,
                        id_norteeuropa: result[0].id_norteeuropa,
                        addmisiondate: result[0].addmisiondate,
                        email: result[0].email,
                    }
                }
                return res.status(200).send(response);
            }
        )
    })
};