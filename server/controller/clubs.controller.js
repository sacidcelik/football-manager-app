import mongoose from 'mongoose';
import Club from '../models/club.model.js';

function getClubs(req, res) {
  Club.find()
    .then((clubs) => res.json(clubs))
    .catch((error) =>
      res.json({ success: false, message: 'Could not retrieve clubs' })
    );
}

function getClub(req, res) {
  const { clubId } = req.params;
  Club.findById(clubId)
    .then((club) => res.json(club))
    .catch((error) =>
      res.json({ success: false, message: '400: Club not found' })
    );
}

function postClub(req, res) {
  const newClub = new Club({
    name: req.body.name,
    stadium: req.body.stadium,
    coach: req.body.coach,
    budget: req.body.budget,
  });
  newClub
    .save()
    .then((savedClub) => res.json(`Saved ${savedClub.name} to database`))
    .catch((error) =>
      res.json({ success: false, message: 'Could not save club to database' })
    );
}

function updateClub(req, res) {
  const { clubId } = req.params;
  const updatedClub = req.body;
  Club.findByIdAndUpdate({ _id: clubId }, updatedClub, (error, doc) => {
    if (error) {
      res.json({ success: false, message: 'Could not update this club.' });
      return;
    }
    res.json(doc);
  });
}

function deleteClub(req, res) {
  const { clubId } = req.params;
  Club.findByIdAndDelete({ _id: clubId }, (error, doc) => {
    if (error) {
      res.json({ success: false, message: 'Could not delete this club' });
      return;
    }
    res.json({
      success: true,
      message: `Club ${doc.name} has been deleted`,
    });
  });
}

export { getClubs, getClub, postClub, updateClub, deleteClub };
