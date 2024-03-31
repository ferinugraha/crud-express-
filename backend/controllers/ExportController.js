import fs from 'fs';
import path from 'path';
import User from '../models/UserModel.js';
import XLSX from 'xlsx';


export const exportUsersToXLSX = async (req, res) => {
    try {
        const users = await User.findAll();

        const data = users.map(user => ({
            id: user.id,
            first: user.first,
            gender: user.gender,
            email: user.email,
            // Include other user properties here
        }));

            
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Users');

        const excelFilePath = path.join(__dirname, '../public/users.xlsx');
        XLSX.writeFile(wb, excelFilePath);

        const fileData = fs.readFileSync(excelFilePath);
        const blob = new Blob([fileData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        saveAs(blob, 'users.xlsx');

        res.status(200).json({
            msg: 'Users exported to XLSX',
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            msg: 'Error exporting users to XLSX',
        });
    }
};

