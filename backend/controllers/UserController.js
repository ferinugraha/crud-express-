import User from '../models/UserModel.js';

export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll();
        console.log(response)
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersById = async(req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async(req, res) => {
    try {
        await User.create(req.body);
        res.status(201).json({
            msg: 'User Create'
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async(req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            msg: 'User Updated'
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            msg: 'User Deleted'
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const exportExcel = async (req, res) => {
    try {
        const users = await User.findAll();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        worksheet.columns = [
            { header: 'id', key: 'id', width: 10 },
            { header: 'name', key: 'name', width: 30 },
            { header: 'first', key: 'first', width: 40 },
            { header: 'gender', key: 'gender', width: 40 },
        ];

        users.forEach(user => {
            worksheet.addRow({
                id: user.id,
                name: user.name,
                first: user.first,
                gender: user.gender
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

        await workbook.xlsx.write(res);
        return res.status(200).send({
            msg: "Ok",
        })

    } catch (error) {
        console.log(error.message);
    }
}