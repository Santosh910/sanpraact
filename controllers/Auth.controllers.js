import UserModal from "../model/User.modal.js";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";



export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(401).json({ success: false, message: "all fields mandotory" })

        const user = await UserModal.findOne({ email: email })
        if (!user) return res.status(401).json({ success: false, message: "email not found" })

        const isPassCorrect = await bcrypt.compare(password, user.password);

        if (!isPassCorrect) {
            return res.status(401).json({ success: false, message: "password is wrong" })
        }

        // const token =  Jwt.sign({ id: user._id }, process.env.JWT_SECRETE)


        return res.status(200).json({ success: true, message: "login successfull", user: { name: user.name, id: user._id }})

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}
export const Register = async (req, res) => {
    try {
        const { name, email, password, number } = req.body;
        if (!name || !email || !password || !number) return res.status(401).json({ success: false, message: "all data is mandotory" })

        const hashadPassword = await bcrypt.hash(password, 10)
        const user = new UserModal({
            name,
            email,
            password: hashadPassword,
            number
        })
        await user.save()

        return res.status(200).json({ success: true, message: "registration successfull" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }


}
export const getCurrentUser = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(401).json({ success: false, message: "id not found" })

        const user = await UserModal.findById(id)
        if (!user) return res.status(401).json({ success: false, message: "user not found" })

        return res.status(200).json({ success: true, user: { name: user.name, id: user._id } })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}