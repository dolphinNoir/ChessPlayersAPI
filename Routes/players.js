const express = require('express')
const router = express.Router()
const player = require('../playerModel');


// Get All
router.get('/findAll', async (req, res) => {
    try {
        let limit = req.query.limit;

        if (limit && !isNaN(limit)) {
            limit = parseInt(limit);
        } else {
            limit = 100;
        }

        const players = await player.find().limit(limit);
        res.json(players);

    }
     catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// FindByName
router.get('/findbyname/:fullname', async (req, res) => {
    try {
        let fullName = req.params.fullname;
        fullName = fullName.replace(/\b\w/g, (char) => char.toUpperCase());
        const players = await player.find({ Player: fullName })
        res.json(players);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// FindByFederation
router.get('/findbyfederation/:federation', async (req, res) => {
    try {
        let limit = req.query.limit;

        if (limit && !isNaN(limit)) {
            limit = parseInt(limit);
        } else {
            limit = 1072;
        }

        let federation = req.params.federation;
        federation = federation.replace(/\b\w/g, (char) => char.toUpperCase());
        
        const players = await player.find({ Federation: federation }).limit(limit)
        res.json(players);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});

// Filter
router.get("/Filter", async (req, res) => {
    try {
        let filters = {};

        if (req.query.federation) {
            const federation = req.query.federation.replace(/\b\w/g, (char) => char.toUpperCase());
            filters.Federation = federation;
        }


        if (req.query.ratingMin && req.query.ratingMax) {
            const ratingMin = parseInt(req.query.ratingMin);
            const ratingMax = parseInt(req.query.ratingMax);


            filters.Rating = { $gte: ratingMin, $lte: ratingMax };
        }

        let limit = req.query.limit;

        if (limit && !isNaN(limit)) {
            limit = parseInt(limit);
        } else {
            limit = 1072;
        }

        const players = await player.find(filters).limit(limit);
        res.json(players);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});


router.get("/GetPlayerByRanking", async (req, res) => {
try {
    let filters = {};
    const regex = new RegExp(`^#${req.query.ranking}$`, 'i')
    filters.Ranking = { $regex: regex };
    const players = await player.find(filters).sort({ Ranking: 1 }).limit(10);
    res.json(players);
} catch (err) {
    console.log(err)
    res.status(500).json({message: err.message})
}
})


router.get("/GetTop10Ranked", async (req, res) => {
    try {
        const players = await player.find().limit(10)
        res.json(players)
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }

})



module.exports = router

