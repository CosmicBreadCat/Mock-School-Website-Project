const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

app.use(bodyParser.json());

let db = new sqlite3.Database(
	"./Database.db",
	sqlite3.OPEN_READWRITE,
	(err) => {
		if (err) {
			console.error(err.message);
		}
	}
);

let courseData = [];
let studentData = { passwords: [], firstNames: [], lastNames: [], IDs: [] };

db.serialize(() => {
	db.each(
		`SELECT ID as id,
        Name as name,
		Description as description
        FROM Courses`,
		(err, row) => {
			if (err) {
				console.error(err.message);
			}
			courseData.push({
				name: row.name,
				desc: row.description,
				key: row.id,
			});
		}
	);
});

db.serialize(() => {
	db.each(
		`SELECT ID as id,
		FirstName as fstname,
		LastName as lstname,
		Password as password
		FROM Students`,
		(err, row) => {
			if (err) {
				console.error(err.message);
			}
			studentData.passwords.push(row.password);
			studentData.firstNames.push(row.fstname);
			studentData.lastNames.push(row.lstname);
			studentData.IDs.push(row.id.toString());
		}
	);
});

db.close();

app.get("/api/courses", (req, res) => {
	res.json({ data: courseData });
});

app.post("/api/login", (req, res) => {
	let flag = false;
	if (
		studentData.IDs.includes(req.body.userID) &&
		studentData.passwords.includes(req.body.password)
	) {
		flag = true;
	}

	let index;
	if (flag === true) {
		index = studentData.IDs.indexOf(req.body.userID);
	}

	res.json({
		found: flag,
		firstName: studentData.firstNames[index],
		lastName: studentData.lastNames[index],
	});
});

app.listen(5000, () => {
	console.log("server started on port 5000");
});
