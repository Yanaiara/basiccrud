const mysql = require('../mysql').pool;

exports.getDentalSorriso = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `
            SELECT dentalsorriso.id_dentalsorriso,
            dentalsorriso.heigth,
            dentalsorriso.weigth,
            acmeco.id_acmeco,
            acmeco.name,
            acmeco.cpf
       FROM dentalsorriso
 INNER JOIN acmeco
         ON acmeco.id_acmeco = dentalsorriso.id_acmeco;`,
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    dentalsorriso: result.map(userDentalSorriso => {
                        return {
                            id_acmeco: userDentalSorriso.id_acmeco,
                            id_dentalsorriso: userDentalSorriso.id_dentalsorriso,
                            heigth: userDentalSorriso.heigth,
                            weigth: userDentalSorriso.weigth,
                            acmeco: {
                                id_acmeco: userDentalSorriso.id_acmeco,
                                name: userDentalSorriso.name,
                                cpf: userDentalSorriso.cpf

                            }
                        };
                    })
                };
                return res.status(200).send(response);
            }
        );
    });
};

exports.postDentalSorriso = (req, res, next) => {
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
            'INSERT INTO dentalsorriso (id_acmeco, heigth, weigth) VALUES (?,?,?)',
            [req.body.id_acmeco, req.body.heigth, req.body.weigth],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const responde = {
                    message: 'Funcionário cadastrado no plano Norte Europa',
                    createdUser: {
                        id_acmeco: result.id_acmeco,
                        id_dentalsorriso: result.id_dentalsorriso,
                        heigth: result.heigth,
                        weigth: result.weigth,
                    }
                };
                return res.status(201).send(responde);
            }
        )
    });
};

exports.getOneDentalSorriso = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM dentalsorriso WHERE id_dentalsorriso = ?;',
            [req.params.id_dentalsorriso],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        message: 'Não foi encontrado funcionário com esse registro!'
                    });
                }
                const response = {
                    dentalsorriso: {
                        id_acmeco: result[0].id_acmeco,
                        id_dentalsorriso: result[0].id_dentalsorriso,
                        heigth: result[0].heigth,
                        weigth: result[0].weigth,
                    }
                }
                return res.status(200).send(response);
            }
        )
    })
};