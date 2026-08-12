import markdownIt from "markdown-it";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) 
{
	eleventyConfig.setNunjucksEnvironmentOptions(
	{
		trimBlocks: false,
		lstripBlocks: true,
	});

	eleventyConfig.setLibrary("md", markdownIt(
	{
		html: true,
		xhtmlOut: true,
		breaks: true,
		linkify: true,
	}));

	eleventyConfig.addExtension("11ty.ts", 
	{
		key: "11ty.js",
	});
	
	eleventyConfig.addTemplateFormats("11ty.ts");

	eleventyConfig.addPlugin(syntaxHighlight);

	// regular copies
	eleventyConfig.addPassthroughCopy("staging/assets/**");
	eleventyConfig.addPassthroughCopy("staging/css/**");
	
	// prismjs and plugins (scripts)
	eleventyConfig.addPassthroughCopy(
	{
		"node_modules/prismjs/prism.js":
		"/js/include/prismjs/prism.js",

		"node_modules/prismjs/plugins/autoloader/prism-autoloader.js":
		"/js/include/prismjs/plugins/autoloader/prism-autoloader.js",
		
		"node_modules/prismjs/components/":
		"/js/include/prismjs/components/",
	
		"node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js": 
		"js/include/prismjs/plugins/line-numbers/prism-line-numbers.js",
	
		"node_modules/prismjs/plugins/toolbar/prism-toolbar.js":
		"js/include/prismjs/plugins/toolbar/prism-toolbar.js",
	
		"node_modules/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js":
		"js/include/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js",
	
		"node_modules/prismjs/plugins/show-language/prism-show-language.js":
		"js/include/prismjs/plugins/show-language/prism-show-language.js",
	});

	// prismjs and plugins (css)
	eleventyConfig.addPassthroughCopy(
	{
		"node_modules/dracula-prism/dist/css/dracula-prism.css":
		"/css/include/dracula-prism/dracula-prism.css",
	
		"node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css":
		"/css/include/prismjs/plugins/line-numbers/prism-line-numbers.css",
	});

	// custom filters
	eleventyConfig.addFilter("split", function(str, splitOn) {
		return str.split(splitOn)
	})
}

export const config = 
{
	dir: 
	{
		input:  "staging",
		output: "prod",
		includes: "_includes",
		layouts:  "_layouts",
	},
	htmlTemplateEngine:     "njk",
	markdownTemplateEngine: "njk",
};