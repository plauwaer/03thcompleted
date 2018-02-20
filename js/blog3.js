class BlogDate extends Date {
	toBlogFormat() {
		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		return this.toLocaleDateString('en-NL', options);
	}
}

// Merk op BlogEntry heeft een extra prop author: de schrijver van de BlogEntry
class BlogEntry {
	constructor(body, author) {
		this.body = body;
		this._date = new BlogDate();
		this._author = author;
	}
	get body() {
		return this._body;
	}
	set body(value) {
		this._body = value;
	}
	get author() {
		return this._author;
	}
	get date() {
		return this._date;
	}
	contains(searchText) {
		return searchText
			? this._body.toUpperCase().includes(searchText.toUpperCase())
			: false;
	}
	toString() {
		return `On ${this.date.toBlogFormat()} ${this.author} wrote:\n---\n${
			this.body
		}`;
	}
	static createDummy() {
		return new this('Nothing much to say today...');
	}
}

class TaggedBlogEntry extends BlogEntry {
	//nothing changed, omitted for brevity
	constructor(body, author, tags) {
		super(body, author);
		this._tags = tags;
	}
	get tags() {
		return this._tags;
	}
	addTag(tag) {
		this._tags.push(tag);
	}
	removeTag(tag) {
		const index = this._tags.indexOf(tag);
		if (index !== -1) {
			this._tags.splice(index, 1);
		}
	}
	contains(searchText) {
		return super.contains(searchText) || this.tags.includes(searchText);
	}
	toString() {
		return `${super.toString()}\nTags: ${this._tags.join(' ')}`;
	}
}

// Override de methode toString(), zorg voor een verzorgde uitvoer van title en creator
// Maak gebruik van de toString uit BlogEntry om daaronder een overzicht
// van alle entries te krijgen
class Blog {
	constructor(title, creator) {
		this._creator = creator ? creator : 'Anonymous';
		this._entries = [];
		this.title = title;
	}
	get creator() {
		return this._creator;
	}
	get title() {
		return this._title;
	}
	set title(value) {
		if (!value) throw new Error('You must give the blog a title.');
		this._title = value;
	}
	get entries() {
		return this._entries;
	}
	addEntry(body, author, tags) {
		this.entries.unshift(new TaggedBlogEntry(body, author, tags));
	}
	contains(searchText) {
		let found = this._title.toUpperCase().includes(searchText.toUpperCase());
		let index = 0;
		while (!found && index < this.entries.length) {
			found = this.entries[index].contains(searchText);
			index++;
		}
		return found;
	}
	static createEmptyBlog() {
		const blog = new Blog('A lazy blog...');
		blog._entries.unshift(TaggedBlogEntry.createDummy());
		return blog;
	}
	toString() {
		let result = `${this.title}\n A blog created by ${this.creator}\n`;
		for (const entry of this.entries) {
			result += `\n${entry.toString()}\n`;
		}
		return result;
	}
}

// Maak GroupBlog, dit is een subklasse van Blog. Aan een GroupBlog
// werken verschillende auteurs...
// Voorzie een constructor voor GroupBlog die naast title en creator ook een lijst van authors bevat.
// Tijdens consrtuctie wordt de creator van de Blog automatisch toegevoegd aan de lijst van authors (zie methode addAuthor)
// Voorzie een getter voor de property authors ! deze retourneert de auhtors in alfabetische volgorde !
// Voorzie een methode addAuthor(author) ! let op: een auhtor kan geen twee keer in de lijst van authors voorkomen !
// Voorzie een methode removeAuthor(author) ! let op: de creator van de blog mag je nooit verwijderen !
// Override de methode addEntry. ! Indien de author niet voorkomt in de lijst van authors werp je een exception !

class GroupBlog extends Blog {
	constructor(title, creator, authors) {
		super(title, creator);
		this._authors = authors;
		this.addAuthor(creator);
	}
	get authors() {
		return this._authors.sort();
	}
	addAuthor(author) {
		if (!this._authors.includes(author)) {
			this._authors.push(author);
		}
	}
	removeAuthor(author) {
		if (author !== this.creator) {
			const index = this.authors.indexOf(author);
			if (index !== -1) {
				this.authors.splice(index, 1);
			}
		}
	}
	addEntry(body, author, tags) {
		if (!this.authors.includes(author))
			throw new Error(`${author} is not a verified blog author.`);
		super.addEntry(body, author, tags);
	}
}

// Test your code...

const myGroupBlog = new GroupBlog('ES6 is big fun!', 'Bob', [
	'Ann',
	'Sofia',
	'John'
]);
console.log(myGroupBlog.authors); // ["Ann", "Bob", "John", "Sofia"]
// myGroupBlog.addEntry('abc', 'Mark'); // exception: mark is not a verified blog author
myGroupBlog.addEntry('Inheritance at work!', 'Ann', ['ES6', 'Inheritance']);
myGroupBlog.removeAuthor('Bob');
myGroupBlog.removeAuthor('John');
console.log(myGroupBlog.authors); // ["Ann", "Bob", "Sofia"]
myGroupBlog.addAuthor('Ann');
myGroupBlog.addAuthor('Jimmy');
console.log(myGroupBlog.authors); // ["Ann", "Bob", "Jimmy", "Sofia"]
myGroupBlog.addEntry('To extend or not to extend...', 'Sofia', [
	'ES6',
	'Extend'
]);
console.log(myGroupBlog.entries);
alert(myGroupBlog);
