// Imports
const pluginEleventyNavigation = require("@11ty/eleventy-navigation");
const pluginMinifier = require("@sherby/eleventy-plugin-files-minifier");
const pluginSitemap = require("@quasibit/eleventy-plugin-sitemap");

// Configs
const configCss = require("./src/config/css");
const configJs = require("./src/config/javascript");
const configSitemap = require("./src/config/sitemap");
const configServer = require("./src/config/server");

// Other
const filterPostDate = require("./src/config/postDate");
const isProduction = configServer.isProduction;
const eleventyPluginSharpImages = require("@codestitchofficial/eleventy-plugin-sharp-images");



const markdownIt = require("markdown-it");


module.exports = function (eleventyConfig) {


    
    /**=====================================================================
          EXTENSIONS - Recognising non-default languages as templates 
    =======================================================================*/
    /** https://www.11ty.dev/docs/languages/custom/ */

    /**
     *  CSS EXTENSION
     *  Setting up CSS files to be recognised as aN eleventy template language. This allows our minifier to read CSS files and minify them
     */
    eleventyConfig.addTemplateFormats("css");
    eleventyConfig.addExtension("css", configCss);

    /**
     *  JS EXTENSION
     *  Sets up JS files as an eleventy template language, which are compiled by esbuild. Allows bundling and minification of JS
     */
    eleventyConfig.addTemplateFormats("js");
    eleventyConfig.addExtension("js", configJs);
    /**=====================================================================
                                END EXTENSIONS
    =======================================================================*/
    eleventyConfig.addPlugin(eleventyPluginSharpImages, {
        urlPath: "/assets/images",
        outputDir: "public/assets/images",
    });

    /**=====================================================================
                  PLUGINS - Adds additional eleventy functionality 
    =======================================================================*/
    /** https://www.11ty.dev/docs/plugins/ */

    /**
     *  ELEVENTY NAVIGATION
     *  Sets up the eleventy navigation plugin for a scalable navigation as used in _includes/components/header.html
     *  https://github.com/11ty/eleventy-navigation
     */
    eleventyConfig.addPlugin(pluginEleventyNavigation);

    /**
     *  AUTOMATIC SITEMAP GENERATION 
     *  Automatically generate a sitemap, using the domain in _data/client.json
     *  https://www.npmjs.com/package/@quasibit/eleventy-plugin-sitemap
     */
    eleventyConfig.addPlugin(pluginSitemap, configSitemap);

    /**
     *  MINIFIER 
     *  When in production ("npm run build" is ran), minify all HTML, CSS, JSON, XML, XSL and webmanifest files.
     *  https://github.com/benjaminrancourt/eleventy-plugin-files-minifier
     */
    if (isProduction) {
        eleventyConfig.addPlugin(pluginMinifier);
    }
    /**=====================================================================
                                END PLUGINS
    =======================================================================*/


    /**======================================================================
       PASSTHROUGHS - Copy source files to /public with no 11ty processing
    ========================================================================*/
    /** https://www.11ty.dev/docs/copy/ */

    eleventyConfig.addPassthroughCopy("./src/assets", {
        filter: [
            "**/*",
            "!**/*.js"
        ]
    });
    eleventyConfig.addPassthroughCopy("./src/admin");
    eleventyConfig.addPassthroughCopy("./src/_redirects");
    /**=====================================================================
                              END PASSTHROUGHS
    =======================================================================*/

    /**======================================================================
               FILTERS - Modify data in template files at build time
    ========================================================================*/
    /** https://www.11ty.dev/docs/filters/ */

    /**
     *  Converts dates from JSDate format (Fri Dec 02 18:00:00 GMT-0600) to a locale format.
     *  Use - {{ "DATE GOES HERE" | postDate }}
     *  https://moment.github.io/luxon/api-docs/index.html#datetime
     */
    eleventyConfig.addFilter("postDate", filterPostDate);



    const md = markdownIt({
        html: true,
        breaks: true,
        linkify: true,
      });
      
      // Add class to each block-level tag
      const defaultRender = md.renderer.rules;
      
      const addClass = (tag) => {
        const original = md.renderer.rules[tag] || md.renderer.renderToken;
        md.renderer.rules[tag] = function (tokens, idx, options, env, self) {
          const token = tokens[idx];
          const existingClass = token.attrGet('class');
          token.attrSet('class', existingClass ? `${existingClass} cs-text` : 'cs-text');
          return self.renderToken(tokens, idx, options);
        };
      };
      
      // Apply to block-level tags
      ['paragraph_open', 'blockquote_open', 'heading_open', 'bullet_list_open', 'ordered_list_open', 'list_item_open'].forEach(addClass);
      
    
      // Filter for inline markdown (for <p>, <strong>, `code`, etc.)
      eleventyConfig.addFilter("markdownify", (value) => {
        return md.renderInline(value || "");
      });
    
      // Filter for full markdown blocks (like headings, lists, images, quotes)
      eleventyConfig.addFilter("markdownblock", (value) => {
        return md.render(value || "");
      });
    
    /**=====================================================================
                                    END FILTERS
    =======================================================================*/

    /**======================================================================
                  SHORTCODES - Output data using JS at build time
    ========================================================================*/
    /** https://www.11ty.dev/docs/shortcodes/ */

    /**
     *  Gets the current year, which can be outputted with {% year %}. Used for the footer copyright. Updates with every build.
     *  Use - {% year %}
     */
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    /**=====================================================================
                                END SHORTCODES
    =======================================================================*/

    /**=====================================================================
                                SERVER SETTINGS
    =======================================================================*/
    eleventyConfig.setServerOptions(configServer);
    /**=====================================================================
                              END SERVER SETTINGS
    =======================================================================*/

    eleventyConfig.addFilter("money", function(value) {
        return value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    });

    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes",
            data: "_data",
        },
        htmlTemplateEngine: "njk",
    };
};
