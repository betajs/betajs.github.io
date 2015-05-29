var template_html = "./src/tutorials/template.html.ejs";
var target_html = "./tutorials.html";

var tutorials_source = {
	betajs: {
		title: "BetaJS",
		folder: "../betajs/docsrc/tutorials",
		json:  "../betajs/docsrc/tutorials/tutorials.json",
	},
	dynamics: {
		title: "Dynamics",
		folder: "../betajs-dynamics/docsrc/tutorials",
		json:  "../betajs-dynamics/docsrc/tutorials/tutorials.json",
	}
};

var fs = require('fs');
var ejs = require('ejs');

var marked = require('marked');

marked.setOptions({
	renderer : new marked.Renderer(),
	gfm : true,
	tables : true,
	breaks : false,
	pedantic : false,
	sanitize : true,
	smartLists : true,
	smartypants : false
});

marked.setOptions({
	highlight : function(code) {
		return require('highlight.js').highlightAuto(code).value;
	}
});

var tutorials = {};

function contentBuilder(tutorials, folder) {
	var result = {};
	for (var key in tutorials) {
		var filename = folder + "/" + key + ".md";
		result[key] = {
			title : tutorials[key].title ? tutorials[key].title : key,
			content : fs.existsSync(filename) ? marked(fs.readFileSync(filename, 'utf8')) : "<h3>TODO</h3>"
		};
		if (tutorials[key].children)
			result[key].children = contentBuilder(tutorials[key].children, folder);
	}
	return result;
}

for (var key in tutorials_source) {
	var source = tutorials_source[key];
	tutorials[key] = {
		title: source.title,
		content: null,
		children: contentBuilder(JSON.parse(fs.readFileSync(source.json, 'utf8')), source.folder)
	};
}


var template = fs.readFileSync(template_html, 'utf8');

var target = ejs.render(template, {
	tutorials : tutorials
}, {});

fs.writeFileSync(target_html, target, 'utf8');
