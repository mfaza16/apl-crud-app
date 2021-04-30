var Userdb = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // memvalidasi request
    if(!req.body){
        res.status(400).send({ message : "Konten tidak boleh kosong!"});
        return;
    }

    // menambah data karyawan 
    const user = new Userdb({
        name : req.body.name,
        id_karyawan : req.body.id_karyawan,
        posisi : req.body.posisi,
        gender: req.body.gender,
        status : req.body.status
    })
        user.save()
        .then(data => {
            //res.send(data)
            res.redirect('/add-employee');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message
            });
        });

}

// mengambil dan me-return semua data karyawan / salah satu data
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Data karyawan dengan id tersebut tidak ditemukan"})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: err.message})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message })
            })
    }

    
}

// Update data karyawan dengan id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data tidak boleh kosong"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : "Tidak dapat mengupdate data karyawan. Data tersebut mungkin saja tidak tersedia"})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : err.message})
        })
}

// Menghapus data karyawan berdasarkan id
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : "Tidak dapat menghapus data karyawan dengan id tersebut"})
            }else{
                res.send({
                    message : "Data karyawan berhasil dihapus"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message
            });
        });
}