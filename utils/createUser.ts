import bcrypt from "bcrypt";
import User from "../model/user";



export default async function(email : string, password : string) : Promise<{
    id : string,
    email : string,
    password : string,
}> {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(email, hashedPassword);

    const user = await User.create({
      username: email,
      password: hashedPassword,
    });
    return {
        id : user._id.toString(),
        email : email,
        password : password
    };
}