import bcrypt from "bcryptjs";

//Testing Users Data
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456"),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456"),
  },
  {
    name: "Jane User",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456"),
  },
];

export default users;
