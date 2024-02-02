const express = require('express')
const app = express()
const mongoose = require('mongoose')
const NotePost = require('./models/note')

mongoose.connect('mongodb+srv://sovanndev:015097@sovanndev.u7pjfto.mongodb.net/Bch_Ims')

app.set('view engine', 'ejs')
app.use(express.static('public'))

// To read Json files
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async(req, res)=>{
  const noteposts = await NotePost.find({noteStatus:"Pending"}).sort({ _id: -1 })
    res.render('index', {noteposts})
})

app.get('/completed/note', async(req, res)=>{
  const completednote = await NotePost.find({noteStatus:"Completed"}).sort({ _id: -1 })
    res.render('completed_note', {completednote})
})

app.post('/add/note', async(req, res)=>{
    await NotePost.create(req.body)
    res.redirect('/')
})

app.get('/note/delete/:id', async (req, res) => {
  await NotePost.deleteOne({ _id: req.params.id })
  res.redirect('back')
})

app.get('/note/edit/:id', async (req, res) => {
  const noteupdate = await NotePost.findById({ _id: req.params.id })
  res.render('edit_note', {noteupdate})
})

app.post('/note/update', async (req, res) => {
  await NotePost.findByIdAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        noteStatus: req.body.noteStatus,
        notetext: req.body.notetext,
      },
    }
  )
  res.redirect("/")
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

app.listen(port, function (error) {
  if (error) {
    console.log(`Something went wrong ${error}`);
  } else {
    console.log(`App listening on port ${port}`);
  }
})
