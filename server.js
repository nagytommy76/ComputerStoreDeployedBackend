'use strict'
var __importDefault =
   (this && this.__importDefault) ||
   function (mod) {
      return mod && mod.__esModule ? mod : { default: mod }
   }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
require('dotenv').config()
const fs_1 = __importDefault(require('fs'))
const db_1 = __importDefault(require('./config/db'))
const morgan_1 = __importDefault(require('morgan'))
const path_1 = __importDefault(require('path'))
const bodyParser = require('body-parser')
const cors_1 = __importDefault(require('cors'))
const app = (0, express_1.default)()
const PORT = process.env.PORT || 5050
;(0, db_1.default)().then(() => {
   app.listen(PORT, () => {
      console.log(`The app started: ${PORT}`)
   })
})
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(__dirname, 'access.log'), {
   flags: 'a',
})
app.use(
   (0, cors_1.default)({
      origin: [
         'http://localhost:3000',
         'http://localhost:8080',
         'https://computerstorebackend.firebaseapp.com',
         'https://computerstorebackend.web.app/',
      ],
   })
)
app.use((0, morgan_1.default)('combined', { stream: accessLogStream }))
app.use(bodyParser.json())
app.use('/api/vga', require('./routes/api/Vga/Vga'))
app.use('/api/admin/vga', require('./routes/api/Admin/Vga/vga'))
app.use('/api/auth', require('./routes/api/User/User'))
app.use('/api/cart', require('./routes/api/User/Cart'))
app.use('/api/order', require('./routes/api/User/Order'))
app.use('/api/admin/users', require('./routes/api/Admin/Users/Users'))
app.use('/api/admin/cpu', require('./routes/api/Admin/Cpu/Cpu'))
app.use('/api/cpu', require('./routes/api/Cpu/Cpu'))
app.use('/api/admin/memory', require('./routes/api/Admin/Memory/Memory'))
app.use('/api/memory', require('./routes/api/Memory/Memory'))
app.use('/api/admin/hdd', require('./routes/api/Admin/HDD/HDD'))
app.use('/api/hdd', require('./routes/api/HDD/HDD'))
app.use('/api/admin/ssd', require('./routes/api/Admin/SSD/SSD'))
app.use('/api/ssd', require('./routes/api/SSD/SSD'))
app.use('/api/highlight', require('./routes/api/Highlight/Highlight'))
