const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const User=require('../models/userSchema')
const Employee=require('../models/employeeSchema')
