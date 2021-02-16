
            SELECT dentalsorriso.id_dentalsorriso,
            dentalsorriso.heigth,
            dentalsorriso.weigth,
            acmeco.id_acmeco,
            acmeco.name,
            acmeco.cpf
       FROM dentalsorriso
 INNER JOIN acmeco
         ON acmeco.id_acmeco = dentalsorriso.id_acmeco;