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

let CoursesData = [];
let AccountsData = [];
let AccountData = {
	passwords: [],
	firstNames: [],
	lastNames: [],
	types: [],
	IDs: [],
};

db.serialize(() => {
	db.each(
		`SELECT ID as id,
        Name as name,
		Description as description,
		Head as head,
		Support as support
        FROM Courses`,
		(err, row) => {
			if (err) {
				console.error(err.message);
			}
			CoursesData.push({
				name: row.name,
				desc: row.description,
				head: row.head,
				support: row.support,
				key: row.id.toString,
			});
		}
	);
});

db.serialize(() => {
	db.each(
		`SELECT ID as id,
		FirstName as fstname,
		LastName as lstname,
		Password as password,
		AccType as type
		FROM Accounts`,
		(err, row) => {
			if (err) {
				console.error(err.message);
			}
			AccountData.passwords.push(row.password);
			AccountData.firstNames.push(row.fstname);
			AccountData.lastNames.push(row.lstname);
			AccountData.types.push(row.type);
			AccountData.IDs.push(row.id.toString());

			AccountsData.push({
				firstname: row.fstname,
				lastname: row.lstname,
				password: row.password,
				type: row.type,
				id: row.id.toString(),
			});
		}
	);
});

const deleteAccount = (e) => {
	db.serialize(() => {
		db.run("DELETE FROM Users WHERE id = ?", e, (err) => {
			if (err) {
				return err;
			}
			AccountsData.IDs.index();
			return;
		});
	});
};

db.close();

app.get("/api/courses", (req, res) => {
	res.json({ data: CoursesData });
});

app.get("/api/accounts", (req, res) => {
	res.json({ data: AccountsData });
});

app.post("/api/login", (req, res) => {
	let flag = false;
	if (
		AccountData.IDs.includes(req.body.userID) &&
		AccountData.passwords[AccountData.IDs.indexOf(req.body.userID)] ===
			req.body.password
	) {
		flag = true;
	}

	let index;
	if (flag === true) {
		index = AccountData.IDs.indexOf(req.body.userID);
	}

	res.json({
		found: flag,
		firstName: AccountData.firstNames[index],
		lastName: AccountData.lastNames[index],
		type: AccountData.types[index],
		key: AccountData.IDs[index],
	});
});

app.post("/api/enroll", (req, res) => {});

app.post("/api/deleteCourse", (req, res) => {});

app.post("/api/deleteAccount", (req, res) => {
	let bruh = req.body.id;
	res.json({ data: bruh });
});

app.post("/api/edit", (req, res) => {});

app.listen(5000, () => {
	console.log("server started on port 5000");
});
