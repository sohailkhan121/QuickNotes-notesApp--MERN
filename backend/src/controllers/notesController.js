import Notes from "../models/note.js";


export async function getAllNotes (req, res) {
  try{
    const notes = await Notes.find().sort({createdAt:-1});
    res.status(200).json(notes)
  }
  catch(err){
    console.log("Error in getAllNotes",err);
    res.status(500).json({message:"Internal Server Error"})
  }
};

export async function getNotebyId(req, res) {
  try {
    const noteId = req.params.id;
    const getNote = await Notes.findById(noteId);

    if (!getNote) {
      return res.status(404).json({ message: "Note not found!!" });
    }

    res.status(200).json(getNote);
  } catch (error) {
    console.log("Error in getNotebyId", error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function createNotes(req, res) {
    try{
      const {title , content} = req.body;
      const note = new Notes({title , content});

      const savedNotes = await note.save();
      res.status(201).json(savedNotes)
      }
    catch(err){
    console.log("Error in createNotes",err);
    res.status(500).json({message:"Internal Server Error"})
  }
};


export async function updateNotes(req,res) {
  try {
    const {title, content} = req.body;
    const updateNotes = await Notes.findByIdAndUpdate(req.params.id,{title , content},{new:true});
    if(!updateNotes) return res.status(404).json({message:"Note not found"})
    res.status(200).json(updateNotes);
  } catch(err){
    console.log("Error in updateNotes",err);
    res.status(500).json({message:"Internal Server Error"})
  }
};


export async function deleteNotes(req,res) {
  try {
    await Notes.findByIdAndDelete(req.params.id);
    res.status(200).send("Notes Deleted Successfully")
  } catch(err){
    console.log("Error in deleteNotes",err);
    res.status(500).json({message:"Internal Server Error"})
  }
}