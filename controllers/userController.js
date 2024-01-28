import userModel from "../models/User.js";
import bcrypt from "bcrypt";
import  Jwt  from "jsonwebtoken";

class UserConroller{
    static userRegistration = async (req,res)=>{
        const { name,email,password,password_confrim,contact_number,tc}= req.body;
        const isEmail = await userModel.findOne({email:email})
        if(isEmail){
            res.send({"status":"Failed","message":"Email is already existed."})
        }else{
            //New
            if(name && email && password && password_confrim && contact_number && tc){
                if(password ===password_confrim){
                    try {
                        const salt = await bcrypt.genSalt(15)
                        const hasPassword = await bcrypt.hash(password,salt)
                        const user_data = new userModel({
                            name: name,
                            email:email,
                            password:hasPassword,
                            contact_number:contact_number,
                            tc:tc
                        })
                        await user_data.save();
                        const save_user =  await userModel.findOne({email:email})
                        //JWT
                        const token = Jwt.sign({userID:save_user._id},process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                        res.status(201).send({ "status": "Success", "message": "Registration Success","token":token })
                        
                    } catch (error) {
                        res.send({"status":"Failed","message":"User Error."})
                    }

                }else{
                    res.send({"status":"Failed","message":"Password and Confirm Password doesn't match"})
                }

            }else{
                res.send({"status":"Failed","message":"All fields are required"}) 
            }
            //New
        }
    }//end Function
    static userLogin = async (req,res)=>{
        try {
            const { email, password } =req.body;
            if(email && password){
                const checkEmail = await userModel.findOne({email:email})
                if(checkEmail){
                    const check_password = await bcrypt.compare(password,checkEmail.password)
                    if(check_password){
                         //JWT
                         const token = Jwt.sign({userID:checkEmail._id},process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
                        res.status(201).send({ "status": "Success", "message": "Login Success","token":token})
                    }else{
                        res.send({"status":"Failed","message":"Password is not Valid"}) 
                    }
                }else{
                    res.send({"status":"Failed","message":"Email is not exit"})   
                }

            }else{
                res.send({"status":"Failed","message":"email and Password is required"})  
            }


            
        } catch (error) {
            res.send({"status":"Failed","message":"Something going wrong"})  
        }

    }//End Function 
    static user_change_password = async (req,res)=>{
        const { password, password_confirm } = req.body
        if (password && password_confirm) {
          if (password !== password_confirm) {
            res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" })
          } else {
            const salt = await bcrypt.genSalt(15)
            const newHashPassword = await bcrypt.hash(password, salt)
            await userModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } })
            res.send({ "status": "success", "message": "Password changed succesfully" })
          }
        } else {
          res.send({ "status": "failed", "message": "All Fields are Required" })
        }
    }//End function
    static loggedUser = async (req, res) => {
        res.send({ "user": req.user })
    }//End FUnction
}
export default UserConroller;