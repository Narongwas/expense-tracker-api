import User from "../model/user";

export async function getUserByEmail(email: string): Promise<{
  email: string;
  hashedPassword: string;
} | null> {
  const user = await User.findOne(
    { username: email },
    "username password"
  ).exec();

  if (!user) return null;

  return {
    email: email,
    hashedPassword: user.password,
  };
}
